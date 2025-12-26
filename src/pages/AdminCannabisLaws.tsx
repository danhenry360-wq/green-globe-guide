import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedAdminRoute } from "@/components/ProtectedAdminRoute";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Loader2, Search, ArrowUpDown, Download, Trash2, Plus, Globe, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import type { Database } from "@/integrations/supabase/types";

type LegalStatus = Database["public"]["Enums"]["legal_status"];

interface LawRecord {
  id: string;
  name: string;
  slug: string;
  status: LegalStatus;
  possession_limits: string | null;
  last_updated: string | null;
  type: "state" | "country";
  // State-specific fields
  tourist_notes?: string | null;
  where_to_consume?: string | null;
  driving_rules?: string | null;
  airport_rules?: string | null;
  // Country-specific fields
  age_limit?: number | null;
  purchase_limits?: string | null;
  consumption_notes?: string | null;
  penalties?: string | null;
  source_url?: string | null;
  region?: string | null;
}

type SortField = "name" | "status" | "last_updated" | "type";
type SortDirection = "asc" | "desc";

const LEGAL_STATUS_OPTIONS: LegalStatus[] = ["illegal", "decriminalized", "medical", "recreational"];

const getStatusBadge = (lastUpdated: string | null) => {
  if (!lastUpdated) {
    return <Badge variant="destructive">Never Updated</Badge>;
  }
  
  const days = differenceInDays(new Date(), new Date(lastUpdated));
  
  if (days <= 30) {
    return <Badge className="bg-green-600 hover:bg-green-700">Current</Badge>;
  } else if (days <= 90) {
    return <Badge className="bg-yellow-600 hover:bg-yellow-700">Needs Review</Badge>;
  } else {
    return <Badge variant="destructive">Outdated</Badge>;
  }
};

const getLegalStatusBadge = (status: LegalStatus) => {
  const colors: Record<LegalStatus, string> = {
    recreational: "bg-green-600 hover:bg-green-700",
    medical: "bg-blue-600 hover:bg-blue-700",
    decriminalized: "bg-yellow-600 hover:bg-yellow-700",
    illegal: "bg-red-600 hover:bg-red-700",
  };
  
  return <Badge className={colors[status]}>{status}</Badge>;
};

