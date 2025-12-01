import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, MousePointerClick, TrendingUp, FileText, ShoppingCart, Percent, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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
  conversions?: number;
  revenue?: number;
  conversionRate?: number;
  affiliate_link: string | null;
}

export default function AdminRevenue() {
  const navigate = useNavigate();
  const { data: stats, isLoading } = useQuery({
    queryKey: ['affiliate-stats'],
    queryFn: async () => {
      // Get all clicks with blog post info
      const { data: clicks, error: clicksError } = await supabase
        .from('affiliate_clicks')
        .select('blog_post_id, clicked_at')
        .order('clicked_at', { ascending: false });

      if (clicksError) throw clicksError;

      // Get all conversions
      const { data: conversions, error: conversionsError } = await supabase
        .from('affiliate_conversions')
        .select('blog_post_id, booking_amount, commission_amount, status, converted_at')
        .order('converted_at', { ascending: false });

      if (conversionsError) throw conversionsError;

      // Get all blog posts with affiliate links
      const { data: posts, error: postsError } = await supabase
        .from('blog_posts')
        .select('id, title, affiliate_link')
        .not('affiliate_link', 'is', null);

      if (postsError) throw postsError;

      // Calculate stats per post
      const postStats: BlogPostStats[] = posts.map(post => {
        const postClicks = clicks.filter(c => c.blog_post_id === post.id).length;
        const postConversions = conversions.filter(c => c.blog_post_id === post.id && c.status === 'confirmed');
        const postRevenue = postConversions.reduce((sum, c) => sum + (Number(c.commission_amount) || 0), 0);
        const conversionRate = postClicks > 0 ? (postConversions.length / postClicks) * 100 : 0;

        return {
          ...post,
          clicks: postClicks,
          conversions: postConversions.length,
          revenue: postRevenue,
          conversionRate,
        };
      });

      // Calculate totals
      const totalClicks = clicks.length;
      const totalPosts = posts.length;
      const confirmedConversions = conversions.filter(c => c.status === 'confirmed');
      const totalConversions = confirmedConversions.length;
      const actualRevenue = confirmedConversions.reduce((sum, c) => sum + (Number(c.commission_amount) || 0), 0);
      const overallConversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

      // Calculate recent metrics (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentClicks = clicks.filter(
        c => new Date(c.clicked_at) > sevenDaysAgo
      ).length;
      const recentConversions = confirmedConversions.filter(
        c => new Date(c.converted_at) > sevenDaysAgo
      ).length;

      return {
        totalClicks,
        totalPosts,
        totalConversions,
        actualRevenue,
        overallConversionRate,
        recentClicks,
        recentConversions,
        postStats: postStats.sort((a, b) => b.revenue - a.revenue),
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
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent mb-2">
            Revenue Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track affiliate link performance and conversion rates
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-card/50 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Clicks
              </CardTitle>
              <MousePointerClick className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stats?.totalClicks || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                All-time clicks
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Conversions
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stats?.totalConversions || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Confirmed bookings
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Conv. Rate
              </CardTitle>
              <Percent className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stats?.overallConversionRate.toFixed(1) || 0}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Click to booking
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Actual Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${stats?.actualRevenue.toFixed(2) || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total commissions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Recent (7d)
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stats?.recentConversions || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                New bookings
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
              <div className="text-2xl font-bold text-foreground">
                {stats?.totalPosts || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                With affiliate links
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
                  <TableHead className="text-muted-foreground text-right">Conversions</TableHead>
                  <TableHead className="text-muted-foreground text-right">Conv. Rate</TableHead>
                  <TableHead className="text-muted-foreground text-right">Revenue</TableHead>
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
                        {post.conversions || 0}
                      </TableCell>
                      <TableCell className="text-right text-foreground">
                        {post.conversionRate ? post.conversionRate.toFixed(1) : '0.0'}%
                      </TableCell>
                      <TableCell className="text-right text-gold font-semibold">
                        ${(post.revenue || 0).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {(post.conversions || 0) > 0 ? (
                          <Badge className="bg-gold/20 text-gold border-gold/20">
                            Converting
                          </Badge>
                        ) : post.clicks > 0 ? (
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
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No affiliate links tracked yet. Add affiliate links to blog posts to start tracking.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Webhook Setup Instructions */}
        <Card className="bg-card/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground">
              Webhook Setup Instructions
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Configure booking platform webhooks to track actual conversions
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Webhook URL</h4>
              <code className="text-sm text-accent break-all">
                {typeof window !== 'undefined' ? window.location.origin : ''}/functions/v1/track-affiliate-conversion
              </code>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Required Payload Format:</h4>
              <pre className="text-xs bg-background/50 p-3 rounded border border-border/50 overflow-x-auto">
{`{
  "blog_post_id": "uuid-of-blog-post",
  "booking_id": "booking-reference-123",
  "booking_amount": 450.00,
  "commission_amount": 27.00,
  "commission_rate": 0.06,
  "platform": "expedia|kushkations|other",
  "customer_email": "customer@email.com",
  "status": "pending|confirmed|cancelled",
  "click_id": "optional-click-uuid"
}`}
              </pre>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Platform-Specific Setup:</h4>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li><strong>Expedia Affiliate Network:</strong> Configure postback URL in partner dashboard</li>
                <li><strong>Kushkations:</strong> Request webhook integration via partner support</li>
                <li><strong>Booking.com:</strong> Enable conversion tracking in affiliate settings</li>
                <li><strong>Custom Tracking:</strong> Send POST requests with booking data to webhook URL</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
