import axios from 'axios';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

export interface AuthData {
  email: string;
  password: string;
}

export class AuthService {
  static async registerUser(authData: AuthData) {
    try {
      await axios.post('/api/register', authData);
      toast.success('Account created successfully! Please sign in.');
      return { success: true };
    } catch (error) {
      const message = "User Already Exist";
      toast.error(message);
      return { success: false, error: message };
    }
  }

  static async signInUser(authData: AuthData) {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: authData.email,
        password: authData.password
      });

      if (result?.error) {
        throw new Error("Invalid Email or Password");
      }

      toast.success('Signed in successfully!');
      return { success: true };
    } catch (error) {
      const message = "Invalid Email or Password";
      toast.error(message);
      return { success: false, error: message };
    }
  }

  static async signInWithGoogle() {
    try {
      await signIn('google', {
        callbackUrl: '/'
      });
      return { success: true };
    } catch (error) {
      toast.error('Google sign-in failed');
      return { success: false, error: 'Google sign-in failed' };
    }
  }
}