export default function AdminCannabisLaws() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("last_updated");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedRecords, setSelectedRecords] = useState<Set<string>>(new Set());
  const [editingRecord, setEditingRecord] = useState<LawRecord | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "state" | "country">("all");

  // Fetch states
  const { data: states, isLoading: statesLoading } = useQuery({
    queryKey: ["admin-states"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("states")
        .select("*")
        .order("last_updated", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Fetch countries
  const { data: countries, isLoading: countriesLoading } = useQuery({
    queryKey: ["admin-countries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("countries")
        .select("*")
        .order("last_updated", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Combine and transform data
  const allRecords: LawRecord[] = useMemo(() => {
    const stateRecords: LawRecord[] = (states || []).map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      status: s.status,
      possession_limits: s.possession_limits,
      last_updated: s.last_updated,
      type: "state" as const,
      tourist_notes: s.tourist_notes,
      where_to_consume: s.where_to_consume,
      driving_rules: s.driving_rules,
      airport_rules: s.airport_rules,
    }));

    const countryRecords: LawRecord[] = (countries || []).map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      status: c.status,
      possession_limits: c.possession_limits,
      last_updated: c.last_updated,
      type: "country" as const,
      age_limit: c.age_limit,
      purchase_limits: c.purchase_limits,
      consumption_notes: c.consumption_notes,
      penalties: c.penalties,
      source_url: c.source_url,
      region: c.region,
      airport_rules: c.airport_rules,
    }));

    return [...stateRecords, ...countryRecords];
  }, [states, countries]);

  // Filter and sort records
  const filteredRecords = useMemo(() => {
    let records = allRecords;

    // Filter by type
    if (filterType !== "all") {
      records = records.filter((r) => r.type === filterType);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      records = records.filter((r) => r.name.toLowerCase().includes(query));
    }

    // Sort
    records.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        case "type":
          comparison = a.type.localeCompare(b.type);
          break;
        case "last_updated":
          const dateA = a.last_updated ? new Date(a.last_updated).getTime() : 0;
          const dateB = b.last_updated ? new Date(b.last_updated).getTime() : 0;
          comparison = dateA - dateB;
          break;
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return records;
  }, [allRecords, searchQuery, sortField, sortDirection, filterType]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (record: LawRecord) => {
      const now = new Date().toISOString();
      
      if (record.type === "state") {
        const { error } = await supabase
          .from("states")
          .update({
            status: record.status,
            possession_limits: record.possession_limits,
            tourist_notes: record.tourist_notes,
            where_to_consume: record.where_to_consume,
            driving_rules: record.driving_rules,
            airport_rules: record.airport_rules,
            last_updated: now,
          })
          .eq("id", record.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("countries")
          .update({
            status: record.status,
            possession_limits: record.possession_limits,
            age_limit: record.age_limit,
            purchase_limits: record.purchase_limits,
            consumption_notes: record.consumption_notes,
            penalties: record.penalties,
            source_url: record.source_url,
            airport_rules: record.airport_rules,
            last_updated: now,
          })
          .eq("id", record.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-states"] });
      queryClient.invalidateQueries({ queryKey: ["admin-countries"] });
      toast.success("Record updated successfully");
      setIsEditDialogOpen(false);
      setEditingRecord(null);
    },
    onError: (error) => {
      toast.error(`Failed to update: ${error.message}`);
    },
  });

  // Bulk delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (records: LawRecord[]) => {
      const stateIds = records.filter((r) => r.type === "state").map((r) => r.id);
      const countryIds = records.filter((r) => r.type === "country").map((r) => r.id);

      if (stateIds.length > 0) {
        const { error } = await supabase.from("states").delete().in("id", stateIds);
        if (error) throw error;
      }

      if (countryIds.length > 0) {
        const { error } = await supabase.from("countries").delete().in("id", countryIds);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-states"] });
      queryClient.invalidateQueries({ queryKey: ["admin-countries"] });
      toast.success("Records deleted successfully");
      setSelectedRecords(new Set());
    },
    onError: (error) => {
      toast.error(`Failed to delete: ${error.message}`);
    },
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleSelectAll = () => {
    if (selectedRecords.size === filteredRecords.length) {
      setSelectedRecords(new Set());
    } else {
      setSelectedRecords(new Set(filteredRecords.map((r) => `${r.type}-${r.id}`)));
    }
  };

  const handleSelectRecord = (record: LawRecord) => {
    const key = `${record.type}-${record.id}`;
    const newSelected = new Set(selectedRecords);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSelectedRecords(newSelected);
  };

  const handleBulkDelete = () => {
    const recordsToDelete = filteredRecords.filter(
      (r) => selectedRecords.has(`${r.type}-${r.id}`)
    );
    if (confirm(`Are you sure you want to delete ${recordsToDelete.length} records?`)) {
      deleteMutation.mutate(recordsToDelete);
    }
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Type", "Status", "Possession Limits", "Last Updated"];
    const rows = filteredRecords.map((r) => [
      r.name,
      r.type,
      r.status,
      r.possession_limits || "",
      r.last_updated ? format(new Date(r.last_updated), "yyyy-MM-dd") : "",
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cannabis-laws-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEditClick = (record: LawRecord) => {
    setEditingRecord({ ...record });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingRecord) {
      updateMutation.mutate(editingRecord);
    }
  };

  const isLoading = statesLoading || countriesLoading;

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 ml-1" />;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1" />
    );
  };

  return (
    <ProtectedAdminRoute>
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-2xl">Cannabis Law Management</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={handleExportCSV}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                  {selectedRecords.size > 0 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleBulkDelete}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete ({selectedRecords.size})
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={(v) => setFilterType(v as typeof filterType)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Records</SelectItem>
                    <SelectItem value="state">US States Only</SelectItem>
                    <SelectItem value="country">Countries Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-2xl font-bold">{allRecords.length}</div>
                  <div className="text-sm text-muted-foreground">Total Records</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-2xl font-bold">{states?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">US States</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-2xl font-bold">{countries?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-2xl font-bold">
                    {allRecords.filter((r) => r.status === "recreational").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Recreational Legal</div>
                </div>
              </div>

              {/* Table */}
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-accent" />
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedRecords.size === filteredRecords.length && filteredRecords.length > 0}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead>
                          <button
                            onClick={() => handleSort("name")}
                            className="flex items-center font-medium hover:text-foreground"
                          >
                            Name <SortIcon field="name" />
                          </button>
                        </TableHead>
                        <TableHead>
                          <button
                            onClick={() => handleSort("type")}
                            className="flex items-center font-medium hover:text-foreground"
                          >
                            Type <SortIcon field="type" />
                          </button>
                        </TableHead>
                        <TableHead>
                          <button
                            onClick={() => handleSort("status")}
                            className="flex items-center font-medium hover:text-foreground"
                          >
                            Legal Status <SortIcon field="status" />
                          </button>
                        </TableHead>
                        <TableHead>Possession Limits</TableHead>
                        <TableHead>
                          <button
                            onClick={() => handleSort("last_updated")}
                            className="flex items-center font-medium hover:text-foreground"
                          >
                            Last Updated <SortIcon field="last_updated" />
                          </button>
                        </TableHead>
                        <TableHead>Freshness</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            No records found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRecords.map((record) => (
                          <TableRow
                            key={`${record.type}-${record.id}`}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => handleEditClick(record)}
                          >
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                checked={selectedRecords.has(`${record.type}-${record.id}`)}
                                onCheckedChange={() => handleSelectRecord(record)}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{record.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {record.type === "state" ? (
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <Globe className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className="capitalize">{record.type}</span>
                              </div>
                            </TableCell>
                            <TableCell>{getLegalStatusBadge(record.status)}</TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {record.possession_limits || "-"}
                            </TableCell>
                            <TableCell>
                              {record.last_updated
                                ? format(new Date(record.last_updated), "MMM d, yyyy")
                                : "Never"}
                            </TableCell>
                            <TableCell>{getStatusBadge(record.last_updated)}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}

              <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredRecords.length} of {allRecords.length} records
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Edit {editingRecord?.type === "state" ? "State" : "Country"}: {editingRecord?.name}
              </DialogTitle>
            </DialogHeader>
            {editingRecord && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Legal Status</Label>
                    <Select
                      value={editingRecord.status}
                      onValueChange={(v) =>
                        setEditingRecord({ ...editingRecord, status: v as LegalStatus })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LEGAL_STATUS_OPTIONS.map((status) => (
                          <SelectItem key={status} value={status}>
                            <span className="capitalize">{status}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {editingRecord.type === "country" && (
                    <div className="space-y-2">
                      <Label>Minimum Age</Label>
                      <Input
                        type="number"
                        value={editingRecord.age_limit || ""}
                        onChange={(e) =>
                          setEditingRecord({
                            ...editingRecord,
                            age_limit: e.target.value ? parseInt(e.target.value) : null,
                          })
                        }
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Possession Limits</Label>
                  <Textarea
                    value={editingRecord.possession_limits || ""}
                    onChange={(e) =>
                      setEditingRecord({ ...editingRecord, possession_limits: e.target.value })
                    }
                    rows={2}
                  />
                </div>

                {editingRecord.type === "country" && (
                  <>
                    <div className="space-y-2">
                      <Label>Purchase Limits</Label>
                      <Textarea
                        value={editingRecord.purchase_limits || ""}
                        onChange={(e) =>
                          setEditingRecord({ ...editingRecord, purchase_limits: e.target.value })
                        }
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Consumption Notes</Label>
                      <Textarea
                        value={editingRecord.consumption_notes || ""}
                        onChange={(e) =>
                          setEditingRecord({ ...editingRecord, consumption_notes: e.target.value })
                        }
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Penalties</Label>
                      <Textarea
                        value={editingRecord.penalties || ""}
                        onChange={(e) =>
                          setEditingRecord({ ...editingRecord, penalties: e.target.value })
                        }
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Source URL</Label>
                      <Input
                        value={editingRecord.source_url || ""}
                        onChange={(e) =>
                          setEditingRecord({ ...editingRecord, source_url: e.target.value })
                        }
                      />
                    </div>
                  </>
                )}

                {editingRecord.type === "state" && (
                  <>
                    <div className="space-y-2">
                      <Label>Tourist Notes</Label>
                      <Textarea
                        value={editingRecord.tourist_notes || ""}
                        onChange={(e) =>
                          setEditingRecord({ ...editingRecord, tourist_notes: e.target.value })
                        }
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Where to Consume</Label>
                      <Textarea
                        value={editingRecord.where_to_consume || ""}
                        onChange={(e) =>
                          setEditingRecord({ ...editingRecord, where_to_consume: e.target.value })
                        }
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Driving Rules</Label>
                      <Textarea
                        value={editingRecord.driving_rules || ""}
                        onChange={(e) =>
                          setEditingRecord({ ...editingRecord, driving_rules: e.target.value })
                        }
                        rows={2}
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label>Airport Rules</Label>
                  <Textarea
                    value={editingRecord.airport_rules || ""}
                    onChange={(e) =>
                      setEditingRecord({ ...editingRecord, airport_rules: e.target.value })
                    }
                    rows={2}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit} disabled={updateMutation.isPending}>
                {updateMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedAdminRoute>
  );
}
