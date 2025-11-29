import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Helmet } from 'react-helmet';
import { Mail, Loader2, RefreshCw, CheckCircle } from 'lucide-react';
import logo from '@/assets/green-globe-logo.png';

const VerifyEmail = () => {
  const [otpCode, setOtpCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  
  const { verifyOTP, resendOTP, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email from navigation state
  const email = location.state?.email || '';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !verificationSuccess) {
      navigate('/');
    }
  }, [isAuthenticated, navigate, verificationSuccess]);

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

  // Auto-verify when 6 digits entered
  useEffect(() => {
    if (otpCode.length === 6) {
      handleVerify();
    }
  }, [otpCode]);

  const handleVerify = async () => {
    if (otpCode.length !== 6 || isVerifying) return;
    
    setIsVerifying(true);

    try {
      const result = await verifyOTP(email, otpCode);

      if (result.error) {
        toast({
          title: 'Verification Failed',
          description: result.error.message || 'Invalid or expired code. Please try again.',
          variant: 'destructive',
        });
        setOtpCode('');
      } else {
        setVerificationSuccess(true);
        toast({
          title: 'Email Verified!',
          description: 'Welcome to BudQuest! Your account is now active.',
        });
        
        // Redirect to home after a brief delay to show success state
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      setOtpCode('');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0 || !email || isResending) return;
    
    setIsResending(true);

    try {
      const { error } = await resendOTP(email);

      if (error) {
        toast({
          title: 'Failed to Resend',
          description: error.message || 'Could not resend verification code.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Code Sent!',
          description: 'A new verification code has been sent to your email.',
        });
        setResendCooldown(60);
        setOtpCode('');
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

  if (verificationSuccess) {
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
                <div className="flex justify-center mb-6">
                  <div className="relative w-20 h-20">
                    <CheckCircle className="w-full h-full text-accent" />
                    <div className="absolute inset-0 rounded-full bg-accent/30 blur-lg opacity-60 -z-10" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">You're All Set!</h2>
                <p className="text-muted-foreground">Redirecting you to BudQuest...</p>
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
        <meta name="description" content="Enter your verification code to complete your BudQuest registration." />
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
                Enter Verification Code
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                <Mail className="inline-block w-4 h-4 mr-1 mb-0.5" />
                We sent a 6-digit code to
                <span className="block font-semibold text-foreground mt-1">{email}</span>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* OTP Input */}
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otpCode}
                  onChange={(value) => setOtpCode(value)}
                  disabled={isVerifying}
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot 
                      index={0} 
                      className="w-12 h-14 text-xl font-bold border-accent/30 bg-secondary/50 focus:border-accent focus:ring-accent"
                    />
                    <InputOTPSlot 
                      index={1} 
                      className="w-12 h-14 text-xl font-bold border-accent/30 bg-secondary/50 focus:border-accent focus:ring-accent"
                    />
                    <InputOTPSlot 
                      index={2} 
                      className="w-12 h-14 text-xl font-bold border-accent/30 bg-secondary/50 focus:border-accent focus:ring-accent"
                    />
                    <InputOTPSlot 
                      index={3} 
                      className="w-12 h-14 text-xl font-bold border-accent/30 bg-secondary/50 focus:border-accent focus:ring-accent"
                    />
                    <InputOTPSlot 
                      index={4} 
                      className="w-12 h-14 text-xl font-bold border-accent/30 bg-secondary/50 focus:border-accent focus:ring-accent"
                    />
                    <InputOTPSlot 
                      index={5} 
                      className="w-12 h-14 text-xl font-bold border-accent/30 bg-secondary/50 focus:border-accent focus:ring-accent"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* Verify Button */}
              <Button
                onClick={handleVerify}
                disabled={otpCode.length !== 6 || isVerifying}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </Button>

              {/* Resend Section */}
              <div className="text-center border-t border-border/50 pt-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Didn't receive the code? Check your spam folder or
                </p>
                <Button
                  variant="outline"
                  onClick={handleResendCode}
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
                      Resend Code
                    </>
                  )}
                </Button>
              </div>

              {/* Back to Sign In */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate('/auth')}
                  className="text-sm text-accent hover:underline"
                >
                  ← Back to Sign In
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
