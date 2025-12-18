import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Search, Edit, Shield, ArrowLeft, Save, Loader2, Globe, Upload, Image as ImageIcon, X } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { getStatusBadgeClasses } from "@/lib/legal-status-colors";

type LegalStatus = "recreational" | "medical" | "decriminalized" | "illegal";

interface CountryRecord {
  id: string;
  name: string;
  slug: string;
  status: LegalStatus;
  region: string | null;
  possession_limits: string | null;
  purchase_limits: string | null;
  age_limit: number | null;
  consumption_notes: string | null;
  penalties: string | null;
  airport_rules: string | null;
  source_url: string | null;
  last_updated: string | null;
  image_url: string | null;
}

const REGIONS = ["All", "North America", "Central America", "Caribbean", "South America", "Europe", "Asia", "Africa", "Oceania"];

const AdminCountryLaws = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [editingCountry, setEditingCountry] = useState<CountryRecord | null>(null);
  const [formData, setFormData] = useState<Partial<CountryRecord>>({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  // Fetch countries
  const { data: countries, isLoading: countriesLoading } = useQuery({
    queryKey: ["admin-countries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("countries")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as CountryRecord[];
    },
    enabled: !!isAdmin,
  });

  // Update country mutation
  const updateCountryMutation = useMutation({
    mutationFn: async (countryData: Partial<CountryRecord> & { id: string }) => {
      const { id, ...updates } = countryData;
      const { error } = await supabase
        .from("countries")
        .update({
          ...updates,
          last_updated: new Date().toISOString(),
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-countries"] });
      toast.success("Country laws updated successfully");
      setDialogOpen(false);
      setEditingCountry(null);
    },
    onError: (error) => {
      toast.error("Failed to update country: " + error.message);
    },
  });

  // Filter countries - MUST be before any early returns
  const filteredCountries = useMemo(() => {
    if (!countries) return [];
    let filtered = countries;
    
    if (selectedRegion !== "All") {
      filtered = filtered.filter(c => c.region === selectedRegion);
    }
    
    if (searchQuery) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.region?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [countries, searchQuery, selectedRegion]);

  // Group countries by region - MUST be before any early returns
  const regionCounts = useMemo(() => {
    if (!countries) return {};
    return countries.reduce((acc, c) => {
      const region = c.region || "Unknown";
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [countries]);

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    if (!editingCountry) return;
    
    try {
      setUploadingImage(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `country-${editingCountry.slug}-${Date.now()}.${fileExt}`;
      const filePath = `country-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('dispensary-images')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('dispensary-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEdit = (country: CountryRecord) => {
    setEditingCountry(country);
    setFormData({
      status: country.status,
      region: country.region || "",
      possession_limits: country.possession_limits || "",
      purchase_limits: country.purchase_limits || "",
      age_limit: country.age_limit,
      consumption_notes: country.consumption_notes || "",
      penalties: country.penalties || "",
      airport_rules: country.airport_rules || "",
      source_url: country.source_url || "",
      image_url: country.image_url || "",
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!editingCountry) return;
    updateCountryMutation.mutate({
      id: editingCountry.id,
      ...formData,
    });
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
        <title>Country Laws Admin | BudQuest</title>
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
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-8 h-8 text-accent" />
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Country Laws Admin
                </h1>
              </div>
              <p className="text-muted-foreground">
                Manage cannabis laws for {countries?.length || 0} international destinations
              </p>
            </motion.div>
          </div>

          {/* Region Filter Tabs */}
          <Tabs value={selectedRegion} onValueChange={setSelectedRegion} className="mb-6">
            <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0">
              {REGIONS.map((region) => (
                <TabsTrigger
                  key={region}
                  value={region}
                  className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground px-3 py-1.5 text-sm"
                >
                  {region} {region !== "All" && regionCounts[region] ? `(${regionCounts[region]})` : region === "All" ? `(${countries?.length || 0})` : ""}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search countries..."
              className="pl-10"
            />
          </div>

          {/* Countries Grid */}
          {countriesLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : filteredCountries.length === 0 ? (
            <div className="text-center py-20">
              <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No countries found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCountries.map((country) => (
                <Card
                  key={country.id}
                  className="p-4 bg-gradient-card border-border/50 hover:border-accent/50 transition-all"
                >
                  <div className="flex items-start gap-3">
                    {/* Country Image */}
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {country.image_url ? (
                        <img 
                          src={country.image_url} 
                          alt={country.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{country.name}</h3>
                      {country.region && (
                        <p className="text-xs text-muted-foreground">{country.region}</p>
                      )}
                      <Badge className={`${getStatusBadgeClasses(country.status)} mt-1 capitalize`}>
                        {country.status}
                      </Badge>
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(country)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit {editingCountry?.name} Laws</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {/* Image Upload */}
              <div>
                <Label>Country Image</Label>
                <div className="mt-2 flex items-start gap-4">
                  <div className="w-24 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {formData.image_url ? (
                      <img 
                        src={formData.image_url} 
                        alt={editingCountry?.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        id="country-image-upload"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file);
                        }}
                        disabled={uploadingImage}
                      />
                      <Label htmlFor="country-image-upload" className="cursor-pointer">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={uploadingImage}
                          asChild
                        >
                          <span>
                            {uploadingImage ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Upload className="w-4 h-4 mr-2" />
                            )}
                            Upload Image
                          </span>
                        </Button>
                      </Label>
                      {formData.image_url && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormData({ ...formData, image_url: "" })}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <Input
                      value={formData.image_url || ""}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="Or paste image URL..."
                      className="text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Legal Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: LegalStatus) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recreational">Recreational</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="decriminalized">Decriminalized</SelectItem>
                      <SelectItem value="illegal">Illegal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Age Limit</Label>
                  <Input
                    type="number"
                    value={formData.age_limit || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, age_limit: parseInt(e.target.value) || null })
                    }
                    placeholder="e.g., 21"
                  />
                </div>
              </div>

              <div>
                <Label>Region</Label>
                <Select
                  value={formData.region || ""}
                  onValueChange={(value) => setFormData({ ...formData, region: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="North America">North America</SelectItem>
                    <SelectItem value="Central America">Central America</SelectItem>
                    <SelectItem value="Caribbean">Caribbean</SelectItem>
                    <SelectItem value="South America">South America</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="Asia">Asia</SelectItem>
                    <SelectItem value="Africa">Africa</SelectItem>
                    <SelectItem value="Oceania">Oceania</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Possession Limits</Label>
                <Textarea
                  value={formData.possession_limits || ""}
                  onChange={(e) => setFormData({ ...formData, possession_limits: e.target.value })}
                  placeholder="e.g., 5g personal possession"
                  rows={2}
                />
              </div>

              <div>
                <Label>Purchase Limits</Label>
                <Textarea
                  value={formData.purchase_limits || ""}
                  onChange={(e) => setFormData({ ...formData, purchase_limits: e.target.value })}
                  placeholder="e.g., 5g per transaction at coffee shops"
                  rows={2}
                />
              </div>

              <div>
                <Label>Consumption Notes</Label>
                <Textarea
                  value={formData.consumption_notes || ""}
                  onChange={(e) => setFormData({ ...formData, consumption_notes: e.target.value })}
                  placeholder="Where consumption is allowed..."
                  rows={2}
                />
              </div>

              <div>
                <Label>Penalties</Label>
                <Textarea
                  value={formData.penalties || ""}
                  onChange={(e) => setFormData({ ...formData, penalties: e.target.value })}
                  placeholder="Penalties for violations..."
                  rows={2}
                />
              </div>

              <div>
                <Label>Airport Rules</Label>
                <Textarea
                  value={formData.airport_rules || ""}
                  onChange={(e) => setFormData({ ...formData, airport_rules: e.target.value })}
                  placeholder="Airport and border crossing rules..."
                  rows={2}
                />
              </div>

              <div>
                <Label>Source URL</Label>
                <Input
                  value={formData.source_url || ""}
                  onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <Button
                onClick={handleSave}
                disabled={updateCountryMutation.isPending}
                className="w-full"
              >
                {updateCountryMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Footer />
      </div>
    </>
  );
};

export default AdminCountryLaws;