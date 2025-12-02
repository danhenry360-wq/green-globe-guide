import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Search, Image as ImageIcon, Loader2, ExternalLink, ArrowLeft } from "lucide-react";
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

interface StorageImage {
  name: string;
  id: string;
  created_at: string;
  updated_at: string;
  size: number;
  publicUrl: string;
}

const AdminImageGallery = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [images, setImages] = useState<StorageImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<StorageImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        if (!authLoading) {
          navigate("/");
          toast.error("Unauthorized access");
        }
        return;
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!error && data?.role === "admin") {
        setIsAdmin(true);
      } else {
        navigate("/");
        toast.error("Unauthorized access");
      }
    };

    checkAdminStatus();
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchImages();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredImages(
        images.filter((img) =>
          img.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredImages(images);
    }
  }, [searchTerm, images]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from("rental-images")
        .list();

      if (error) throw error;

      const imagesWithUrls = data.map((file) => {
        const { data: { publicUrl } } = supabase.storage
          .from("rental-images")
          .getPublicUrl(file.name);

        return {
          name: file.name,
          id: file.id,
          created_at: file.created_at,
          updated_at: file.updated_at,
          size: (file.metadata as any)?.size || 0,
          publicUrl,
        };
      });

      setImages(imagesWithUrls);
      setFilteredImages(imagesWithUrls);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to load images");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase.storage
        .from("rental-images")
        .remove([deleteTarget]);

      if (error) throw error;

      toast.success("Image deleted successfully");
      setImages(images.filter((img) => img.name !== deleteTarget));
      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (authLoading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/admin")}
              className="mb-4 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Admin
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent mb-2">
              Image Gallery Management
            </h1>
            <p className="text-muted-foreground">
              Manage uploaded rental property images
            </p>
          </div>

          {/* Search and Stats */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-accent" />
                <span>
                  {filteredImages.length} image{filteredImages.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Images Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
            </div>
          ) : filteredImages.length === 0 ? (
            <Card className="bg-card/70 backdrop-blur-sm border-accent/20 p-12">
              <div className="text-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {searchTerm ? "No images found" : "No images uploaded"}
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm
                    ? "Try adjusting your search"
                    : "Upload images from the Hotel Management page"}
                </p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <Card
                  key={image.id}
                  className="bg-card/70 backdrop-blur-sm border-accent/20 overflow-hidden group hover:border-accent/40 transition-colors"
                >
                  {/* Image Preview */}
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img
                      src={image.publicUrl}
                      alt={image.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "/dest-california.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Image Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-foreground truncate mb-1">
                        {image.name}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatFileSize(image.size)}</span>
                        <span>{formatDate(image.created_at)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2"
                        onClick={() => window.open(image.publicUrl, "_blank")}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        onClick={() => setDeleteTarget(image.name)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </div>

                    {/* Copy URL */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => {
                        navigator.clipboard.writeText(image.publicUrl);
                        toast.success("URL copied to clipboard");
                      }}
                    >
                      Copy URL
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image? This action cannot be undone.
              Any rentals using this image will display a fallback image.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminImageGallery;
