import { useState } from 'react';
import { AuthService, AuthData } from '@/app/services/authService';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (authData: AuthData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await AuthService.registerUser(authData);
      if (!result.success) {
        setError(result.error || 'Registration failed');
      }
      return result;
    } catch (err) {
      setError('Registration failed');
      return { success: false, error: 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (authData: AuthData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await AuthService.signInUser(authData);
      if (!result.success) {
        setError(result.error || 'Sign in failed');
      }
      return result;
    } catch (err) {
      setError('Sign in failed');
      return { success: false, error: 'Sign in failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await AuthService.signInWithGoogle();
      if (!result.success) {
        setError(result.error || 'Google sign-in failed');
      }
      return result;
    } catch (err) {
      setError('Google sign-in failed');
      return { success: false, error: 'Google sign-in failed' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    signIn,
    signInWithGoogle,
    isLoading,
    error,
    clearError: () => setError(null)
  };
};
