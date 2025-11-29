import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

/**
 * Global auth callback handler that waits for Supabase to process auth tokens
 * from URL hash, then shows feedback and cleans up the URL.
 */
export const AuthCallbackHandler = () => {
  const location = useLocation();
  const { toast } = useToast();
  const hasAuthHash = useRef(false);
  const hashType = useRef<string | null>(null);

  useEffect(() => {
    // Check if URL has auth tokens on mount
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      hasAuthHash.current = true;
      const hashParams = new URLSearchParams(hash.substring(1));
      hashType.current = hashParams.get('type');
    }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // If we detected an auth hash and user is now signed in, show success toast
      if (hasAuthHash.current && session && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
        const isSignup = hashType.current === 'signup' || hashType.current === 'email';
        
        toast({
          title: isSignup ? 'Email Verified!' : 'Signed In!',
          description: isSignup
            ? 'Your account has been successfully verified. Welcome to BudQuest!'
            : 'You have been signed in successfully.',
        });

        // Clean up the URL
        window.history.replaceState(null, '', location.pathname + location.search);
        
        // Reset flag so we don't show toast again
        hasAuthHash.current = false;
        hashType.current = null;
      }
    });

    return () => subscription.unsubscribe();
  }, [location, toast]);

  return null;
};
