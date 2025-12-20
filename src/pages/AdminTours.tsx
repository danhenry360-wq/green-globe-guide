import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Plus, Pencil, Trash2, Loader2, Star, MapPin } from "lucide-react";

interface Tour {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_range: string | null;
  duration: string | null;
  address: string | null;
  website: string | null;
  booking_url: string | null;
  images: string[] | null;
  highlights: string[] | null;
  is_420_friendly: boolean | null;
  is_verified: boolean | null;
  rating: number | null;
  review_count: number | null;
  latitude: number | null;
  longitude: number | null;
  city_id: string | null;
}

const emptyTour: Omit<Tour, 'id'> = {
  name: '',
  slug: '',
  description: '',
  price_range: '',
  duration: '',
  address: '',
  website: '',
  booking_url: '',
  images: [],
  highlights: [],
  is_420_friendly: true,
  is_verified: false,
  rating: 0,
  review_count: 0,
  latitude: null,
  longitude: null,
  city_id: null,
};

const AdminTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [formData, setFormData] = useState<Omit<Tour, 'id'>>(emptyTour);
  const [highlightsText, setHighlightsText] = useState('');
  const [imagesText, setImagesText] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTours(data || []);
    } catch (error) {
      console.error('Error fetching tours:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tours",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleInputChange = (field: keyof Omit<Tour, 'id'>, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'name' ? { slug: generateSlug(value) } : {}),
    }));
  };

  const openCreateDialog = () => {
    setEditingTour(null);
    setFormData(emptyTour);
    setHighlightsText('');
    setImagesText('');
    setDialogOpen(true);
  };

  const openEditDialog = (tour: Tour) => {
    setEditingTour(tour);
    setFormData({
      name: tour.name,
      slug: tour.slug,
      description: tour.description || '',
      price_range: tour.price_range || '',
      duration: tour.duration || '',
      address: tour.address || '',
      website: tour.website || '',
      booking_url: tour.booking_url || '',
      images: tour.images || [],
      highlights: tour.highlights || [],
      is_420_friendly: tour.is_420_friendly ?? true,
      is_verified: tour.is_verified ?? false,
      rating: tour.rating,
      review_count: tour.review_count,
      latitude: tour.latitude,
      longitude: tour.longitude,
      city_id: tour.city_id,
    });
    setHighlightsText((tour.highlights || []).join('\n'));
    setImagesText((tour.images || []).join('\n'));
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.slug) {
      toast({
        title: "Error",
        description: "Name and slug are required",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const tourData = {
        ...formData,
        highlights: highlightsText.split('\n').filter(h => h.trim()),
        images: imagesText.split('\n').filter(i => i.trim()),
        latitude: formData.latitude ? Number(formData.latitude) : null,
        longitude: formData.longitude ? Number(formData.longitude) : null,
      };

      if (editingTour) {
        const { error } = await supabase
          .from('tours')
          .update(tourData)
          .eq('id', editingTour.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Tour updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('tours')
          .insert(tourData);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Tour created successfully",
        });
      }

      setDialogOpen(false);
      fetchTours();
    } catch (error: any) {
      console.error('Error saving tour:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save tour",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tour?')) return;

    try {
      const { error } = await supabase
        .from('tours')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Tour deleted successfully",
      });
      fetchTours();
    } catch (error: any) {
      console.error('Error deleting tour:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete tour",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/admin')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Manage Tours</h1>
        </div>

        <Card className="bg-card/50 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-accent">Tours</CardTitle>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openCreateDialog} className="bg-accent hover:bg-accent/90">
                  <Plus className="w-4 h-4 mr-2" /> Add Tour
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingTour ? 'Edit Tour' : 'Add New Tour'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name *</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Tour name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Slug *</Label>
                      <Input
                        value={formData.slug}
                        onChange={(e) => handleInputChange('slug', e.target.value)}
                        placeholder="tour-slug"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Tour description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Price Range</Label>
                      <Input
                        value={formData.price_range || ''}
                        onChange={(e) => handleInputChange('price_range', e.target.value)}
                        placeholder="$50-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input
                        value={formData.duration || ''}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        placeholder="2-3 hours"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input
                      value={formData.address || ''}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="123 Main St, Denver, CO"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Website</Label>
                      <Input
                        value={formData.website || ''}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="https://example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Booking URL</Label>
                      <Input
                        value={formData.booking_url || ''}
                        onChange={(e) => handleInputChange('booking_url', e.target.value)}
                        placeholder="https://example.com/book"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Latitude</Label>
                      <Input
                        type="number"
                        step="any"
                        value={formData.latitude || ''}
                        onChange={(e) => handleInputChange('latitude', e.target.value ? Number(e.target.value) : null)}
                        placeholder="39.7392"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Longitude</Label>
                      <Input
                        type="number"
                        step="any"
                        value={formData.longitude || ''}
                        onChange={(e) => handleInputChange('longitude', e.target.value ? Number(e.target.value) : null)}
                        placeholder="-104.9903"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Highlights (one per line)</Label>
                    <Textarea
                      value={highlightsText}
                      onChange={(e) => setHighlightsText(e.target.value)}
                      placeholder="Dispensary tour&#10;Cannabis cooking class&#10;Guided meditation"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Images (URLs, one per line)</Label>
                    <Textarea
                      value={imagesText}
                      onChange={(e) => setImagesText(e.target.value)}
                      placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={formData.is_420_friendly ?? true}
                        onCheckedChange={(checked) => handleInputChange('is_420_friendly', checked)}
                      />
                      <Label>420 Friendly</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={formData.is_verified ?? false}
                        onCheckedChange={(checked) => handleInputChange('is_verified', checked)}
                      />
                      <Label>Verified</Label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={saving} className="bg-accent hover:bg-accent/90">
                      {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      {editingTour ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : tours.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No tours found. Add your first tour!</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tours.map((tour) => (
                    <TableRow key={tour.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{tour.name}</p>
                          <p className="text-xs text-muted-foreground">{tour.slug}</p>
                        </div>
                      </TableCell>
                      <TableCell>{tour.duration || '-'}</TableCell>
                      <TableCell>{tour.price_range || '-'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{tour.rating || 0}</span>
                          <span className="text-muted-foreground">({tour.review_count || 0})</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {tour.is_420_friendly && (
                            <Badge variant="secondary" className="text-xs">420</Badge>
                          )}
                          {tour.is_verified && (
                            <Badge className="bg-green-500/20 text-green-400 text-xs">Verified</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(tour)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(tour.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default AdminTours;
