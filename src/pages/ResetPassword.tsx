import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet';
import { z } from 'zod';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';
import logo from '@/assets/green-globe-logo.png';

const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user has a valid recovery session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      // User should have a session from clicking the reset link
      setIsValidSession(!!session);
    };
    
    checkSession();

    // Listen for auth state changes (when user clicks reset link)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsValidSession(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });
      
      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setResetSuccess(true);
        toast({
          title: 'Password Updated!',
          description: 'Your password has been successfully reset.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state while checking session
  if (isValidSession === null) {
    return (
      <>
        <Helmet>
          <title>Reset Password | BudQuest</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="pt-24 pb-20 px-4 sm:px-6 flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  // Invalid or expired link
  if (!isValidSession) {
    return (
      <>
        <Helmet>
          <title>Invalid Link | BudQuest</title>
        </Helmet>

        <div className="min-h-screen bg-background">
          <Navigation />
          
          <main className="pt-24 pb-20 px-4 sm:px-6 flex items-center justify-center">
            <Card className="w-full max-w-md bg-card/70 backdrop-blur-sm border-accent/30 shadow-xl">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                    <AlertCircle className="w-10 h-10 text-destructive" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Invalid or Expired Link</h2>
                <p className="text-muted-foreground mb-6">
                  This password reset link is invalid or has expired. Please request a new one.
                </p>
                <Button
                  onClick={() => navigate('/forgot-password')}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
                >
                  Request New Link
                </Button>
              </CardContent>
            </Card>
          </main>
          
          <Footer />
        </div>
      </>
    );
  }

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
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-accent" />
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
                Create New Password
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your new password below
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  {isLoading ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ResetPassword;
