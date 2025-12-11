import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet';
import { z } from 'zod';
import { Lock, CheckCircle, AlertCircle, Loader2, RefreshCw, ArrowLeft } from 'lucide-react';
import logo from '@/assets/global-canna-pass-logo.png';

const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const ResetPassword = () => {
  const [otpCode, setOtpCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [step, setStep] = useState<'code' | 'password'>('code');
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email from navigation state or sessionStorage
  const email = location.state?.email || sessionStorage.getItem('passwordResetEmail') || '';

  // Redirect if no email
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Auto-advance when 6 digits entered
  useEffect(() => {
    if (otpCode.length === 6 && step === 'code') {
      setStep('password');
    }
  }, [otpCode, step]);

  const validateForm = (): boolean => {
    const newErrors: { password?: string; confirmPassword?: string } = {};
    
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0 || !email || isResending) return;
    
    setIsResending(true);

    try {
      const { error } = await supabase.functions.invoke('send-password-reset-otp', {
        body: { email },
      });

      if (error) {
        toast({
          title: 'Failed to Resend',
          description: error.message || 'Could not resend reset code.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Code Sent!',
          description: 'A new reset code has been sent to your email.',
        });
        setResendCooldown(60);
        setOtpCode('');
        setStep('code');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (otpCode.length !== 6) {
      toast({
        title: 'Invalid Code',
        description: 'Please enter the 6-digit code from your email.',
        variant: 'destructive',
      });
      setStep('code');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('verify-password-reset-otp', {
        body: { email, code: otpCode, newPassword: password },
      });
      
      if (error) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to reset password',
          variant: 'destructive',
        });
        return;
      }

      if (!data?.valid) {
        toast({
          title: 'Invalid Code',
          description: data?.error || 'The code is invalid or expired. Please request a new one.',
          variant: 'destructive',
        });
        setOtpCode('');
        setStep('code');
        return;
      }

      // Success!
      sessionStorage.removeItem('passwordResetEmail');
      setResetSuccess(true);
      toast({
        title: 'Password Updated!',
        description: 'Your password has been successfully reset.',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Success state
  if (resetSuccess) {
    return (
      <>
        <Helmet>
          <title>Password Reset Successful | BudQuest</title>
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
                <h2 className="text-2xl font-bold text-foreground mb-2">Password Reset!</h2>
                <p className="text-muted-foreground mb-6">
                  Your password has been successfully updated. You can now sign in with your new password.
                </p>
                <Button
                  onClick={() => navigate('/auth')}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
                >
                  Sign In
                </Button>
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
        <title>Reset Password | BudQuest</title>
        <meta name="description" content="Create a new password for your BudQuest account." />
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
                {step === 'code' ? 'Enter Reset Code' : 'Create New Password'}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {step === 'code' 
                  ? `Enter the 6-digit code sent to ${email}`
                  : 'Enter your new password below'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: OTP Code */}
                <div className={step === 'code' ? 'block' : 'hidden'}>
                  <div className="flex justify-center mb-4">
                    <InputOTP
                      maxLength={6}
                      value={otpCode}
                      onChange={(value) => setOtpCode(value)}
                    >
                      <InputOTPGroup className="gap-2">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <InputOTPSlot 
                            key={index}
                            index={index} 
                            className="w-12 h-14 text-xl font-bold border-accent/30 bg-secondary/50 focus:border-accent focus:ring-accent"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <Button
                    type="button"
                    onClick={() => otpCode.length === 6 && setStep('password')}
                    disabled={otpCode.length !== 6}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3"
                  >
                    Continue
                  </Button>

                  {/* Resend Section */}
                  <div className="text-center border-t border-border/50 pt-4 mt-4">
                    <p className="text-sm text-muted-foreground mb-3">
                      Didn't receive the code?
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleResendCode}
                      disabled={isResending || resendCooldown > 0}
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
                </div>

                {/* Step 2: New Password */}
                <div className={step === 'password' ? 'block space-y-4' : 'hidden'}>
                  {/* Code indicator */}
                  <div className="flex items-center justify-center gap-2 p-3 bg-accent/10 rounded-lg border border-accent/30 mb-4">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span className="text-sm text-foreground">Code verified: <span className="font-mono font-bold text-accent">{otpCode}</span></span>
                    <button 
                      type="button"
                      onClick={() => setStep('code')}
                      className="text-xs text-muted-foreground hover:text-accent underline ml-2"
                    >
                      Change
                    </button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-input border-border focus:border-accent"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 bg-input border-border focus:border-accent"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Password'
                    )}
                  </Button>
                </div>
              </form>

              {/* Back to Sign In */}
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() => navigate('/auth')}
                  className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
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

export default ResetPassword;
