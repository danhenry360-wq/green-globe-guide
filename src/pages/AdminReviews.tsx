import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet';
import { Star, Check, X, Loader2, Shield, Clock, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Review {
  id: string;
  rating: number;
  title: string | null;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  user_id: string;
  dispensary_id: string;
  profiles: {
    display_name: string | null;
  } | null;
  dispensaries: {
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
    
    const { data, error } = await supabase
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
        profiles!reviews_user_id_fkey (
          display_name
        ),
        dispensaries (
          name,
          slug
        )
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      const transformedData = data.map(review => ({
        ...review,
        profiles: Array.isArray(review.profiles) ? review.profiles[0] : review.profiles,
        dispensaries: Array.isArray(review.dispensaries) ? review.dispensaries[0] : review.dispensaries,
        status: review.status as 'pending' | 'approved' | 'rejected'
      }));
      setReviews(transformedData);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchReviews();
    }
  }, [isAdmin]);

  const handleUpdateStatus = async (reviewId: string, newStatus: 'approved' | 'rejected') => {
    setProcessingId(reviewId);
    
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
      fetchReviews();
    }
    
    setProcessingId(null);
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

  const filteredReviews = reviews.filter(review => review.status === activeTab);

  const counts = {
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
  };

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
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-accent" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Review Moderation
              </h1>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <CardTitle className="text-lg text-foreground">
                                {review.dispensaries?.name || 'Unknown Dispensary'}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground">
                                By {review.profiles?.display_name || 'Anonymous'} • {format(new Date(review.created_at), 'MMM d, yyyy h:mm a')}
                              </p>
                            </div>
                            {getStatusBadge(review.status)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
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
