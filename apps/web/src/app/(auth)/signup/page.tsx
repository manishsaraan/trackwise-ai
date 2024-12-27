'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import AuthForm, { AuthFormData } from '@/components/auth-form/ index';
import { createUser } from '@/lib/actions/auth';

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = async (data: AuthFormData) => {
    try {
      // First create the user
      const result = await createUser({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      // If user creation is successful, sign them in
      const signInResult = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (signInResult?.error) {
        toast.error('Failed to sign in after registration');
        return;
      }

      toast.success('Account created successfully');
      signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      router.push('/onboarding');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An error occurred during signup');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Create an Account</h1>
              <p className="text-base-content/60 mt-2">
                Sign up to get started
              </p>
            </div>
            <AuthForm 
              onSubmit={handleSignup} 
              authType="signup" 
              showRegisterLink={false} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
