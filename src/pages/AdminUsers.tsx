import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Search, Shield, ArrowLeft, Loader2, User, Crown, UserMinus, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

interface UserProfile {
  id: string;
  display_name: string | null;
  created_at: string | null;
  roles: string[];
}

const AdminUsers = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
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

  // Fetch users with their roles
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, display_name, created_at")
        .order("created_at", { ascending: false });
      
      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role");
      
      if (rolesError) throw rolesError;

      // Map roles to users
      const rolesMap = new Map<string, string[]>();
      roles?.forEach(r => {
        const existing = rolesMap.get(r.user_id) || [];
        existing.push(r.role);
        rolesMap.set(r.user_id, existing);
      });

      return profiles?.map(p => ({
        ...p,
        roles: rolesMap.get(p.id) || [],
      })) as UserProfile[];
    },
    enabled: !!isAdmin,
  });

  // Add admin role mutation
  const addAdminMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role: "admin" });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Admin role granted");
      setDialogOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to grant admin role: " + error.message);
    },
  });

  // Remove admin role mutation
  const removeAdminMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", "admin");
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Admin role revoked");
      setDialogOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to revoke admin role: " + error.message);
    },
  });

  // Filter users
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (!searchQuery) return users;
    return users.filter(u =>
      u.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

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
        <title>User Management | BudQuest Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="container mx-auto max-w-6xl px-4 pt-24 pb-12">
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
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                User Management
              </h1>
              <p className="text-muted-foreground">View users and manage admin roles</p>
            </motion.div>
          </div>

          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or ID..."
              className="pl-10"
            />
          </div>

          {/* Users List */}
          {usersLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-20">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No users found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredUsers.map((userProfile) => (
                <Card
                  key={userProfile.id}
                  className="p-4 bg-gradient-card border-border/50 hover:border-accent/50 transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center">
                        {userProfile.roles.includes("admin") ? (
                          <Crown className="w-5 h-5 text-amber-400" />
                        ) : (
                          <User className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate">
                          {userProfile.display_name || "Unnamed User"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{userProfile.id}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {userProfile.roles.map((role) => (
                          <Badge
                            key={role}
                            variant={role === "admin" ? "default" : "secondary"}
                            className={role === "admin" ? "bg-amber-500/20 text-amber-400 border-amber-400/30" : ""}
                          >
                            {role}
                          </Badge>
                        ))}
                      </div>

                      <Dialog open={dialogOpen && selectedUser?.id === userProfile.id} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedUser(userProfile)}
                            disabled={userProfile.id === user.id}
                          >
                            {userProfile.roles.includes("admin") ? (
                              <UserMinus className="w-4 h-4" />
                            ) : (
                              <UserPlus className="w-4 h-4" />
                            )}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              {selectedUser?.roles.includes("admin")
                                ? "Revoke Admin Access"
                                : "Grant Admin Access"}
                            </DialogTitle>
                          </DialogHeader>
                          <p className="text-muted-foreground">
                            {selectedUser?.roles.includes("admin")
                              ? `Are you sure you want to revoke admin access for ${selectedUser?.display_name || "this user"}?`
                              : `Are you sure you want to grant admin access to ${selectedUser?.display_name || "this user"}?`}
                          </p>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button
                              variant={selectedUser?.roles.includes("admin") ? "destructive" : "default"}
                              onClick={() => {
                                if (selectedUser?.roles.includes("admin")) {
                                  removeAdminMutation.mutate(selectedUser.id);
                                } else if (selectedUser) {
                                  addAdminMutation.mutate(selectedUser.id);
                                }
                              }}
                              disabled={addAdminMutation.isPending || removeAdminMutation.isPending}
                            >
                              {(addAdminMutation.isPending || removeAdminMutation.isPending) && (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              )}
                              {selectedUser?.roles.includes("admin") ? "Revoke Access" : "Grant Access"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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

export default AdminUsers;
