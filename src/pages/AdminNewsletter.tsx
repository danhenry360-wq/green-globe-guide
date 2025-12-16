import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Search, Shield, ArrowLeft, Loader2, Newspaper, Trash2, 
  Mail, Calendar, CheckCircle, XCircle, Download
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { format } from "date-fns";

interface Subscriber {
  id: string;
  email: string;
  source_page: string | null;
  subscribed_at: string;
  unsubscribed_at: string | null;
  is_active: boolean | null;
}

const AdminNewsletter = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subscriberToDelete, setSubscriberToDelete] = useState<Subscriber | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

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

  // Fetch subscribers
  const { data: subscribers, isLoading: subscribersLoading } = useQuery({
    queryKey: ["admin-newsletter-subscribers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });
      if (error) throw error;
      return data as Subscriber[];
    },
    enabled: !!isAdmin,
  });

  // Toggle active status mutation
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .update({ 
          is_active, 
          unsubscribed_at: is_active ? null : new Date().toISOString() 
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-newsletter-subscribers"] });
      toast.success("Subscriber status updated");
    },
    onError: (error) => {
      toast.error("Failed to update subscriber: " + error.message);
    },
  });

  // Filter subscribers
  const filteredSubscribers = useMemo(() => {
    if (!subscribers) return [];
    let filtered = subscribers;
    
    // Apply status filter
    if (statusFilter === "active") {
      filtered = filtered.filter(s => s.is_active);
    } else if (statusFilter === "inactive") {
      filtered = filtered.filter(s => !s.is_active);
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.source_page && s.source_page.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return filtered;
  }, [subscribers, searchQuery, statusFilter]);

  // Export to CSV
  const handleExportCSV = () => {
    if (!filteredSubscribers.length) {
      toast.error("No subscribers to export");
      return;
    }

    const csvHeader = "Email,Source Page,Subscribed At,Is Active\n";
    const csvContent = filteredSubscribers
      .map(s => `"${s.email}","${s.source_page || ''}","${s.subscribed_at}","${s.is_active}"`)
      .join("\n");
    
    const blob = new Blob([csvHeader + csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Exported to CSV");
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

  const activeCount = subscribers?.filter(s => s.is_active).length || 0;
  const inactiveCount = subscribers?.filter(s => !s.is_active).length || 0;

  return (
    <>
      <Helmet>
        <title>Newsletter Subscribers | BudQuest Admin</title>
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Newspaper className="w-8 h-8 text-accent" />
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                    Newsletter Subscribers
                  </h1>
                </div>
                <p className="text-muted-foreground">Manage email newsletter subscriptions</p>
              </div>
              <Button onClick={handleExportCSV} className="gap-2">
                <Download className="w-4 h-4" /> Export CSV
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            <Card className="bg-gradient-card border-border/50 p-4">
              <div className="text-2xl font-bold text-foreground">{subscribers?.length || 0}</div>
              <p className="text-sm text-muted-foreground">Total Subscribers</p>
            </Card>
            <Card className="bg-gradient-card border-border/50 p-4">
              <div className="text-2xl font-bold text-green-400">{activeCount}</div>
              <p className="text-sm text-muted-foreground">Active</p>
            </Card>
            <Card className="bg-gradient-card border-border/50 p-4">
              <div className="text-2xl font-bold text-red-400">{inactiveCount}</div>
              <p className="text-sm text-muted-foreground">Unsubscribed</p>
            </Card>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by email or source..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("active")}
                className="gap-1"
              >
                <CheckCircle className="w-4 h-4" /> Active
              </Button>
              <Button
                variant={statusFilter === "inactive" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("inactive")}
                className="gap-1"
              >
                <XCircle className="w-4 h-4" /> Inactive
              </Button>
            </div>
          </div>

          {/* Subscribers List */}
          {subscribersLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="text-center py-20">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No subscribers found.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredSubscribers.map((subscriber) => (
                <Card
                  key={subscriber.id}
                  className="p-4 bg-gradient-card border-border/50 hover:border-accent/50 transition-all"
                >
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-secondary/50">
                        <Mail className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">{subscriber.email}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(subscriber.subscribed_at), "MMM d, yyyy")}
                          {subscriber.source_page && (
                            <>
                              <span>•</span>
                              <span>{subscriber.source_page}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={subscriber.is_active 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-red-500/20 text-red-400"
                        }
                      >
                        {subscriber.is_active ? "Active" : "Unsubscribed"}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleActiveMutation.mutate({ 
                          id: subscriber.id, 
                          is_active: !subscriber.is_active 
                        })}
                      >
                        {subscriber.is_active ? "Deactivate" : "Reactivate"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AdminNewsletter;