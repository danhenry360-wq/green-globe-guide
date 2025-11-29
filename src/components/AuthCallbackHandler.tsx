import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

/**
 * Minimal auth callback handler - primarily for fallback magic link support.
 * Main auth flow now uses OTP verification.
 */
export const AuthCallbackHandler = () => {
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if URL has auth tokens (fallback for magic links)
    const hash = window.location.hash;
    if (!hash || !hash.includes('access_token')) return;

    const hashParams = new URLSearchParams(hash.substring(1));
    const type = hashParams.get('type');
    const isSignup = type === 'signup' || type === 'email';

    // Show success toast
    toast({
      title: isSignup ? 'Email Verified!' : 'Signed In!',
      description: isSignup
        ? 'Your account has been successfully verified. Welcome to BudQuest!'
        : 'You have been signed in successfully.',
    });

    // Clean up the URL
    window.history.replaceState(null, '', location.pathname + location.search);
  }, [location, toast]);

  return null;
};
