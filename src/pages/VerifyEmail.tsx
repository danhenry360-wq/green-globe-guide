import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet';
import { Mail, Loader2, RefreshCw } from 'lucide-react';
import logo from '@/assets/global-canna-pass-logo.png';

const VerifyEmail = () => {
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email from navigation state
  const email = location.state?.email || '';

  // If no email in state, redirect to auth
  useEffect(() => {
    if (!email) {
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
          // Use root URL since that's what Lovable Cloud allows
          emailRedirectTo: `${window.location.origin}/`,
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
