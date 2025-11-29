import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

/**
 * Global auth callback handler that processes authentication tokens
 * from URL hash (magic links, OAuth, etc.) on any page load.
 */
export const AuthCallbackHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Check if there's a hash with access_token (from magic link)
      const hash = window.location.hash;
      if (!hash || !hash.includes('access_token')) return;

      const hashParams = new URLSearchParams(hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      const type = hashParams.get('type');

      if (accessToken && refreshToken) {
        try {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            toast({
              title: 'Authentication Failed',
              description: error.message,
              variant: 'destructive',
            });
          } else {
            // Show success message based on type
            const isSignup = type === 'signup' || type === 'email';
            toast({
              title: isSignup ? 'Email Verified!' : 'Signed In!',
              description: isSignup 
                ? 'Your account has been successfully verified. Welcome to BudQuest!'
                : 'You have been signed in successfully.',
            });
          }
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Something went wrong during authentication.',
            variant: 'destructive',
          });
        }

        // Clean up the URL by removing the hash
        window.history.replaceState(null, '', location.pathname + location.search);
      }
    };

    handleAuthCallback();
  }, [location, toast, navigate]);

  return null; // This component doesn't render anything
};
