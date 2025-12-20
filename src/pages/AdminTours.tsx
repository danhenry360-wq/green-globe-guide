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
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  state: string | null;
}

const emptyTour: Partial<Tour> = {
  name: "",
  slug: "",
  description: "",
  price_range: "$0",
  website: "",
  images: [],
  address: "",
  duration: "",
  highlights: [],
  booking_url: "",
  rating: 0,
  review_count: 0,
  is_420_friendly: false,
  is_verified: false,
  latitude: 0,
  longitude: 0,
  city: "",
  state: "Colorado",
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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  // Array of refs for the 5 file input slots
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Fetch tours
  const { data: tours = [], isLoading } = useQuery({
    queryKey: ["admin-tours"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tours")
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;
      return data as Tour[];
    },
    enabled: !!user,
  });

  // Filtered tours
  const filteredTours = useMemo(() => {
    return tours.filter(tour =>
      tour.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tours, searchQuery]);

  // Mutations
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Tour>) => {
      const { error } = await supabase.from("tours").insert([data as any]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tours"] });
      toast.success("Tour created successfully");
      setDialogOpen(false);
    },
    onError: (error: any) => toast.error(error.message),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Tour> & { id: string }) => {
      const { error } = await supabase.from("tours").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tours"] });
      toast.success("Tour updated successfully");
      setDialogOpen(false);
    },
    onError: (error: any) => toast.error(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tours").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tours"] });
      toast.success("Tour deleted");
      setDeleteId(null);
    },
  });

  const handleFileUpload = async (file: File, index: number) => {
    if (!file) return;
    setUploadingImage(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `tours/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('tour-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('tour-images')
        .getPublicUrl(filePath);

      // FIX: Ensure we create a clean new array for state
      const currentImages = formData.images ? [...formData.images] : [];
      currentImages[index] = publicUrl;
      
      setFormData({ ...formData, images: currentImages });
      toast.success("Image uploaded!");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("Upload failed: " + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.slug) {
      toast.error("Name and slug are required");
      return;
    }

    if (isCreating) {
      createMutation.mutate(formData);
    } else if (editingTour) {
      updateMutation.mutate({ id: editingTour.id, ...formData });
    }
  };

  if (authLoading || isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <>
      <Helmet><title>Admin | Manage Tours</title></Helmet>
      <Navigation />
      <main className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Sparkles className="text-accent" /> Manage Tours
            </h1>
            <Button onClick={() => { setFormData(emptyTour); setIsCreating(true); setDialogOpen(true); }}>
              <Plus className="mr-2" /> New Tour
            </Button>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Search tours..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="pl-10"
            />
          </div>

          <div className="grid gap-4">
            {filteredTours.map((tour) => (
              <Card key={tour.id} className="p-6 bg-card/50 border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <img src={tour.images?.[0] || "/placeholder.svg"} className="w-16 h-16 object-cover rounded-lg border border-white/10" alt="" />
                  <div>
                    <h3 className="font-bold text-lg">{tour.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {tour.city}, {tour.state}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => { setFormData(tour); setIsCreating(false); setDialogOpen(true); setEditingTour(tour); }}>
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => setDeleteId(tour.id)}>
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isCreating ? "Create New Tour" : "Edit Tour"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Basic Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tour Name</Label>
                <Input value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={formData.slug || ""} onChange={e => setFormData({...formData, slug: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea rows={3} value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            {/* Location */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2"><Label>City</Label><Input value={formData.city || ""} onChange={e => setFormData({...formData, city: e.target.value})} /></div>
              <div className="space-y-2"><Label>State</Label><Input value={formData.state || ""} onChange={e => setFormData({...formData, state: e.target.value})} /></div>
              <div className="space-y-2"><Label>Price Range</Label><Input value={formData.price_range || ""} onChange={e => setFormData({...formData, price_range: e.target.value})} /></div>
            </div>

            {/* Switches */}
            <div className="flex gap-8 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Switch checked={formData.is_420_friendly || false} onCheckedChange={v => setFormData({...formData, is_420_friendly: v})} />
                <Label>420 Friendly</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={formData.is_verified || false} onCheckedChange={v => setFormData({...formData, is_verified: v})} />
                <Label>Verified</Label>
              </div>
            </div>

            {/* Images - Fixing the logic here */}
            <div className="space-y-4">
              <Label>Tour Images (Max 5)</Label>
              <div className="grid grid-cols-5 gap-2">
                {[0, 1, 2, 3, 4].map((index) => (
                  <div key={index} className="relative aspect-square border-2 border-dashed border-white/10 rounded-xl overflow-hidden group">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={el => fileInputRefs.current[index] = el}
                      onChange={(e) => handleFileUpload(e.target.files?.[0] as File, index)} 
                    />
                    
                    {formData.images?.[index] ? (
                      <>
                        <img src={formData.images[index]} className="w-full h-full object-cover" />
                        <button 
                          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => {
                            const newImgs = [...(formData.images || [])];
                            newImgs.splice(index, 1);
                            setFormData({...formData, images: newImgs});
                          }}
                        >
                          <Trash2 className="text-white w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <button 
                        disabled={uploadingImage}
                        className="w-full h-full flex items-center justify-center hover:bg-white/5 transition-colors"
                        onClick={() => fileInputRefs.current[index]?.click()}
                      >
                        {uploadingImage ? <Loader2 className="animate-spin text-accent" /> : <ImagePlus className="text-muted-foreground" />}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending}>
              {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="mr-2 animate-spin w-4 h-4" />}
              Save Tour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete this tour experience.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && deleteMutation.mutate(deleteId)} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminTours;
