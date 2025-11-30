import { useState } from 'react';
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
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import logo from '@/assets/global-canna-pass-logo.png';

const emailSchema = z.string().email('Please enter a valid email address');

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      setError(emailResult.error.errors[0].message);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setEmailSent(true);
        toast({
          title: 'Email Sent!',
          description: 'Check your inbox for the password reset link.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <>
        <Helmet>
          <title>Check Your Email | BudQuest</title>
        </Helmet>

        <div className="min-h-screen bg-background">
          <Navigation />
          
          <main className="pt-24 pb-20 px-4 sm:px-6 flex items-center justify-center">
            <Card className="w-full max-w-md bg-card/70 backdrop-blur-sm border-accent/30 shadow-xl">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-accent" />
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h2>
                <p className="text-muted-foreground mb-6">
                  We've sent a password reset link to <span className="text-foreground font-medium">{email}</span>
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Click the link in the email to reset your password. If you don't see it, check your spam folder.
                </p>
                <Button
                  onClick={() => navigate('/auth')}
                  variant="outline"
                  className="w-full border-border hover:bg-accent/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sign In
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
        <title>Forgot Password | BudQuest</title>
        <meta name="description" content="Reset your BudQuest password." />
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
                Forgot Password?
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your email and we'll send you a reset link
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-input border-border focus:border-accent"
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
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

export default ForgotPassword;
