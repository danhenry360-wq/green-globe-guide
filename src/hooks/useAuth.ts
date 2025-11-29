import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  // Modified signup - creates user and sends OTP via custom edge function
  const signUp = async (email: string, password: string, displayName: string) => {
    // First, send OTP via our custom edge function
    const { data: otpData, error: otpError } = await supabase.functions.invoke('send-otp-email', {
      body: { email, displayName },
    });

    if (otpError) {
      console.error('Error sending OTP:', otpError);
      return { error: { message: otpError.message || 'Failed to send verification code' } };
    }

    // Store signup data in sessionStorage for after OTP verification
    sessionStorage.setItem('pendingSignup', JSON.stringify({
      email,
      password,
      displayName,
    }));

    return { error: null };
  };

  // Check if signup session exists
  const hasSignupSession = () => {
    return !!sessionStorage.getItem('pendingSignup');
  };

  // Verify OTP and complete signup
  const verifyOTP = async (email: string, code: string) => {
    // First check if we have the signup session data
    const pendingData = sessionStorage.getItem('pendingSignup');
    if (!pendingData) {
      return { error: { message: 'Your signup session has expired. Please go back and sign up again.' }, sessionExpired: true };
    }

    // Verify the OTP code via edge function
    const { data, error: verifyError } = await supabase.functions.invoke('verify-otp', {
      body: { email, code },
    });

    if (verifyError) {
      console.error('OTP verification error:', verifyError);
      return { error: { message: verifyError.message || 'Verification failed' } };
    }

    if (!data?.valid) {
      return { error: { message: data?.error || 'Invalid or expired verification code' } };
    }

    // OTP verified - now complete the actual Supabase signup
    const { password, displayName } = JSON.parse(pendingData);

    // Create the user account with auto-confirm (since we verified email via OTP)
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
          email_verified: true,
        },
      },
    });

    if (signUpError) {
      console.error('Signup error:', signUpError);
      return { error: signUpError };
    }

    // Clear pending signup data
    sessionStorage.removeItem('pendingSignup');

    // Sign in the user immediately
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error('Auto sign-in error:', signInError);
      // User created but couldn't auto-login - this is still a success
      return { error: null, needsManualLogin: true };
    }

    return { error: null };
  };

  // Resend OTP code
  const resendOTP = async (email: string) => {
    const pendingData = sessionStorage.getItem('pendingSignup');
    let displayName = '';
    
    if (pendingData) {
      const parsed = JSON.parse(pendingData);
      displayName = parsed.displayName || '';
    }

    const { error } = await supabase.functions.invoke('send-otp-email', {
      body: { email, displayName },
    });

    if (error) {
      return { error: { message: error.message || 'Failed to resend verification code' } };
    }

    return { error: null };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    verifyOTP,
    resendOTP,
    hasSignupSession,
    isAuthenticated: !!session,
  };
};
