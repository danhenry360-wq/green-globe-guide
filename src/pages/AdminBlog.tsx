import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Shield, 
  Loader2, 
  Plus,
  Edit,
  Trash2,
  Eye,
  FileText,
  Image as ImageIcon,
  Calendar,
  Tag,
  Save,
  X,
  ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  excerpt: string;
  content: any;
  image_url: string;
  author_name: string;
  author_avatar: string;
  category: string;
  tags: string[];
  read_time: string;
  status: string;
  published_at: string | null;
  created_at: string;
  affiliate_link: string | null;
  affiliate_link_text: string | null;
  related_dispensary_ids: string[];
  related_hotel_ids: string[];
}

const AdminBlog = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    excerpt: "",
    introduction: "",
    disclaimer: "",
    image_url: "",
    author_name: "Admin",
    author_avatar: "✍️",
    category: "City Guide",
    tags: "",
    read_time: "10 min read",
    status: "draft",
    sections: [] as any[],
    safetyTips: [] as string[],
    affiliate_link: "",
    affiliate_link_text: "Book Now",
    related_dispensaries: [] as string[],
    related_hotels: [] as string[]
  });

  // Fetch dispensaries for selection
  const { data: dispensaries } = useQuery({
    queryKey: ["all-dispensaries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dispensaries")
        .select("id, name, slug")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  // Fetch hotels for selection
  const { data: hotels } = useQuery({
    queryKey: ["all-hotels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hotels")
        .select("id, name, slug")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

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

  // Fetch blog posts
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
    enabled: !!isAdmin,
  });

  // Create/Update mutation
  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const postData = {
        title: data.title,
        slug: data.slug,
        subtitle: data.subtitle || null,
        excerpt: data.excerpt,
        content: {
          introduction: data.introduction,
          disclaimer: data.disclaimer,
          sections: data.sections,
          safetyTips: data.safetyTips
        },
        image_url: data.image_url,
        author_name: data.author_name,
        author_avatar: data.author_avatar,
        category: data.category,
        tags: data.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
        read_time: data.read_time,
        status: data.status,
        published_at: data.status === 'published' ? new Date().toISOString() : null,
        created_by: user?.id,
        affiliate_link: data.affiliate_link || null,
        affiliate_link_text: data.affiliate_link_text || 'Book Now',
        related_dispensary_ids: data.related_dispensaries || [],
        related_hotel_ids: data.related_hotels || []
      };

      if (editingPost) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", editingPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert([postData]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast.success(editingPost ? "Blog post updated!" : "Blog post created!");
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to save post: " + error.message);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast.success("Blog post deleted!");
      setDeletePostId(null);
    },
    onError: (error) => {
      toast.error("Failed to delete post: " + error.message);
    },
  });

  // Handle image upload
  const handleImageUpload = async () => {
    if (!imageFile) return;

    setUploading(true);
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `blog-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('dispensary-images')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('dispensary-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
      toast.success("Image uploaded successfully!");
    } catch (error: any) {
      toast.error("Image upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset form
  const resetForm = () => {
    setIsCreating(false);
    setEditingPost(null);
    setImageFile(null);
    setImagePreview("");
    setFormData({
      title: "",
      slug: "",
      subtitle: "",
      excerpt: "",
      introduction: "",
      disclaimer: "",
      image_url: "",
      author_name: "Admin",
      author_avatar: "✍️",
      category: "City Guide",
      tags: "",
      read_time: "10 min read",
      status: "draft",
      sections: [],
      safetyTips: [],
      affiliate_link: "",
      affiliate_link_text: "Book Now",
      related_dispensaries: [],
      related_hotels: []
    });
  };

  // Load post for editing
  const loadPostForEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreating(true);
    setFormData({
      title: post.title,
      slug: post.slug,
      subtitle: post.subtitle || "",
      excerpt: post.excerpt,
      introduction: post.content.introduction || "",
      disclaimer: post.content.disclaimer || "",
      image_url: post.image_url,
      author_name: post.author_name,
      author_avatar: post.author_avatar,
      category: post.category,
      tags: post.tags.join(', '),
      read_time: post.read_time,
      status: post.status,
      sections: post.content.sections || [],
      safetyTips: post.content.safetyTips || [],
      affiliate_link: post.affiliate_link || "",
      affiliate_link_text: post.affiliate_link_text || "Book Now",
      related_dispensaries: post.related_dispensary_ids || [],
      related_hotels: post.related_hotel_ids || []
    });
    setImagePreview(post.image_url);
  };

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.excerpt || !formData.image_url) {
      toast.error("Please fill in all required fields and upload an image");
      return;
    }

    saveMutation.mutate(formData);
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
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto max-w-4xl px-4 pt-32 pb-12 text-center">
          <Shield className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You need admin privileges to access this page.
          </p>
          <Button variant="outline" onClick={() => navigate("/")}>
            Return Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog Management | BudQuest Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="container mx-auto max-w-7xl px-4 pt-24 pb-12">
          {/* Back Navigation */}
          <Button
            variant="ghost"
            onClick={() => navigate("/admin")}
            className="mb-4 gap-2 text-muted-foreground hover:text-accent"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-accent" />
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Blog Management
                </h1>
              </div>
              {!isCreating && (
                <Button onClick={() => setIsCreating(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Post
                </Button>
              )}
            </div>
            <p className="text-muted-foreground">
              Create and manage blog posts
            </p>
          </motion.div>

          {/* Create/Edit Form */}
          {isCreating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{editingPost ? "Edit Post" : "Create New Post"}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={resetForm}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardDescription>Fill in the details below</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="image">Featured Image *</Label>
                      <div className="flex gap-4">
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={handleImageUpload}
                          disabled={!imageFile || uploading}
                          className="gap-2"
                        >
                          <ImageIcon className="w-4 h-4" />
                          {uploading ? "Uploading..." : "Upload"}
                        </Button>
                      </div>
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border border-border/50"
                        />
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Title */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => {
                            setFormData(prev => ({
                              ...prev,
                              title: e.target.value,
                              slug: generateSlug(e.target.value)
                            }));
                          }}
                          placeholder="Enter blog post title"
                          required
                        />
                      </div>

                      {/* Slug */}
                      <div className="space-y-2">
                        <Label htmlFor="slug">Slug *</Label>
                        <Input
                          id="slug"
                          value={formData.slug}
                          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                          placeholder="url-friendly-slug"
                          required
                        />
                      </div>

                      {/* Category */}
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="City Guide">City Guide</SelectItem>
                            <SelectItem value="Travel Guide">Travel Guide</SelectItem>
                            <SelectItem value="International">International</SelectItem>
                            <SelectItem value="Comparison">Comparison</SelectItem>
                            <SelectItem value="Legal">Legal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Subtitle */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="subtitle">Subtitle</Label>
                        <Input
                          id="subtitle"
                          value={formData.subtitle}
                          onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                          placeholder="Brief subtitle"
                        />
                      </div>

                      {/* Excerpt */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="excerpt">Excerpt *</Label>
                        <Textarea
                          id="excerpt"
                          value={formData.excerpt}
                          onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                          placeholder="Short description for preview"
                          rows={2}
                          required
                        />
                      </div>

                      {/* Introduction */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="introduction">Introduction</Label>
                        <ReactQuill
                          value={formData.introduction}
                          onChange={(value) => setFormData(prev => ({ ...prev, introduction: value }))}
                          className="bg-background rounded-md"
                          theme="snow"
                          modules={{
                            toolbar: [
                              [{ 'header': [1, 2, 3, false] }],
                              ['bold', 'italic', 'underline', 'strike'],
                              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                              ['link'],
                              ['clean']
                            ]
                          }}
                        />
                      </div>

                      {/* Disclaimer */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="disclaimer">Disclaimer</Label>
                        <Textarea
                          id="disclaimer"
                          value={formData.disclaimer}
                          onChange={(e) => setFormData(prev => ({ ...prev, disclaimer: e.target.value }))}
                          placeholder="Legal disclaimer"
                          rows={2}
                        />
                      </div>

                      {/* Tags */}
                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        <Input
                          id="tags"
                          value={formData.tags}
                          onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                          placeholder="california, legal, dispensaries"
                        />
                      </div>

                      {/* Read Time */}
                      <div className="space-y-2">
                        <Label htmlFor="readTime">Read Time</Label>
                        <Input
                          id="readTime"
                          value={formData.read_time}
                          onChange={(e) => setFormData(prev => ({ ...prev, read_time: e.target.value }))}
                          placeholder="10 min read"
                        />
                      </div>

                      {/* Author Name */}
                      <div className="space-y-2">
                        <Label htmlFor="authorName">Author Name</Label>
                        <Input
                          id="authorName"
                          value={formData.author_name}
                          onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                          placeholder="Admin"
                        />
                      </div>

                      {/* Status */}
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Affiliate Link */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="affiliateLink">Affiliate Link (Optional)</Label>
                        <Input
                          id="affiliateLink"
                          value={formData.affiliate_link}
                          onChange={(e) => setFormData(prev => ({ ...prev, affiliate_link: e.target.value }))}
                          placeholder="https://booking.com/..."
                        />
                      </div>

                      {/* Affiliate Link Text */}
                      <div className="space-y-2">
                        <Label htmlFor="affiliateLinkText">Affiliate Button Text</Label>
                        <Input
                          id="affiliateLinkText"
                          value={formData.affiliate_link_text}
                          onChange={(e) => setFormData(prev => ({ ...prev, affiliate_link_text: e.target.value }))}
                          placeholder="Book Now"
                        />
                      </div>

                      {/* Related Dispensaries */}
                      <div className="space-y-2 md:col-span-2">
                        <Label>Related Dispensaries (Optional)</Label>
                        <div className="flex flex-wrap gap-2 p-3 border border-border rounded-md min-h-[42px]">
                          {dispensaries && dispensaries.map((disp) => (
                            <label key={disp.id} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.related_dispensaries.includes(disp.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFormData(prev => ({ ...prev, related_dispensaries: [...prev.related_dispensaries, disp.id] }));
                                  } else {
                                    setFormData(prev => ({ ...prev, related_dispensaries: prev.related_dispensaries.filter(id => id !== disp.id) }));
                                  }
                                }}
                                className="rounded"
                              />
                              <span className="text-sm">{disp.name}</span>
                            </label>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">Dispensaries will show with images and links</p>
                      </div>

                      {/* Related Hotels */}
                      <div className="space-y-2 md:col-span-2">
                        <Label>Related 420 Rentals (Optional)</Label>
                        <div className="flex flex-wrap gap-2 p-3 border border-border rounded-md min-h-[42px]">
                          {hotels && hotels.map((hotel) => (
                            <label key={hotel.id} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.related_hotels.includes(hotel.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFormData(prev => ({ ...prev, related_hotels: [...prev.related_hotels, hotel.id] }));
                                  } else {
                                    setFormData(prev => ({ ...prev, related_hotels: prev.related_hotels.filter(id => id !== hotel.id) }));
                                  }
                                }}
                                className="rounded"
                              />
                              <span className="text-sm">{hotel.name}</span>
                            </label>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">Hotels will show with images and links</p>
                      </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 justify-end pt-4">
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={saveMutation.isPending} className="gap-2">
                        <Save className="w-4 h-4" />
                        {saveMutation.isPending ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Posts List */}
          {!isCreating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              {postsLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-accent" />
                </div>
              ) : posts && posts.length > 0 ? (
                posts.map((post) => (
                  <Card key={post.id} className="bg-gradient-card border-border/50">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-32 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                  {post.status}
                                </Badge>
                                <Badge variant="outline">{post.category}</Badge>
                                {post.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => loadPostForEdit(post)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setDeletePostId(post.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-gradient-card border-border/50">
                  <CardContent className="p-12 text-center">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No blog posts yet. Create your first post!</p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}
        </div>

        <Footer />
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletePostId} onOpenChange={() => setDeletePostId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletePostId && deleteMutation.mutate(deletePostId)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminBlog;