import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { 
  Shield, 
  Loader2, 
  Scale, 
  MessageSquare, 
  MapPin, 
  Building2,
  ArrowRight,
  Settings,
  Users,
  Globe,
  Mail,
  FileText,
  DollarSign,
  Sparkles,
  Image,
  ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

interface AdminModule {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

const adminModules: AdminModule[] = [
  {
    title: "State Laws",
    description: "Manage cannabis laws for all US states, update legal statuses, possession limits, and more.",
    icon: Scale,
    href: "/admin/state-laws",
    color: "text-green-400",
  },
  {
    title: "Country Laws",
    description: "Update legal statuses for international destinations in the World Guide.",
    icon: Globe,
    href: "/admin/country-laws",
    color: "text-cyan-400",
  },
  {
    title: "Dispensaries",
    description: "Add, edit, and manage dispensary listings with verified badges.",
    icon: MapPin,
    href: "/admin/dispensaries",
    color: "text-purple-400",
  },
  {
    title: "Hotels",
    description: "Manage 420-friendly hotel listings with verified badges.",
    icon: Building2,
    href: "/admin/hotels",
    color: "text-amber-400",
  },
  {
    title: "Review Moderation",
    description: "Approve, reject, or manage user-submitted dispensary reviews.",
    icon: MessageSquare,
    href: "/admin/reviews",
    color: "text-blue-400",
  },
  {
    title: "User Management",
    description: "View users and manage admin roles.",
    icon: Users,
    href: "/admin/users",
    color: "text-amber-400",
  },
  {
    title: "Contact Submissions",
    description: "View and respond to contact form submissions from users.",
    icon: Mail,
    href: "/admin/contacts",
    color: "text-pink-400",
  },
  {
    title: "Blog Posts",
    description: "Create and manage blog articles with images and rich content.",
    icon: FileText,
    href: "/admin/blog",
    color: "text-indigo-400",
  },
  {
    title: "AI Bulk Generator",
    description: "Generate multiple destination guides at once using AI.",
    icon: Sparkles,
    href: "/admin/bulk-blog",
    color: "text-violet-400",
  },
  {
    title: "Country Images",
    description: "Upload and manage unique images for Asian and European countries.",
    icon: Image,
    href: "/admin/country-images",
    color: "text-emerald-400",
  },
  {
    title: "Revenue Dashboard",
    description: "Track affiliate link performance and conversion rates.",
    icon: DollarSign,
    href: "/admin/revenue",
    color: "text-gold",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

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

  // Fetch stats
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [statesRes, countriesRes, reviewsRes, dispensariesRes, usersRes] = await Promise.all([
        supabase.from("states").select("id", { count: "exact", head: true }),
        supabase.from("countries").select("id", { count: "exact", head: true }),
        supabase.from("reviews").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("dispensaries").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
      ]);
      return {
        states: statesRes.count || 0,
        countries: countriesRes.count || 0,
        pendingReviews: reviewsRes.count || 0,
        dispensaries: dispensariesRes.count || 0,
        users: usersRes.count || 0,
      };
    },
    enabled: !!isAdmin,
  });

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
          <p className="text-muted-foreground mb-6">
            Please sign in to access the admin panel.
          </p>
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
        <title>Admin Dashboard | BudQuest</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="container mx-auto max-w-6xl px-4 pt-24 pb-12">
          {/* Back Navigation */}
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 gap-2 text-muted-foreground hover:text-accent"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Settings className="w-8 h-8 text-accent" />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-muted-foreground">
              Manage BudQuest content, reviews, and legal information
            </p>
          </motion.div>

          {/* Stats Cards */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8"
            >
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-accent">{stats.states}</div>
                  <p className="text-sm text-muted-foreground">States</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-cyan-400">{stats.countries}</div>
                  <p className="text-sm text-muted-foreground">Countries</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-purple-400">{stats.dispensaries}</div>
                  <p className="text-sm text-muted-foreground">Dispensaries</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-amber-400">{stats.pendingReviews}</div>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-400">{stats.users}</div>
                  <p className="text-sm text-muted-foreground">Users</p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Admin Modules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-4">Admin Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {adminModules.map((module) => (
                <Card
                  key={module.title}
                  className="bg-gradient-card border-border/50 hover:border-accent/50 transition-all cursor-pointer group"
                  onClick={() => navigate(module.href)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-secondary/50 ${module.color}`}>
                          <module.icon className="w-5 h-5" />
                        </div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{module.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AdminDashboard;
