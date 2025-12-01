import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Shield, 
  Loader2, 
  Sparkles,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface Destination {
  id: string;
  name: string;
  state?: string;
  country?: string;
  code?: string;
  imageUrl?: string;
}

interface GenerationResult {
  destination: string;
  success?: boolean;
  error?: string;
  data?: any;
}

const AdminBulkBlog = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [template, setTemplate] = useState<string>("city-guide");
  const [category, setCategory] = useState<string>("City Guide");
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [progress, setProgress] = useState(0);

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

  // Predefined destination lists
  const destinationLists = {
    'top-us-cities': [
      { id: '1', name: 'Los Angeles', state: 'California', country: 'USA', imageUrl: '/blog-california.jpg' },
      { id: '2', name: 'San Francisco', state: 'California', country: 'USA', imageUrl: '/blog-california.jpg' },
      { id: '3', name: 'Denver', state: 'Colorado', country: 'USA', imageUrl: '/blog-colorado-ski.jpg' },
      { id: '4', name: 'Boulder', state: 'Colorado', country: 'USA', imageUrl: '/blog-colorado-rentals.jpg' },
      { id: '5', name: 'Portland', state: 'Oregon', country: 'USA', imageUrl: '/dest-california.jpg' },
      { id: '6', name: 'Seattle', state: 'Washington', country: 'USA', imageUrl: '/dest-california.jpg' },
      { id: '7', name: 'Las Vegas', state: 'Nevada', country: 'USA', imageUrl: '/dest-california.jpg' },
    ],
    'international': [
      { id: '8', name: 'Amsterdam', state: 'North Holland', country: 'Netherlands', imageUrl: '/blog-amsterdam.jpg' },
      { id: '9', name: 'Barcelona', state: 'Catalonia', country: 'Spain', imageUrl: '/blog-spain.jpg' },
      { id: '10', name: 'Toronto', state: 'Ontario', country: 'Canada', imageUrl: '/dest-canada-toronto.jpg' },
      { id: '11', name: 'Montevideo', state: 'Montevideo', country: 'Uruguay', imageUrl: '/blog-uruguay.jpg' },
      { id: '12', name: 'Bangkok', state: 'Bangkok', country: 'Thailand', imageUrl: '/blog-thailand.jpg' },
      { id: '13', name: 'Kingston', state: 'Surrey', country: 'Jamaica', imageUrl: '/blog-jamaica.jpg' },
    ],
    'us-states': [
      { id: '14', name: 'California', country: 'USA', imageUrl: '/dest-california.jpg' },
      { id: '15', name: 'Colorado', country: 'USA', imageUrl: '/blog-colorado-ski.jpg' },
      { id: '16', name: 'Oregon', country: 'USA', imageUrl: '/dest-california.jpg' },
      { id: '17', name: 'Washington', country: 'USA', imageUrl: '/dest-california.jpg' },
      { id: '18', name: 'Nevada', country: 'USA', imageUrl: '/dest-california.jpg' },
    ]
  };

  const [selectedList, setSelectedList] = useState<keyof typeof destinationLists>('top-us-cities');
  const currentDestinations = destinationLists[selectedList];

  // Generate blog posts mutation
  const generateMutation = useMutation({
    mutationFn: async () => {
      const destinations = currentDestinations.filter(d => 
        selectedDestinations.includes(d.id)
      );

      const { data, error } = await supabase.functions.invoke('generate-bulk-blog', {
        body: { destinations, template, category }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: async (data) => {
      setResults(data.results);
      
      // Save successful posts to database
      const successfulPosts = data.results.filter((r: GenerationResult) => r.success);
      
      for (const result of successfulPosts) {
        try {
          const { error } = await supabase
            .from('blog_posts')
            .insert([{
              ...result.data,
              author_name: 'Admin',
              author_avatar: '✍️',
              read_time: '10 min read',
              status: 'draft',
              created_by: user?.id,
              affiliate_link: null,
              affiliate_link_text: 'Book Now',
              related_dispensary_ids: [],
              related_hotel_ids: []
            }]);
          
          if (error) throw error;
        } catch (err) {
          console.error('Error saving post:', err);
        }
      }

      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast.success(`Generated ${successfulPosts.length} blog posts!`);
      setGenerating(false);
    },
    onError: (error: any) => {
      toast.error("Generation failed: " + error.message);
      setGenerating(false);
    },
  });

  const handleGenerate = () => {
    if (selectedDestinations.length === 0) {
      toast.error("Please select at least one destination");
      return;
    }

    setGenerating(true);
    setResults([]);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 1000);

    generateMutation.mutate();
  };

  const toggleDestination = (id: string) => {
    setSelectedDestinations(prev =>
      prev.includes(id)
        ? prev.filter(d => d !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedDestinations(currentDestinations.map(d => d.id));
  };

  const deselectAll = () => {
    setSelectedDestinations([]);
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
        <title>Bulk Blog Generator | BudQuest Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="container mx-auto max-w-6xl px-4 pt-24 pb-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-8 h-8 text-accent" />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Bulk Blog Generator
              </h1>
            </div>
            <p className="text-muted-foreground">
              Generate multiple destination guides at once using AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Template Selection */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Select Template</CardTitle>
                  <CardDescription>Choose the type of blog post to generate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Template Type</Label>
                    <Select value={template} onValueChange={setTemplate}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="city-guide">City Guide</SelectItem>
                        <SelectItem value="state-guide">State Guide</SelectItem>
                        <SelectItem value="comparison">Comparison Article</SelectItem>
                        <SelectItem value="airport-guide">Airport Guide</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="City Guide">City Guide</SelectItem>
                        <SelectItem value="State Guide">State Guide</SelectItem>
                        <SelectItem value="Travel Tips">Travel Tips</SelectItem>
                        <SelectItem value="Legal Info">Legal Info</SelectItem>
                        <SelectItem value="Comparison">Comparison</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Destination Selection */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Select Destinations</CardTitle>
                      <CardDescription>
                        {selectedDestinations.length} selected
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={selectAll}>
                        Select All
                      </Button>
                      <Button variant="outline" size="sm" onClick={deselectAll}>
                        Clear
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Destination List</Label>
                    <Select 
                      value={selectedList} 
                      onValueChange={(value) => {
                        setSelectedList(value as keyof typeof destinationLists);
                        setSelectedDestinations([]);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top-us-cities">Top US Cities (7)</SelectItem>
                        <SelectItem value="international">International Cities (6)</SelectItem>
                        <SelectItem value="us-states">US States (5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                    {currentDestinations.map((dest) => (
                      <div
                        key={dest.id}
                        className="flex items-center gap-2 p-3 rounded-lg border border-border/50 hover:border-accent/50 transition-colors"
                      >
                        <Checkbox
                          id={dest.id}
                          checked={selectedDestinations.includes(dest.id)}
                          onCheckedChange={() => toggleDestination(dest.id)}
                        />
                        <Label
                          htmlFor={dest.id}
                          className="flex-1 cursor-pointer"
                        >
                          <p className="font-medium">{dest.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {dest.state && `${dest.state}, `}{dest.country}
                          </p>
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={generating || selectedDestinations.length === 0}
                className="w-full gap-2"
                size="lg"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate {selectedDestinations.length} Blog Posts
                  </>
                )}
              </Button>

              {generating && (
                <div className="space-y-2">
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-muted-foreground text-center">
                    Generating content with AI...
                  </p>
                </div>
              )}
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Results
                  </CardTitle>
                  <CardDescription>
                    {results.length > 0 && `${results.length} posts processed`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {results.length === 0 ? (
                    <div className="text-center py-8">
                      <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">
                        Select destinations and click Generate to see results
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {results.map((result, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 p-3 rounded-lg border border-border/50"
                        >
                          {result.success ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {result.destination}
                            </p>
                            {result.error && (
                              <p className="text-xs text-red-500 mt-1">
                                {result.error}
                              </p>
                            )}
                            {result.success && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Created as draft
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {results.length > 0 && (
                <Card className="bg-gradient-card border-border/50">
                  <CardContent className="pt-6">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate('/admin/blog')}
                    >
                      View Generated Posts
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AdminBulkBlog;
