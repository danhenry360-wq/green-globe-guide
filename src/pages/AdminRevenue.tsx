import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, MousePointerClick, TrendingUp, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPostStats {
  id: string;
  title: string;
  clicks: number;
  affiliate_link: string | null;
}

export default function AdminRevenue() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['affiliate-stats'],
    queryFn: async () => {
      // Get all clicks with blog post info
      const { data: clicks, error: clicksError } = await supabase
        .from('affiliate_clicks')
        .select('blog_post_id, clicked_at')
        .order('clicked_at', { ascending: false });

      if (clicksError) throw clicksError;

      // Get all blog posts with affiliate links
      const { data: posts, error: postsError } = await supabase
        .from('blog_posts')
        .select('id, title, affiliate_link')
        .not('affiliate_link', 'is', null);

      if (postsError) throw postsError;

      // Calculate stats per post
      const postStats: BlogPostStats[] = posts.map(post => ({
        ...post,
        clicks: clicks.filter(c => c.blog_post_id === post.id).length,
      }));

      // Calculate totals
      const totalClicks = clicks.length;
      const totalPosts = posts.length;
      
      // Estimate revenue (assuming 5% average commission and $200 average booking)
      const estimatedRevenue = totalClicks * 0.05 * 200;

      // Calculate recent clicks (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentClicks = clicks.filter(
        c => new Date(c.clicked_at) > sevenDaysAgo
      ).length;

      return {
        totalClicks,
        totalPosts,
        estimatedRevenue,
        recentClicks,
        postStats: postStats.sort((a, b) => b.clicks - a.clicks),
      };
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-12 w-64" />
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent mb-2">
            Revenue Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track affiliate link performance and conversion rates
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-card/50 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Clicks
              </CardTitle>
              <MousePointerClick className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {stats?.totalClicks || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                All-time affiliate clicks
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Recent Clicks
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {stats?.recentClicks || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Last 7 days
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Estimated Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                ${stats?.estimatedRevenue.toFixed(0) || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on 5% avg commission
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Posts
              </CardTitle>
              <FileText className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {stats?.totalPosts || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Posts with affiliate links
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Table */}
        <Card className="bg-card/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground">
              Post Performance
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Affiliate link clicks per blog post
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableHead className="text-muted-foreground">Blog Post</TableHead>
                  <TableHead className="text-muted-foreground text-right">Clicks</TableHead>
                  <TableHead className="text-muted-foreground text-right">Est. Revenue</TableHead>
                  <TableHead className="text-muted-foreground text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats?.postStats && stats.postStats.length > 0 ? (
                  stats.postStats.map((post) => (
                    <TableRow key={post.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium text-foreground">
                        {post.title}
                      </TableCell>
                      <TableCell className="text-right text-foreground">
                        {post.clicks}
                      </TableCell>
                      <TableCell className="text-right text-foreground">
                        ${(post.clicks * 0.05 * 200).toFixed(0)}
                      </TableCell>
                      <TableCell className="text-right">
                        {post.clicks > 0 ? (
                          <Badge className="bg-accent/20 text-accent border-accent/20">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-white/20 text-muted-foreground">
                            No clicks yet
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                      No affiliate links tracked yet. Add affiliate links to blog posts to start tracking.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
