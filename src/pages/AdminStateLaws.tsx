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
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Search, Edit, Shield, ArrowLeft, Save, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { getStatusBadgeClasses } from "@/lib/legal-status-colors";

type LegalStatus = "recreational" | "medical" | "decriminalized" | "illegal";

interface StateRecord {
  id: string;
  name: string;
  slug: string;
  status: LegalStatus;
  possession_limits: string | null;
  airport_rules: string | null;
  driving_rules: string | null;
  where_to_consume: string | null;
  tourist_notes: string | null;
  last_updated: string | null;
}

const AdminStateLaws = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [editingState, setEditingState] = useState<StateRecord | null>(null);
  const [formData, setFormData] = useState<Partial<StateRecord>>({});

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

  // Fetch states from database
  const { data: states, isLoading: statesLoading } = useQuery({
    queryKey: ["admin-states"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("states")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as StateRecord[];
    },
    enabled: !!isAdmin,
  });

  // Update state mutation
  const updateStateMutation = useMutation({
    mutationFn: async (stateData: Partial<StateRecord> & { id: string }) => {
      const { id, ...updates } = stateData;
      const { error } = await supabase
        .from("states")
        .update({
          ...updates,
          last_updated: new Date().toISOString(),
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-states"] });
      toast.success("State laws updated successfully");
      setEditingState(null);
    },
    onError: (error) => {
      toast.error("Failed to update state: " + error.message);
    },
  });

  // Filter states by search
  const filteredStates = useMemo(() => {
    if (!states) return [];
    if (!searchQuery) return states;
    return states.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [states, searchQuery]);

  // Handle edit click
  const handleEdit = (state: StateRecord) => {
    setEditingState(state);
    setFormData({
      status: state.status,
      possession_limits: state.possession_limits || "",
      airport_rules: state.airport_rules || "",
      driving_rules: state.driving_rules || "",
      where_to_consume: state.where_to_consume || "",
      tourist_notes: state.tourist_notes || "",
    });
  };

  // Handle form save
  const handleSave = () => {
    if (!editingState) return;
    updateStateMutation.mutate({
      id: editingState.id,
      ...formData,
    });
  };

  // Loading states
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
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto max-w-7xl px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 gap-2 pl-0 hover:bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
              State Laws Admin
            </h1>
            <p className="text-muted-foreground">
              Manage cannabis laws for all US states
            </p>
          </motion.div>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search states..."
            className="pl-10"
          />
        </div>

        {/* States Grid */}
        {statesLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : filteredStates.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No states found in database.</p>
            <p className="text-sm text-muted-foreground/60 mt-2">
              States are managed via the database. Contact support to seed data.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStates.map((state) => (
              <Card
                key={state.id}
                className="p-4 bg-gradient-card border-border/50 hover:border-accent/50 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">
                      {state.name}
                    </h3>
                    <Badge
                      className={`${getStatusBadgeClasses(state.status)} mt-1 capitalize`}
                    >
                      {state.status}
                    </Badge>
                    {state.last_updated && (
                      <p className="text-xs text-muted-foreground/60 mt-2">
                        Updated:{" "}
                        {new Date(state.last_updated).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(state)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit {editingState?.name} Laws</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4 mt-4">
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
                              <SelectItem value="recreational">
                                Recreational
                              </SelectItem>
                              <SelectItem value="medical">Medical</SelectItem>
                              <SelectItem value="decriminalized">
                                Decriminalized
                              </SelectItem>
                              <SelectItem value="illegal">Illegal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Possession Limits</Label>
                          <Textarea
                            value={formData.possession_limits || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                possession_limits: e.target.value,
                              })
                            }
                            placeholder="e.g., 1 oz flower | 8 g concentrate"
                            rows={2}
                          />
                        </div>

                        <div>
                          <Label>Airport Rules</Label>
                          <Textarea
                            value={formData.airport_rules || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                airport_rules: e.target.value,
                              })
                            }
                            placeholder="Airport and federal land rules..."
                            rows={2}
                          />
                        </div>

                        <div>
                          <Label>Driving Rules</Label>
                          <Textarea
                            value={formData.driving_rules || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                driving_rules: e.target.value,
                              })
                            }
                            placeholder="DUI laws and transport rules..."
                            rows={2}
                          />
                        </div>

                        <div>
                          <Label>Where to Consume</Label>
                          <Textarea
                            value={formData.where_to_consume || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                where_to_consume: e.target.value,
                              })
                            }
                            placeholder="Private property only, lounges, etc."
                            rows={2}
                          />
                        </div>

                        <div>
                          <Label>Tourist Notes</Label>
                          <Textarea
                            value={formData.tourist_notes || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                tourist_notes: e.target.value,
                              })
                            }
                            placeholder="Important info for travelers..."
                            rows={3}
                          />
                        </div>

                        <Button
                          onClick={handleSave}
                          disabled={updateStateMutation.isPending}
                          className="w-full"
                        >
                          {updateStateMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          ) : (
                            <Save className="w-4 h-4 mr-2" />
                          )}
                          Save Changes
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminStateLaws;
