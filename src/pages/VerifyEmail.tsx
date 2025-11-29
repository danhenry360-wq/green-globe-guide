import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet';
import { Mail, Loader2, RefreshCw, CheckCircle } from 'lucide-react';
import logo from '@/assets/global-canna-pass-logo.png';

const VerifyEmail = () => {
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Get email from navigation state
  const email = location.state?.email || '';
  
  // Check for verification tokens in URL (from magic link)
  useEffect(() => {
    const handleVerification = async () => {
      // Check if there's a hash with access_token (magic link clicked)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      if (accessToken && refreshToken) {
        setIsVerifying(true);
        try {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          
          if (error) {
            toast({
              title: 'Verification Failed',
              description: error.message,
              variant: 'destructive',
            });
          } else {
            setVerified(true);
            toast({
              title: 'Email Verified!',
              description: 'Your account has been successfully verified. Welcome to BudQuest!',
            });
            setTimeout(() => navigate('/'), 2000);
          }
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Something went wrong during verification.',
            variant: 'destructive',
          });
        } finally {
          setIsVerifying(false);
        }
      }
      
      // Check for error in URL
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');
      if (error) {
        toast({
          title: 'Verification Error',
          description: errorDescription || 'Unable to verify email. Please try again.',
          variant: 'destructive',
        });
      }
    };
    
    handleVerification();
  }, [navigate, toast, searchParams]);

  // If no email in state and no token, redirect to auth
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const hasToken = hashParams.get('access_token');
    
    if (!email && !hasToken) {
      navigate('/auth');
    }
  }, [email, navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResendEmail = async () => {
    if (resendCooldown > 0 || !email) return;
    
    setIsResending(true);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email`,
        },
      });

      if (error) {
        toast({
          title: 'Failed to Resend',
          description: error.message || 'Could not resend verification email.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Email Sent!',
          description: 'A new verification email has been sent. Check your inbox.',
        });
        setResendCooldown(60);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsResending(false);
    }
  };

  if (verified) {
    return (
      <>
        <Helmet>
          <title>Email Verified | BudQuest</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="pt-24 pb-20 px-4 sm:px-6 flex items-center justify-center">
            <Card className="w-full max-w-md bg-card/70 backdrop-blur-sm border-accent/30 shadow-xl">
              <CardContent className="pt-8 pb-8 text-center">
                <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-accent mb-2">Email Verified!</h2>
                <p className="text-muted-foreground">Redirecting you to the homepage...</p>
              </CardContent>
            </Card>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  if (isVerifying) {
    return (
      <>
        <Helmet>
          <title>Verifying Email | BudQuest</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="pt-24 pb-20 px-4 sm:px-6 flex items-center justify-center">
            <Card className="w-full max-w-md bg-card/70 backdrop-blur-sm border-accent/30 shadow-xl">
              <CardContent className="pt-8 pb-8 text-center">
                <Loader2 className="w-12 h-12 text-accent mx-auto mb-4 animate-spin" />
                <h2 className="text-xl font-bold text-foreground mb-2">Verifying your email...</h2>
                <p className="text-muted-foreground">Please wait a moment.</p>
              </CardContent>
            </Card>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Verify Email | BudQuest</title>
        <meta name="description" content="Verify your email address to complete your BudQuest registration." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-24 pb-20 px-4 sm:px-6 flex items-center justify-center">
          <Card className="w-full max-w-md bg-card/70 backdrop-blur-sm border-accent/30 shadow-xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative w-20 h-20">
                  <img 
                    src={logo} 
                    alt="BudQuest Logo" 
                    className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(34,197,94,0.7)]"
                  />
                  <div className="absolute inset-0 rounded-lg bg-accent/30 blur-lg opacity-60 -z-10" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                <Mail className="inline-block w-4 h-4 mr-1 mb-0.5" />
                We've sent a verification link to
                <span className="block font-semibold text-foreground mt-1">{email}</span>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-secondary/50 rounded-lg p-4 border border-accent/20">
                <h3 className="font-semibold text-foreground mb-2">Next Steps:</h3>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Open your email inbox</li>
                  <li>Find the email from BudQuest</li>
                  <li>Click the "Verify Email" button in the email</li>
                  <li>You'll be redirected back and logged in automatically</li>
                </ol>
              </div>

              <div className="text-center border-t border-border/50 pt-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Didn't receive the email? Check your spam folder or
                </p>
                <Button
                  variant="outline"
                  onClick={handleResendEmail}
                  disabled={isResending || resendCooldown > 0 || !email}
                  className="border-accent/30 hover:border-accent/60"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : resendCooldown > 0 ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend in {resendCooldown}s
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend Email
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate('/auth')}
                  className="text-sm text-accent hover:underline"
                >
                  Back to Sign In
                </button>
              </div>
            </CardContent>
          </Card>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default VerifyEmail;
