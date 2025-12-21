import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet';
import {
  User,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Loader2,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Upload,
  Heart
} from 'lucide-react';
import { useFavorites, FavoriteItem } from '@/hooks/useFavorites';
import { format } from 'date-fns';

interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
}

interface Review {
  id: string;
  rating: number;
  title: string | null;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  dispensary_id: string | null;
  rental_id: string | null;
  dispensaries: {
    name: string;
    slug: string;
  } | null;
  hotels: {
    name: string;
    slug: string;
  } | null;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [emailVerified, setEmailVerified] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [isResendingVerification, setIsResendingVerification] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editDisplayName, setEditDisplayName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const { user, isAuthenticated, loading: authLoading, resendOTP } = useAuth();
  const { favorites, isLoading: favoritesLoading } = useFavorites();

  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Fetch user data and reviews
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      setLoading(true);

      try {
        // Get user email and verification status
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          setUserEmail(authUser.email || '');
          setEmailVerified(!!authUser.email_confirmed_at);
        }

        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (!profileError && profileData) {
          setProfile(profileData);
        }

        // Fetch user's reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select(`
            id,
            rating,
            title,
            content,
            status,
            created_at,
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
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (!reviewsError && reviewsData) {
          const transformedReviews = reviewsData.map(review => ({
            ...review,
            dispensaries: Array.isArray(review.dispensaries) ? review.dispensaries[0] : review.dispensaries,
            hotels: Array.isArray(review.hotels) ? review.hotels[0] : review.hotels,
            status: review.status as 'pending' | 'approved' | 'rejected'
          }));
          setReviews(transformedReviews);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleResendVerification = async () => {
    if (!userEmail || resendCooldown > 0 || isResendingVerification) return;

    setIsResendingVerification(true);

    try {
      const { error } = await resendOTP(userEmail);

      if (error) {
        toast({
          title: 'Failed to Send',
          description: error.message || 'Could not send verification email.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Verification Email Sent!',
          description: 'Check your inbox for the 6-digit verification code.',
        });
        setResendCooldown(60);
        // Redirect to verify page
        navigate('/verify-email', { state: { email: userEmail } });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsResendingVerification(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File Too Large',
          description: 'Avatar must be less than 5MB',
          variant: 'destructive',
        });
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartEdit = () => {
    setEditDisplayName(profile?.display_name || '');
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditDisplayName('');
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setIsSaving(true);

    try {
      let avatarUrl = profile?.avatar_url;

      // Upload avatar if changed
      if (avatarFile) {
        setIsUploadingAvatar(true);

        // Delete old avatar if exists
        if (profile?.avatar_url) {
          const oldPath = profile.avatar_url.split('/').pop();
          if (oldPath) {
            await supabase.storage
              .from('avatars')
              .remove([`${user.id}/${oldPath}`]);
          }
        }

        // Upload new avatar
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        avatarUrl = urlData.publicUrl;
        setIsUploadingAvatar(false);
      }

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          display_name: editDisplayName.trim() || null,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setProfile({
        ...profile!,
        display_name: editDisplayName.trim() || null,
        avatar_url: avatarUrl || null
      });

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been saved successfully.',
      });

      // Invalidate user profile query to update Navigation immediately
      queryClient.invalidateQueries({ queryKey: ['user-profile', user.id] });

      handleCancelEdit();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update profile.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
      setIsUploadingAvatar(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-gold text-gold' : 'text-muted-foreground/30'
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

  const filteredReviews = activeTab === 'all'
    ? reviews
    : reviews.filter(review => review.status === activeTab);

  const counts = {
    all: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
    favorites: favorites.length,
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Profile | BudQuest</title>
        <meta name="description" content="View your BudQuest profile, review history, and account verification status." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-24 pb-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="flex items-center gap-3 mb-8">
              <User className="w-8 h-8 text-accent" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                My Profile
              </h1>
            </div>

            {/* Account Info Card */}
            <Card className="bg-card/70 backdrop-blur-sm border-accent/20 mb-6">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle className="text-xl text-foreground">Account Information</CardTitle>
                  <CardDescription className="text-muted-foreground">Your BudQuest account details</CardDescription>
                </div>
                {!isEditing && (
                  <Button
                    onClick={handleStartEdit}
                    variant="outline"
                    size="sm"
                    className="border-accent/30 text-accent hover:bg-accent/10 w-full sm:w-auto"
                  >
                    Edit Profile
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-start gap-4">
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-accent/20 border-2 border-accent/30 flex items-center justify-center">
                      {avatarPreview || profile?.avatar_url ? (
                        <img
                          src={avatarPreview || profile?.avatar_url || ''}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-10 h-10 text-accent" />
                      )}
                    </div>
                    {isUploadingAvatar && (
                      <div className="absolute inset-0 bg-background/80 rounded-full flex items-center justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-accent" />
                      </div>
                    )}
                    {!isEditing && (
                      <div className="absolute inset-0 bg-background/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={handleStartEdit}>
                        <Upload className="w-6 h-6 text-accent" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <>
                        <label htmlFor="avatar-upload" className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-lg transition-colors">
                          <Upload className="w-4 h-4 text-accent" />
                          <span className="text-sm text-accent font-medium">
                            {avatarFile ? 'Change Photo' : 'Upload Photo'}
                          </span>
                        </label>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          JPG, PNG or WEBP. Max 5MB.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-foreground mb-1">Profile Picture</p>
                        <p className="text-xs text-muted-foreground mb-2">
                          {profile?.avatar_url ? 'Avatar uploaded' : 'No avatar yet'}
                        </p>
                        <button
                          onClick={handleStartEdit}
                          className="text-xs text-accent hover:text-accent/80 font-medium inline-flex items-center gap-1"
                        >
                          <Upload className="w-3 h-3" />
                          Click "Edit Profile" to upload
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Display Name */}
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-accent mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Display Name</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editDisplayName}
                        onChange={(e) => setEditDisplayName(e.target.value)}
                        placeholder="Enter your display name"
                        maxLength={50}
                        className="w-full px-3 py-2 bg-background/50 border border-border/50 rounded-lg text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                      />
                    ) : (
                      <p className="text-foreground font-medium">{profile?.display_name || 'Not set'}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="text-foreground font-medium">{userEmail}</p>
                  </div>
                </div>

                {/* Edit Actions */}
                {isEditing && (
                  <div className="flex gap-3 pt-4 border-t border-border/50">
                    <Button
                      onClick={handleSaveProfile}
                      disabled={isSaving || isUploadingAvatar}
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      disabled={isSaving || isUploadingAvatar}
                      className="border-border/50"
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                {/* Email Verification Status */}
                {!isEditing && (
                  <div className="flex items-start gap-3 pt-4 border-t border-border/50">
                    {emailVerified ? (
                      <>
                        <ShieldCheck className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email Status</p>
                          <div className="flex items-center gap-2">
                            <p className="text-green-500 font-medium">Verified</p>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Email Status</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                            <p className="text-yellow-500 font-medium">Not Verified</p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleResendVerification}
                              disabled={isResendingVerification || resendCooldown > 0}
                              className="border-accent/30 text-accent hover:bg-accent/10"
                            >
                              {isResendingVerification ? (
                                <>
                                  <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                  Sending...
                                </>
                              ) : resendCooldown > 0 ? (
                                `Resend in ${resendCooldown}s`
                              ) : (
                                'Verify Email'
                              )}
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            You must verify your email to submit reviews
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="bg-card/70 backdrop-blur-sm border-accent/20">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">My Reviews</CardTitle>
                <CardDescription className="text-muted-foreground">
                  View and manage your dispensary and rental reviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="bg-card/70 border border-accent/20 w-full flex flex-wrap h-auto justify-start p-2 gap-2">
                    <TabsTrigger value="all" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                      All ({counts.all})
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                      Pending ({counts.pending})
                    </TabsTrigger>
                    <TabsTrigger value="approved" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                      Approved ({counts.approved})
                    </TabsTrigger>
                    <TabsTrigger value="rejected" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                      Rejected ({counts.rejected})
                    </TabsTrigger>
                    <TabsTrigger value="favorites" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                      Saved ({counts.favorites})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab}>
                    {filteredReviews.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground mb-4">
                          {activeTab === 'all'
                            ? 'You haven\'t submitted any reviews yet.'
                            : `No ${activeTab} reviews found.`}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center w-full">
                          <Button
                            onClick={() => navigate('/dispensary')}
                            className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto"
                          >
                            Review a Dispensary
                          </Button>
                          <Button
                            onClick={() => navigate('/hotels')}
                            variant="outline"
                            className="border-accent/30 text-accent hover:bg-accent/10 w-full sm:w-auto"
                          >
                            Review a Rental
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredReviews.map((review) => {
                          const propertyName = review.dispensaries?.name || review.hotels?.name || 'Unknown Property';
                          const propertySlug = review.dispensaries?.slug || review.hotels?.slug;
                          const propertyType = review.dispensaries ? 'dispensary' : 'hotels';

                          return (
                            <Card key={review.id} className="bg-background/50 border-border/30">
                              <CardHeader className="pb-2">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <CardTitle className="text-base text-foreground">
                                        {propertyName}
                                      </CardTitle>
                                      {propertySlug && (
                                        <Link
                                          to={`/${propertyType}/${propertySlug}`}
                                          className="text-accent hover:text-accent/80"
                                        >
                                          <ExternalLink className="w-4 h-4" />
                                        </Link>
                                      )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      {review.dispensaries ? 'Dispensary' : 'Rental'} • {format(new Date(review.created_at), 'MMM d, yyyy')}
                                    </p>
                                  </div>
                                  {getStatusBadge(review.status)}
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <div className="flex gap-1">{renderStars(review.rating)}</div>

                                {review.title && (
                                  <h4 className="font-semibold text-foreground">{review.title}</h4>
                                )}

                                <p className="text-sm text-muted-foreground break-words">{review.content}</p>

                                {review.status === 'pending' && (
                                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mt-3">
                                    <p className="text-xs text-yellow-600 dark:text-yellow-400">
                                      <Clock className="inline w-3 h-3 mr-1" />
                                      Your review is awaiting admin approval before it will be published.
                                    </p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="favorites">
                    {favorites.length === 0 ? (
                      <div className="text-center py-12">
                        <Heart className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No Saved Items</h3>
                        <p className="text-muted-foreground mb-6">
                          You haven't added any dispensaries, rentals, or tours to your favorites yet.
                        </p>
                        <Button
                          onClick={() => navigate('/dispensary')}
                          className="bg-accent hover:bg-accent/90 text-accent-foreground"
                        >
                          Explore Dispensaries
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {favorites.map((fav: FavoriteItem) => {
                          const isDispensary = !!fav.dispensary_id;
                          const isHotel = !!fav.hotel_id;
                          const isTour = !!fav.tour_id;
                          
                          const item = isDispensary ? fav.dispensaries : isHotel ? fav.hotels : fav.tours;

                          if (!item) return null;

                          const itemType = isDispensary ? 'Dispensary' : isHotel ? 'Rental' : 'Tour';
                          const itemLink = isDispensary 
                            ? `/dispensary/${item.slug}` 
                            : isHotel 
                              ? `/hotels/${item.slug}` 
                              : `/tours/${item.slug}`;
                          
                          const itemImage = isDispensary 
                            ? ((item as any).image || '/dest-california.jpg')
                            : ((item as any).images?.[0] || '/dest-california.jpg');
                          
                          const locationText = isDispensary 
                            ? `${(item as any).city}, ${(item as any).state}`
                            : isHotel 
                              ? `${(item as any).cities?.name || 'Unknown'}, ${(item as any).cities?.states?.name || ''}`
                              : (item as any).address || 'No address';

                          return (
                            <Card key={fav.id} className="bg-background/50 border-border/30 overflow-hidden hover:border-accent/30 transition-colors group">
                              <div className="flex h-full">
                                <div className="w-32 sm:w-40 relative bg-muted">
                                  <img
                                    src={itemImage}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = "/dest-california.jpg";
                                    }}
                                  />
                                </div>
                                <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
                                  <div>
                                    <div className="flex justify-between items-start gap-2">
                                      <h4 className="font-semibold text-foreground line-clamp-1 group-hover:text-accent transition-colors">
                                        {item.name}
                                      </h4>
                                      {item.rating && (
                                        <div className="flex items-center gap-1 bg-background/80 px-1.5 py-0.5 rounded text-xs">
                                          <Star className="w-3 h-3 fill-gold text-gold" />
                                          <span className="font-medium">{item.rating}</span>
                                        </div>
                                      )}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {itemType} • {locationText}
                                    </p>
                                  </div>

                                  <div className="mt-3">
                                    <Link
                                      to={itemLink}
                                      className="inline-flex items-center text-xs font-medium text-accent hover:text-accent/80"
                                    >
                                      View Details <ExternalLink className="w-3 h-3 ml-1" />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Profile;