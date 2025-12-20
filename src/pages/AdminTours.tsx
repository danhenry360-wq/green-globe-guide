import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { 
  Search, Edit, ArrowLeft, Loader2, Plus, Trash2, 
  ImagePlus, Star, MapPin, Clock, DollarSign, Sparkles 
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

interface Tour {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_range: string | null;
  website: string | null;
  images: string[] | null;
  address: string | null;
  duration: string | null;
  highlights: string[] | null;
  booking_url: string | null;
  rating: number | null;
  review_count: number | null;
  is_420_friendly: boolean | null;
  is_verified: boolean | null;
  city: string | null;
  state: string | null;
}

const emptyTour: Partial<Tour> = {
  name: "",
  slug: "",
  description: "",
  price_range: "$0",
  images: [],
  city: "",
  state: "Colorado",
  is_420_friendly: false,
  is_verified: false,
  rating: 0,
  review_count: 0
};

const AdminTours = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [formData, setFormData] = useState<Partial<Tour>>(emptyTour);
  const [isCreating, setIsCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { data: tours = [], isLoading } = useQuery({
    queryKey: ["admin-tours"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tours").select("*").order("name");
      if (error) throw error;
      return data as Tour[];
    },
    enabled: !!user,
  });

  const filteredTours = useMemo(() => {
    return tours.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [tours, searchQuery]);

  const createMutation = useMutation({
    mutationFn: async (data: any) => supabase.from("tours").insert([data]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tours"] });
      toast.success("Tour created");
      setDialogOpen(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: any) => supabase.from("tours").update(data).eq("id", id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tours"] });
      toast.success("Tour updated");
      setDialogOpen(false);
    }
  });

  const handleFileUpload = async (file: File, index: number) => {
    setUploadingIndex(index);
    try {
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const filePath = `tours/${fileName}`;
      const { error: uploadError } = await supabase.storage.from('tour-images').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('tour-images').getPublicUrl(filePath);

      setFormData(prev => {
        const newImages = prev.images ? [...prev.images] : [];
        // Ensure array slots exist
        while (newImages.length <= index) newImages.push("");
        newImages[index] = publicUrl;
        return { ...prev, images: newImages.filter(img => img !== "") };
      });
      toast.success("Image uploaded");
    } catch (error: any) {
      toast.error("Upload failed");
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.slug) return toast.error("Name and slug required");
    if (isCreating) createMutation.mutate(formData);
    else updateMutation.mutate({ id: editingTour?.id, ...formData });
  };

  if (authLoading || isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <>
      <Helmet><title>Admin - Manage Tours</title></Helmet>
      <Navigation />
      <main className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-2"><Sparkles className="text-accent" /> Manage Tours</h1>
            <Button onClick={() => { setFormData(emptyTour); setIsCreating(true); setDialogOpen(true); }}>New Tour</Button>
          </div>
          
          <div className="grid gap-4">
            {filteredTours.map(tour => (
              <Card key={tour.id} className="p-4 bg-card/50 border-white/10 flex gap-4 items-center">
                <img src={tour.images?.[0] || "/placeholder.svg"} className="w-16 h-16 object-cover rounded" alt="" />
                <div className="flex-1">
                  <h3 className="font-bold">{tour.name}</h3>
                  <p className="text-sm text-muted-foreground">{tour.city}, {tour.state}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => { setFormData(tour); setIsCreating(false); setDialogOpen(true); setEditingTour(tour); }}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => setDeleteId(tour.id)}>Delete</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{isCreating ? "New Tour" : "Edit Tour"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Name</Label><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
              <div className="space-y-2"><Label>Slug</Label><Input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} /></div>
            </div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
            
            <Label>Images (Max 5)</Label>
            <div className="grid grid-cols-5 gap-2">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square relative border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden bg-card/50">
                  {formData.images?.[i] ? (
                    <>
                      <img src={formData.images[i]} className="w-full h-full object-cover" />
                      <button className="absolute top-1 right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs" onClick={() => {
                        const imgs = [...(formData.images || [])];
                        imgs.splice(i, 1);
                        setFormData({...formData, images: imgs});
                      }}>×</button>
                    </>
                  ) : (
                    <button onClick={() => fileInputRefs.current[i]?.click()} disabled={uploadingIndex === i}>
                      {uploadingIndex === i ? <Loader2 className="animate-spin w-5 h-5" /> : <ImagePlus className="w-5 h-5" />}
                    </button>
                  )}
                  <input type="file" ref={el => fileInputRefs.current[i] = el} hidden onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], i)} />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="flex items-center justify-between"><Label>420 Friendly</Label><Switch checked={formData.is_420_friendly || false} onCheckedChange={v => setFormData({...formData, is_420_friendly: v})} /></div>
               <div className="flex items-center justify-between"><Label>Verified</Label><Switch checked={formData.is_verified || false} onCheckedChange={v => setFormData({...formData, is_verified: v})} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminTours;
