import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { AuthError, User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: any;
  loading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
        loading: false,
      }));
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
      }));
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast.success('Signed in successfully');
    } catch (error) {
      const authError = error as AuthError;
      if (authError.message.includes('Invalid login credentials')) {
        toast.error('Invalid email or password');
      } else {
        toast.error(authError.message);
      }
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            email,
          },
        },
      });

      if (error) throw error;
      toast.success('Please check your email to confirm your account');
    } catch (error) {
      const authError = error as AuthError;
      toast.error(authError.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Signed out successfully');
    } catch (error) {
      const authError = error as AuthError;
      toast.error('Error signing out: ' + authError.message);
      throw error;
    }
  };

  return {
    user: authState.user,
    session: authState.session,
    loading: authState.loading,
    signIn,
    signUp,
    signOut,
  };
}