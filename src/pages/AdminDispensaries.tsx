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
  Search, Edit, Shield, ArrowLeft, Save, Loader2, MapPin, Plus, Trash2, 
  ImagePlus, Star, CheckCircle 
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

interface Dispensary {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  country: string | null;
  description: string | null;
  image: string | null;
  website: string | null;
  hours: string | null;
  status: string | null;
  rating: number | null;
  review_count: number | null;
  is_recreational: boolean | null;
  is_medical: boolean | null;
  has_delivery: boolean | null;
  has_atm: boolean | null;
  has_parking: boolean | null;
  latitude: number | null;
  longitude: number | null;
  policy_highlights: string | null;
}

const emptyDispensary: Partial<Dispensary> = {
  name: "",
  slug: "",
  address: "",
  city: "",
  state: "",
  country: "USA",
  description: "",
  image: "",
  website: "",
  hours: "",
  status: "licensed",
  is_recreational: true,
  is_medical: true,
  has_delivery: false,
  has_atm: false,
  has_parking: false,
  policy_highlights: "",
};

const AdminDispensaries = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [editingDispensary, setEditingDispensary] = useState<Dispensary | null>(null);
  const [formData, setFormData] = useState<Partial<Dispensary>>(emptyDispensary);
  const [isCreating, setIsCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dispensaryToDelete, setDispensaryToDelete] = useState<Dispensary | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

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

  // Fetch dispensaries
  const { data: dispensaries, isLoading: dispensariesLoading } = useQuery({
    queryKey: ["admin-dispensaries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dispensaries")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as Dispensary[];
    },
    enabled: !!isAdmin,
  });

  // Create dispensary mutation
  const createMutation = useMutation({
    mutationFn: async (dispensaryData: Partial<Dispensary>) => {
      if (!dispensaryData.name || !dispensaryData.address || !dispensaryData.city || !dispensaryData.state || !dispensaryData.slug) {
        throw new Error("Required fields missing");
      }
      const { error } = await supabase.from("dispensaries").insert([{
        name: dispensaryData.name,
        slug: dispensaryData.slug,
        address: dispensaryData.address,
        city: dispensaryData.city,
        state: dispensaryData.state,
        country: dispensaryData.country,
        description: dispensaryData.description,
        image: dispensaryData.image,
        website: dispensaryData.website,
        hours: dispensaryData.hours,
        status: dispensaryData.status,
        is_recreational: dispensaryData.is_recreational,
        is_medical: dispensaryData.is_medical,
        has_delivery: dispensaryData.has_delivery,
        has_atm: dispensaryData.has_atm,
        has_parking: dispensaryData.has_parking,
        latitude: dispensaryData.latitude,
        longitude: dispensaryData.longitude,
        policy_highlights: dispensaryData.policy_highlights,
      }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-dispensaries"] });
      toast.success("Dispensary created successfully");
      setDialogOpen(false);
      setIsCreating(false);
      setFormData(emptyDispensary);
    },
    onError: (error) => {
      toast.error("Failed to create dispensary: " + error.message);
    },
  });

  // Update dispensary mutation
  const updateMutation = useMutation({
    mutationFn: async (dispensaryData: Partial<Dispensary> & { id: string }) => {
      const { id, ...updates } = dispensaryData;
      const { error } = await supabase.from("dispensaries").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-dispensaries"] });
      toast.success("Dispensary updated successfully");
      setDialogOpen(false);
      setEditingDispensary(null);
    },
    onError: (error) => {
      toast.error("Failed to update dispensary: " + error.message);
    },
  });

  // Delete dispensary mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("dispensaries").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-dispensaries"] });
      toast.success("Dispensary deleted");
      setDeleteDialogOpen(false);
      setDispensaryToDelete(null);
    },
    onError: (error) => {
      toast.error("Failed to delete dispensary: " + error.message);
    },
  });

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `dispensaries/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("dispensary-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase.storage
        .from("dispensary-images")
        .getPublicUrl(filePath);

      setFormData({ ...formData, image: publicUrl.publicUrl });
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error("Failed to upload image: " + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // Filter dispensaries
  const filteredDispensaries = useMemo(() => {
    if (!dispensaries) return [];
    if (!searchQuery) return dispensaries;
    return dispensaries.filter(
      (d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.state.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [dispensaries, searchQuery]);

  const handleEdit = (dispensary: Dispensary) => {
    setEditingDispensary(dispensary);
    setFormData(dispensary);
    setIsCreating(false);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingDispensary(null);
    setFormData(emptyDispensary);
    setIsCreating(true);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (isCreating) {
      // Generate slug from name
      const slug = formData.name
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      createMutation.mutate({ ...formData, slug });
    } else if (editingDispensary) {
      updateMutation.mutate({ id: editingDispensary.id, ...formData });
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
        <title>Dispensary Management | BudQuest Admin</title>
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
                    <MapPin className="w-8 h-8 text-accent" />
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                      Dispensary Management
                    </h1>
                  </div>
                  <p className="text-muted-foreground">Add, edit, and manage dispensary listings</p>
                </div>
                <Button onClick={handleCreate} className="gap-2">
                  <Plus className="w-4 h-4" /> Add Dispensary
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
              placeholder="Search dispensaries..."
              className="pl-10"
            />
          </div>

          {/* Dispensaries Grid */}
          {dispensariesLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : filteredDispensaries.length === 0 ? (
            <div className="text-center py-20">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No dispensaries found.</p>
              <Button onClick={handleCreate} className="mt-4 gap-2">
                <Plus className="w-4 h-4" /> Add First Dispensary
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDispensaries.map((dispensary) => (
                <Card
                  key={dispensary.id}
                  className="p-4 bg-gradient-card border-border/50 hover:border-accent/50 transition-all"
                >
                  <div className="flex gap-3">
                    {dispensary.image ? (
                      <img
                        src={dispensary.image}
                        alt={dispensary.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-secondary/50 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{dispensary.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {dispensary.city}, {dispensary.state}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {dispensary.status === "licensed" && (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Licensed
                          </Badge>
                        )}
                        {dispensary.rating && (
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Star className="w-3 h-3 text-amber-400 mr-1" />
                            {dispensary.rating}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(dispensary)}
                    >
                      <Edit className="w-4 h-4 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => {
                        setDispensaryToDelete(dispensary);
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
                {isCreating ? "Add New Dispensary" : `Edit ${editingDispensary?.name}`}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {/* Image Upload */}
              <div>
                <Label>Image</Label>
                <div className="flex items-center gap-4 mt-2">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-lg bg-secondary/50 flex items-center justify-center">
                      <ImagePlus className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <ImagePlus className="w-4 h-4 mr-2" />
                      )}
                      Upload Image
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      Or paste image URL below
                    </p>
                  </div>
                </div>
                <Input
                  value={formData.image || ""}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://... or /dispensaries/image.jpg"
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name *</Label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dispensary name"
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Input
                    value={formData.status || ""}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    placeholder="licensed, pending, etc."
                  />
                </div>
              </div>

              <div>
                <Label>Address *</Label>
                <Input
                  value={formData.address || ""}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 Main St"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>City *</Label>
                  <Input
                    value={formData.city || ""}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Los Angeles"
                  />
                </div>
                <div>
                  <Label>State *</Label>
                  <Input
                    value={formData.state || ""}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="California"
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    value={formData.country || ""}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="USA"
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="About the dispensary..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Website</Label>
                  <Input
                    value={formData.website || ""}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label>Hours</Label>
                  <Input
                    value={formData.hours || ""}
                    onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                    placeholder="9am - 9pm"
                  />
                </div>
              </div>

              <div>
                <Label>Policy Highlights</Label>
                <Textarea
                  value={formData.policy_highlights || ""}
                  onChange={(e) => setFormData({ ...formData, policy_highlights: e.target.value })}
                  placeholder="Key policies for visitors..."
                  rows={2}
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
                    placeholder="34.0522"
                  />
                </div>
                <div>
                  <Label>Longitude</Label>
                  <Input
                    type="number"
                    step="any"
                    value={formData.longitude || ""}
                    onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || null })}
                    placeholder="-118.2437"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label>Recreational</Label>
                  <Switch
                    checked={formData.is_recreational || false}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_recreational: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Medical</Label>
                  <Switch
                    checked={formData.is_medical || false}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_medical: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Delivery</Label>
                  <Switch
                    checked={formData.has_delivery || false}
                    onCheckedChange={(checked) => setFormData({ ...formData, has_delivery: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>ATM</Label>
                  <Switch
                    checked={formData.has_atm || false}
                    onCheckedChange={(checked) => setFormData({ ...formData, has_atm: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Parking</Label>
                  <Switch
                    checked={formData.has_parking || false}
                    onCheckedChange={(checked) => setFormData({ ...formData, has_parking: checked })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={createMutation.isPending || updateMutation.isPending || !formData.name || !formData.address}
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
              <AlertDialogTitle>Delete Dispensary</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{dispensaryToDelete?.name}"? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => dispensaryToDelete && deleteMutation.mutate(dispensaryToDelete.id)}
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

export default AdminDispensaries;
