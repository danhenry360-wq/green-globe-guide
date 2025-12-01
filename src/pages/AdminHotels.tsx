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
  Search, Edit, Shield, ArrowLeft, Save, Loader2, Building2, Plus, Trash2, 
  ImagePlus, Star, CheckCircle, BadgeCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

interface Hotel {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  policies: string | null;
  website: string | null;
  rating: number | null;
  is_420_friendly: boolean | null;
  is_verified: boolean | null;
  latitude: number | null;
  longitude: number | null;
  images: string[] | null;
}

const emptyHotel: Partial<Hotel> = {
  name: "",
  slug: "",
  address: "",
  policies: "",
  website: "",
  rating: null,
  is_420_friendly: true,
  is_verified: false,
  latitude: null,
  longitude: null,
  images: [],
};

const AdminHotels = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [formData, setFormData] = useState<Partial<Hotel>>(emptyHotel);
  const [isCreating, setIsCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState<Hotel | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Check admin role
  const { data: isAdmin, isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch hotels
  const { data: hotels, isLoading: hotelsLoading } = useQuery({
    queryKey: ["admin-hotels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as Hotel[];
    },
    enabled: !!isAdmin,
  });

  // Create hotel mutation
  const createMutation = useMutation({
    mutationFn: async (hotelData: Partial<Hotel>) => {
      if (!hotelData.name || !hotelData.slug) {
        throw new Error("Required fields missing");
      }
      const { error } = await supabase.from("hotels").insert([{
        name: hotelData.name,
        slug: hotelData.slug,
        address: hotelData.address,
        policies: hotelData.policies,
        website: hotelData.website,
        rating: hotelData.rating,
        is_420_friendly: hotelData.is_420_friendly,
        is_verified: hotelData.is_verified,
        latitude: hotelData.latitude,
        longitude: hotelData.longitude,
        images: hotelData.images,
      }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hotels"] });
      toast.success("Hotel created successfully");
      setDialogOpen(false);
      setIsCreating(false);
      setFormData(emptyHotel);
      setImageUrl("");
    },
    onError: (error) => {
      toast.error("Failed to create hotel: " + error.message);
    },
  });

  // Update hotel mutation
  const updateMutation = useMutation({
    mutationFn: async (hotelData: Partial<Hotel> & { id: string }) => {
      const { id, ...updates } = hotelData;
      const { error } = await supabase.from("hotels").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hotels"] });
      toast.success("Hotel updated successfully");
      setDialogOpen(false);
      setEditingHotel(null);
    },
    onError: (error) => {
      toast.error("Failed to update hotel: " + error.message);
    },
  });

  // Delete hotel mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("hotels").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hotels"] });
      toast.success("Hotel deleted");
      setDeleteDialogOpen(false);
      setHotelToDelete(null);
    },
    onError: (error) => {
      toast.error("Failed to delete hotel: " + error.message);
    },
  });

  // Toggle verified status quickly
  const toggleVerified = useMutation({
    mutationFn: async ({ id, is_verified }: { id: string; is_verified: boolean }) => {
      const { error } = await supabase
        .from("hotels")
        .update({ is_verified })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hotels"] });
      toast.success("Verification status updated");
    },
    onError: (error) => {
      toast.error("Failed to update: " + error.message);
    },
  });

  // Filter hotels
  const filteredHotels = useMemo(() => {
    if (!hotels) return [];
    if (!searchQuery) return hotels;
    return hotels.filter(
      (h) =>
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (h.address && h.address.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [hotels, searchQuery]);

  const handleEdit = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setFormData(hotel);
    setImageUrl(hotel.images?.[0] || "");
    setIsCreating(false);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingHotel(null);
    setFormData(emptyHotel);
    setImageUrl("");
    setIsCreating(true);
    setDialogOpen(true);
  };

  const handleSave = () => {
    const images = imageUrl ? [imageUrl] : [];
    if (isCreating) {
      const slug = formData.name
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      createMutation.mutate({ ...formData, slug, images });
    } else if (editingHotel) {
      updateMutation.mutate({ id: editingHotel.id, ...formData, images });
    }
  };

  // Loading state
  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  // Auth check
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto max-w-4xl px-4 pt-32 pb-12 text-center">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Authentication Required</h1>
          <p className="text-muted-foreground mb-6">Please sign in to access the admin panel.</p>
          <Button onClick={() => navigate("/auth")}>Sign In</Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Admin check
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto max-w-4xl px-4 pt-32 pb-12 text-center">
          <Shield className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You need admin privileges to access this page.</p>
          <Button variant="outline" onClick={() => navigate("/")}>Return Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Hotel Management | BudQuest Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="container mx-auto max-w-7xl px-4 pt-24 pb-12">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/admin")}
              className="mb-4 gap-2 pl-0 hover:bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Button>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-8 h-8 text-accent" />
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                      Hotel Management
                    </h1>
                  </div>
                  <p className="text-muted-foreground">Add, edit, and manage 420-friendly hotel listings</p>
                </div>
                <Button onClick={handleCreate} className="gap-2">
                  <Plus className="w-4 h-4" /> Add Hotel
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hotels..."
              className="pl-10"
            />
          </div>

          {/* Hotels Grid */}
          {hotelsLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : filteredHotels.length === 0 ? (
            <div className="text-center py-20">
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No hotels found.</p>
              <Button onClick={handleCreate} className="mt-4 gap-2">
                <Plus className="w-4 h-4" /> Add First Hotel
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHotels.map((hotel) => (
                <Card
                  key={hotel.id}
                  className="p-4 bg-gradient-card border-border/50 hover:border-accent/50 transition-all"
                >
                  <div className="flex gap-3">
                    {hotel.images?.[0] ? (
                      <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-secondary/50 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{hotel.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {hotel.address || "No address"}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        {hotel.is_verified && (
                          <Badge className="bg-accent/20 text-accent text-xs">
                            <BadgeCheck className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {hotel.is_420_friendly && (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">
                            420-Friendly
                          </Badge>
                        )}
                        {hotel.rating && (
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Star className="w-3 h-3 text-amber-400 mr-1" />
                            {hotel.rating}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`flex-1 ${hotel.is_verified ? 'border-accent/50 text-accent' : ''}`}
                      onClick={() => toggleVerified.mutate({ id: hotel.id, is_verified: !hotel.is_verified })}
                    >
                      <BadgeCheck className="w-4 h-4 mr-1" />
                      {hotel.is_verified ? "Verified" : "Verify"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(hotel)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => {
                        setHotelToDelete(hotel);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Edit/Create Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isCreating ? "Add New Hotel" : `Edit ${editingHotel?.name}`}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {/* Image */}
              <div>
                <Label>Image URL</Label>
                <div className="flex items-center gap-4 mt-2">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-lg bg-secondary/50 flex items-center justify-center">
                      <ImagePlus className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://... or /rentals/image.jpg"
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name *</Label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Hotel name"
                  />
                </div>
                <div>
                  <Label>Rating</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating || ""}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || null })}
                    placeholder="4.5"
                  />
                </div>
              </div>

              <div>
                <Label>Address</Label>
                <Input
                  value={formData.address || ""}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 Main St, City, State"
                />
              </div>

              <div>
                <Label>Website / Affiliate Link</Label>
                <Input
                  value={formData.website || ""}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://expedia.com/affiliate/..."
                />
              </div>

              <div>
                <Label>Policies / Description</Label>
                <Textarea
                  value={formData.policies || ""}
                  onChange={(e) => setFormData({ ...formData, policies: e.target.value })}
                  placeholder="420-friendly policies, amenities, etc."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Latitude</Label>
                  <Input
                    type="number"
                    step="any"
                    value={formData.latitude || ""}
                    onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || null })}
                    placeholder="39.5508"
                  />
                </div>
                <div>
                  <Label>Longitude</Label>
                  <Input
                    type="number"
                    step="any"
                    value={formData.longitude || ""}
                    onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || null })}
                    placeholder="-107.3248"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-accent" />
                    <div>
                      <Label className="text-base">BudQuest Verified</Label>
                      <p className="text-xs text-muted-foreground">Display verified badge on listing</p>
                    </div>
                  </div>
                  <Switch
                    checked={formData.is_verified || false}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_verified: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <Label className="text-base">420-Friendly</Label>
                      <p className="text-xs text-muted-foreground">Cannabis consumption allowed</p>
                    </div>
                  </div>
                  <Switch
                    checked={formData.is_420_friendly || false}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_420_friendly: checked })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={createMutation.isPending || updateMutation.isPending || !formData.name}
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  <Save className="w-4 h-4 mr-2" />
                  {isCreating ? "Create" : "Save"}
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Hotel</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{hotelToDelete?.name}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => hotelToDelete && deleteMutation.mutate(hotelToDelete.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleteMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Footer />
      </div>
    </>
  );
};

export default AdminHotels;
