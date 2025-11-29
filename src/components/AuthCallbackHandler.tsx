import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

/**
 * Global auth callback handler that shows feedback when authentication tokens
 * are detected in the URL. Supabase automatically handles the session creation.
 */
export const AuthCallbackHandler = () => {
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if there's a hash with access_token (from magic link)
    // Supabase handles the actual session - we just show feedback
    const hash = window.location.hash;
    if (!hash || !hash.includes('access_token')) return;

    const hashParams = new URLSearchParams(hash.substring(1));
    const type = hashParams.get('type');

    // Show success toast - Supabase handles the session automatically
    const isSignup = type === 'signup' || type === 'email';
    toast({
      title: isSignup ? 'Email Verified!' : 'Signed In!',
      description: isSignup
        ? 'Your account has been successfully verified. Welcome to BudQuest!'
        : 'You have been signed in successfully.',
    });

    // Clean up the URL after a short delay (let Supabase process first)
    setTimeout(() => {
      window.history.replaceState(null, '', location.pathname + location.search);
    }, 100);
  }, [location, toast]);

  return null;
};
