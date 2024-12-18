'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner'; 
import AuthForm, { AuthFormData } from '@/components/AuthForm';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (data: AuthFormData) => {
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid credentials');
        return;
      }

      toast.success('Login successful');
      router.push('/onboarding');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Welcome Back!</h1>
              <p className="text-base-content/60 mt-2">
                Sign in to access your account
              </p>
            </div>
            <AuthForm 
              onSubmit={handleLogin} 
              authType="login"
              showRegisterLink={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
