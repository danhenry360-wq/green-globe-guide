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
  DialogTrigger,
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
  Search, Edit, Shield, ArrowLeft, Save, Loader2, Plus, Trash2, 
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
  city_id: string | null;
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
      return (data as any[]).map(tour => ({
        ...tour,
        city: tour.city || 'Unknown',
        state: tour.state || 'Unknown'
      })) as Tour[];
    },
    enabled: !!user,
  });

  // Filtered tours
  const filteredTours = useMemo(() => {
    return tours.filter(tour =>
      tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tours, searchQuery]);

  // Create/Update mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Tour>) => {
      const { error } = await supabase.from("tours").insert([data as any]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tours"] });
      toast.success("Tour created successfully");
      handleCloseDialog();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create tour");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Tour> & { id: string }) => {
      const { error } = await supabase.from("tours").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tours"] });
      toast.success("Tour updated successfully");
      handleCloseDialog();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update tour");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tours").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tours"] });
      toast.success("Tour deleted successfully");
      setDeleteId(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete tour");
    },
  });

  const handleFileUpload = async (file: File, index: number) => {
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `tours/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('tour-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('tour-images')
        .getPublicUrl(filePath);

      const images = formData.images || [];
      images[index] = publicUrl;
      setFormData({ ...formData, images });

      toast.success("Image uploaded successfully");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleOpenEdit = (tour: Tour) => {
    setEditingTour(tour);
    setFormData(tour);
    setIsCreating(false);
    setDialogOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingTour(null);
    setFormData(emptyTour);
    setIsCreating(true);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTour(null);
    setFormData(emptyTour);
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

  const handleDelete = async () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button onClick={() => navigate("/auth")}>Sign In Required</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Manage Tours - Admin Dashboard</title>
      </Helmet>
      <Navigation />
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/admin")}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-accent" />
                  Manage Tours
                </h1>
              </div>
              <Button onClick={handleOpenCreate} className="gap-2 bg-accent hover:bg-accent/90">
                <Plus className="w-4 h-4" /> New Tour
              </Button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card/50 border-white/10"
              />
            </div>
          </motion.div>

          {/* Tours Table */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {filteredTours.length === 0 ? (
              <Card className="p-12 text-center bg-card/30 border-accent/20">
                <p className="text-muted-foreground mb-4">No tours found</p>
                <Button onClick={handleOpenCreate} className="gap-2">
                  <Plus className="w-4 h-4" /> Create First Tour
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredTours.map((tour, index) => (
                  <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-6 bg-card/50 border-accent/20 hover:border-accent/50 transition-colors">
                      {/* Header */}
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div>
                          <h3 className="font-bold text-xl text-foreground mb-2">{tour.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                            <MapPin className="w-4 h-4" />
                            {tour.city}, {tour.state}
                          </p>
                          {tour.address && (
                            <p className="text-xs text-muted-foreground mb-2">{tour.address}</p>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 justify-end items-start">
                          {tour.is_420_friendly && (
                            <Badge className="bg-accent/20 text-accent border-accent/40">420 Friendly</Badge>
                          )}
                          {tour.is_verified && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/40">Verified</Badge>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      {tour.description && (
                        <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{tour.description}</p>
                      )}

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6 p-4 bg-background/50 rounded-lg">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Rating</p>
                          <p className="font-bold text-sm flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" /> {(tour.rating || 0).toFixed(1)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Reviews</p>
                          <p className="font-bold text-sm">{tour.review_count || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Duration</p>
                          <p className="font-bold text-sm flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {tour.duration || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Price</p>
                          <p className="font-bold text-sm flex items-center gap-1">
                            <DollarSign className="w-3 h-3" /> {tour.price_range || '$0'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Images</p>
                          <p className="font-bold text-sm flex items-center gap-1">
                            <ImagePlus className="w-4 h-4" /> {tour.images?.length || 0}
                          </p>
                        </div>
                      </div>

                      {/* Image Previews */}
                      {tour.images && tour.images.length > 0 && (
                        <div className="mb-6">
                          <p className="text-xs font-semibold text-muted-foreground mb-2">Tour Images</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {tour.images.slice(0, 3).map((img, idx) => (
                              <img key={idx} src={img} alt={`Tour ${idx}`} className="w-full h-20 object-cover rounded" />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEdit(tour)}
                          className="gap-2"
                        >
                          <Edit className="w-4 h-4" /> Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteId(tour.id)}
                          className="gap-2"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />

      {/* Edit/Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isCreating ? "Create New Tour" : "Edit Tour"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Basic Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tour Name *</Label>
                <Input
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., BEYOND Light Show"
                  className="bg-card/50"
                />
              </div>
              <div className="space-y-2">
                <Label>Slug *</Label>
                <Input
                  value={formData.slug || ""}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g., beyond-light-show-meditation"
                  className="bg-card/50"
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  value={formData.city || ""}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Denver"
                  className="bg-card/50"
                />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input
                  value={formData.state || ""}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="Colorado"
                  className="bg-card/50"
                />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  value={formData.address || ""}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address"
                  className="bg-card/50"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tour description..."
                rows={3}
                className="bg-card/50 resize-none"
              />
            </div>

            {/* Tour Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input
                  value={formData.duration || ""}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 1 hour"
                  className="bg-card/50"
                />
              </div>
              <div className="space-y-2">
                <Label>Price Range</Label>
                <Input
                  value={formData.price_range || ""}
                  onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
                  placeholder="e.g., $25.00"
                  className="bg-card/50"
                />
              </div>
            </div>

            {/* Rating & Reviews */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Rating</Label>
                <Input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating || 0}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                  placeholder="e.g., 4.8"
                  className="bg-card/50"
                />
              </div>
              <div className="space-y-2">
                <Label>Review Count</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.review_count || 0}
                  onChange={(e) => setFormData({ ...formData, review_count: parseInt(e.target.value) })}
                  placeholder="e.g., 818"
                  className="bg-card/50"
                />
              </div>
            </div>

            {/* URLs */}
            <div className="space-y-2">
              <Label>Booking URL</Label>
              <Input
                value={formData.booking_url || ""}
                onChange={(e) => setFormData({ ...formData, booking_url: e.target.value })}
                placeholder="https://..."
                className="bg-card/50"
              />
            </div>

            {/* Toggles */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>420 Friendly</Label>
                <Switch
                  checked={formData.is_420_friendly || false}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_420_friendly: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Verified</Label>
                <Switch
                  checked={formData.is_verified || false}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_verified: checked })}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <Label>Tour Images</Label>
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2, 3, 4].map((index) => (
                  <div key={index} className="space-y-2">
                    <input
                      ref={(el) => fileInputRefs.current[index] = el}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, index);
                      }}
                    />
                    {formData.images?.[index] ? (
                      <div className="relative aspect-square rounded-lg overflow-hidden border border-accent/30">
                        <img
                          src={formData.images[index]}
                          alt={`Tour ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => {
                            const images = [...(formData.images || [])];
                            images.splice(index, 1);
                            setFormData({ ...formData, images });
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileInputRefs.current[index]?.click()}
                        disabled={uploadingImage}
                        className="w-full aspect-square rounded-lg border-2 border-dashed border-accent/30 hover:border-accent/60 transition-colors flex items-center justify-center bg-card/50"
                      >
                        {uploadingImage ? (
                          <Loader2 className="w-6 h-6 animate-spin text-accent" />
                        ) : (
                          <ImagePlus className="w-6 h-6 text-muted-foreground" />
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSave}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="gap-2 bg-accent hover:bg-accent/90"
            >
              {(createMutation.isPending || updateMutation.isPending) && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {isCreating ? "Create Tour" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tour</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleteMutation.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminTours;
