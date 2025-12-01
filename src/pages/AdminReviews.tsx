import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet';
import { Star, Check, X, Loader2, Shield, Clock, CheckCircle, XCircle, Trash2, Filter, BarChart3, TrendingUp, Users, MessageSquare } from 'lucide-react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';

interface Review {
  id: string;
  rating: number;
  title: string | null;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  user_id: string;
  dispensary_id: string | null;
  rental_id: string | null;
  profiles: {
    display_name: string | null;
  } | null;
  dispensaries: {
    name: string;
    slug: string;
  } | null;
  hotels: {
    name: string;
    slug: string;
  } | null;
}

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedReviews, setSelectedReviews] = useState<Set<string>>(new Set());
  const [bulkProcessing, setBulkProcessing] = useState(false);
  const [propertyFilter, setPropertyFilter] = useState<'all' | 'dispensary' | 'rental'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | '7days' | '30days' | '90days'>('all');
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) return;
      
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: 'admin'
      });
      
      if (!error && data) {
        setIsAdmin(true);
      } else {
        navigate('/');
        toast({
          title: 'Access Denied',
          description: 'You do not have permission to access this page.',
          variant: 'destructive',
        });
      }
    };

    if (!authLoading) {
      if (!isAuthenticated) {
        navigate('/auth');
      } else {
        checkAdmin();
      }
    }
  }, [user, isAuthenticated, authLoading, navigate, toast]);

  // Fetch reviews
  const fetchReviews = async () => {
    setLoading(true);
    
    // Fetch reviews with dispensary and rental data
    const { data: reviewsData, error: reviewsError } = await supabase
      .from('reviews')
      .select(`
        id,
        rating,
        title,
        content,
        status,
        created_at,
        user_id,
        dispensary_id,
        rental_id,
        dispensaries (
          name,
          slug
        ),
        hotels (
          name,
          slug
        )
      `)
      .order('created_at', { ascending: false });

    if (reviewsError || !reviewsData) {
      console.error('Error fetching reviews:', reviewsError);
      setLoading(false);
      return;
    }

    // Get unique user IDs and fetch profiles separately
    const userIds = [...new Set(reviewsData.map(r => r.user_id))];
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('id, display_name')
      .in('id', userIds);

    const profilesMap = new Map(profilesData?.map(p => [p.id, p]) || []);

    const transformedData = reviewsData.map(review => ({
      ...review,
      profiles: profilesMap.get(review.user_id) || null,
      dispensaries: Array.isArray(review.dispensaries) ? review.dispensaries[0] : review.dispensaries,
      hotels: Array.isArray(review.hotels) ? review.hotels[0] : review.hotels,
      status: review.status as 'pending' | 'approved' | 'rejected'
    }));
    
    setReviews(transformedData);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchReviews();
    }
  }, [isAdmin]);

  const handleUpdateStatus = async (reviewId: string, newStatus: 'approved' | 'rejected') => {
    setProcessingId(reviewId);
    
    // Find the review to get user info
    const review = reviews.find(r => r.id === reviewId);
    
    const { error } = await supabase
      .from('reviews')
      .update({
        status: newStatus,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user?.id
      })
      .eq('id', reviewId);

    if (error) {
      toast({
        title: 'Error',
        description: `Failed to ${newStatus} review.`,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `Review has been ${newStatus}.`,
      });
      
      // Send email notification
      if (review) {
        try {
          // Get user email
          const { data: userData } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', review.user_id)
            .single();
          
          if (userData) {
            const { data: authData } = await supabase.auth.admin.getUserById(review.user_id);
            
            if (authData?.user?.email) {
              await supabase.functions.invoke('notify-review-status', {
                body: {
                  reviewId: review.id,
                  status: newStatus,
                  userEmail: authData.user.email,
                  userName: review.profiles?.display_name || 'Valued User',
                  propertyName: review.dispensaries?.name || review.hotels?.name || 'Property',
                  propertyType: review.dispensaries ? 'dispensary' : 'rental'
                }
              });
            }
          }
        } catch (emailError) {
          console.error('Failed to send notification email:', emailError);
          // Don't show error to admin, just log it
        }
      }
      
      fetchReviews();
    }
    
    setProcessingId(null);
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to permanently delete this review? This action cannot be undone.')) return;
    
    setProcessingId(reviewId);
    
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete review.',
        variant: 'destructive',
      });
      setProcessingId(null);
    } else {
      await fetchReviews();
      toast({
        title: 'Success',
        description: 'Review has been permanently deleted.',
      });
      setProcessingId(null);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const handleBulkAction = async (action: 'approved' | 'rejected') => {
    if (selectedReviews.size === 0) {
      toast({
        title: 'No Reviews Selected',
        description: 'Please select at least one review to perform bulk actions.',
        variant: 'destructive',
      });
      return;
    }

    if (!confirm(`Are you sure you want to ${action} ${selectedReviews.size} review(s)?`)) return;

    setBulkProcessing(true);

    const promises = Array.from(selectedReviews).map(reviewId =>
      supabase
        .from('reviews')
        .update({
          status: action,
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id
        })
        .eq('id', reviewId)
    );

    const results = await Promise.all(promises);
    const errors = results.filter(r => r.error);

    if (errors.length > 0) {
      toast({
        title: 'Partial Success',
        description: `${selectedReviews.size - errors.length} review(s) ${action}, ${errors.length} failed.`,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `${selectedReviews.size} review(s) have been ${action}.`,
      });
    }

    setSelectedReviews(new Set());
    await fetchReviews();
    setBulkProcessing(false);
  };

  const toggleReviewSelection = (reviewId: string) => {
    setSelectedReviews(prev => {
      const next = new Set(prev);
      if (next.has(reviewId)) {
        next.delete(reviewId);
      } else {
        next.add(reviewId);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedReviews.size === filteredReviews.length) {
      setSelectedReviews(new Set());
    } else {
      setSelectedReviews(new Set(filteredReviews.map(r => r.id)));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="border-green-500 text-green-500"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="border-red-500 text-red-500"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return null;
    }
  };

  // Apply filters
  const filteredReviews = reviews.filter(review => {
    // Status filter
    if (review.status !== activeTab) return false;

    // Property type filter
    if (propertyFilter === 'dispensary' && !review.dispensary_id) return false;
    if (propertyFilter === 'rental' && !review.rental_id) return false;

    // Date filter
    if (dateFilter !== 'all') {
      const reviewDate = new Date(review.created_at);
      const now = new Date();
      const daysMap = { '7days': 7, '30days': 30, '90days': 90 };
      const cutoffDate = subDays(now, daysMap[dateFilter]);
      if (reviewDate < cutoffDate) return false;
    }

    return true;
  });

  const counts = {
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
  };

  // Analytics calculations
  const totalReviews = reviews.length;
  const approvalRate = totalReviews > 0 ? ((counts.approved / totalReviews) * 100).toFixed(1) : '0';
  const rejectionRate = totalReviews > 0 ? ((counts.rejected / totalReviews) * 100).toFixed(1) : '0';
  const dispensaryReviews = reviews.filter(r => r.dispensary_id).length;
  const rentalReviews = reviews.filter(r => r.rental_id).length;
  const uniqueReviewers = new Set(reviews.map(r => r.user_id)).size;
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : '0';

  if (authLoading || (!isAdmin && isAuthenticated)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Review Moderation | Admin | BudQuest</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-24 pb-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-accent" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                  Review Moderation
                </h1>
              </div>
              <Button
                onClick={() => setShowAnalytics(!showAnalytics)}
                variant="outline"
                className="border-accent/20 hover:bg-accent/10"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
              </Button>
            </div>

            {/* Analytics Dashboard */}
            {showAnalytics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="bg-card/70 border-accent/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-8 h-8 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Reviews</p>
                        <p className="text-2xl font-bold text-foreground">{totalReviews}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/70 border-accent/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Approval Rate</p>
                        <p className="text-2xl font-bold text-foreground">{approvalRate}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/70 border-accent/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Unique Reviewers</p>
                        <p className="text-2xl font-bold text-foreground">{uniqueReviewers}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/70 border-accent/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Star className="w-8 h-8 text-yellow-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Rating</p>
                        <p className="text-2xl font-bold text-foreground">{avgRating} / 5</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/70 border-accent/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Dispensary Reviews</p>
                        <p className="text-2xl font-bold text-foreground">{dispensaryReviews}</p>
                      </div>
                      <Badge variant="outline" className="border-accent text-accent">Dispensary</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/70 border-accent/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Rental Reviews</p>
                        <p className="text-2xl font-bold text-foreground">{rentalReviews}</p>
                      </div>
                      <Badge variant="outline" className="border-blue-500 text-blue-500">Rental</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/70 border-accent/20">
                  <CardContent className="p-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Rejection Rate</p>
                      <p className="text-2xl font-bold text-red-500">{rejectionRate}%</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/70 border-accent/20">
                  <CardContent className="p-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Reviews</p>
                      <p className="text-2xl font-bold text-yellow-500">{counts.pending}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Filters */}
            <Card className="bg-card/70 border-accent/20 mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Filters:</span>
                  </div>
                  
                  <Select value={propertyFilter} onValueChange={(value: any) => setPropertyFilter(value)}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Properties</SelectItem>
                      <SelectItem value="dispensary">Dispensaries Only</SelectItem>
                      <SelectItem value="rental">Rentals Only</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={dateFilter} onValueChange={(value: any) => setDateFilter(value)}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="7days">Last 7 Days</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="90days">Last 90 Days</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={() => {
                      setPropertyFilter('all');
                      setDateFilter('all');
                    }}
                    variant="outline"
                    className="border-muted-foreground/20"
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={(value) => { setActiveTab(value); setSelectedReviews(new Set()); }} className="space-y-6">
              <TabsList className="bg-card/70 border border-accent/20">
                <TabsTrigger value="pending" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  Pending ({counts.pending})
                </TabsTrigger>
                <TabsTrigger value="approved" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  Approved ({counts.approved})
                </TabsTrigger>
                <TabsTrigger value="rejected" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  Rejected ({counts.rejected})
                </TabsTrigger>
              </TabsList>

              {/* Bulk Actions Bar */}
              {activeTab === 'pending' && filteredReviews.length > 0 && (
                <Card className="bg-card/70 border-accent/20">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Checkbox
                          checked={selectedReviews.size === filteredReviews.length && filteredReviews.length > 0}
                          onCheckedChange={toggleSelectAll}
                        />
                        <span className="text-sm text-muted-foreground">
                          {selectedReviews.size > 0 
                            ? `${selectedReviews.size} review(s) selected` 
                            : 'Select all reviews'}
                        </span>
                      </div>
                      
                      {selectedReviews.size > 0 && (
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleBulkAction('approved')}
                            disabled={bulkProcessing}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            {bulkProcessing ? (
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                              <Check className="w-4 h-4 mr-2" />
                            )}
                            Approve Selected
                          </Button>
                          <Button
                            onClick={() => handleBulkAction('rejected')}
                            disabled={bulkProcessing}
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500/10"
                          >
                            {bulkProcessing ? (
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                              <X className="w-4 h-4 mr-2" />
                            )}
                            Reject Selected
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              <TabsContent value={activeTab}>
                {loading ? (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-8 h-8 animate-spin text-accent" />
                  </div>
                ) : filteredReviews.length === 0 ? (
                  <Card className="bg-card/70 border-accent/20">
                    <CardContent className="py-16 text-center">
                      <p className="text-muted-foreground">No {activeTab} reviews found.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredReviews.map((review) => (
                      <Card key={review.id} className="bg-card/70 border-accent/20">
                        <CardHeader className="pb-2">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div className="flex items-start gap-3 flex-1">
                              {activeTab === 'pending' && (
                                <Checkbox
                                  checked={selectedReviews.has(review.id)}
                                  onCheckedChange={() => toggleReviewSelection(review.id)}
                                  className="mt-1"
                                />
                              )}
                              <div className="flex-1">
                                <CardTitle className="text-lg text-foreground">
                                  {review.dispensaries?.name || review.hotels?.name || 'Unknown Property'}
                                </CardTitle>
                                <p className="text-xs text-muted-foreground mb-1">
                                  {review.dispensaries ? 'Dispensary Review' : 'Rental Review'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  By {review.profiles?.display_name || 'Anonymous'} • {format(new Date(review.created_at), 'MMM d, yyyy h:mm a')}
                                </p>
                              </div>
                            </div>
                            {getStatusBadge(review.status)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4"
                          style={{ paddingLeft: activeTab === 'pending' ? '3.5rem' : undefined }}
                        >
                          <div className="flex gap-1">{renderStars(review.rating)}</div>
                          
                          {review.title && (
                            <h4 className="font-semibold text-foreground">{review.title}</h4>
                          )}
                          
                          <p className="text-muted-foreground">{review.content}</p>
                          
                          {review.status === 'pending' && (
                            <div className="flex gap-3 pt-2">
                              <Button
                                onClick={() => handleUpdateStatus(review.id, 'approved')}
                                disabled={processingId === review.id}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                {processingId === review.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Approve
                                  </>
                                )}
                              </Button>
                              <Button
                                onClick={() => handleUpdateStatus(review.id, 'rejected')}
                                disabled={processingId === review.id}
                                variant="outline"
                                className="border-red-500 text-red-500 hover:bg-red-500/10"
                              >
                                {processingId === review.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <>
                                    <X className="w-4 h-4 mr-2" />
                                    Reject
                                  </>
                                )}
                              </Button>
                            </div>
                          )}
                          
                          {/* Delete button for approved/rejected reviews */}
                          {(review.status === 'approved' || review.status === 'rejected') && (
                            <div className="flex gap-3 pt-2">
                              <Button
                                onClick={() => handleDeleteReview(review.id)}
                                disabled={processingId === review.id}
                                variant="outline"
                                className="border-red-500 text-red-500 hover:bg-red-500/10"
                              >
                                {processingId === review.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Permanently
                                  </>
                                )}
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AdminReviews;
