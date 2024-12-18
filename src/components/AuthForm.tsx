'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';

const authSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });
  
 export type AuthFormData = z.infer<typeof authSchema>;
  
  interface AuthFormProps {
    onSubmit: (data: AuthFormData) => Promise<void>;
    authType: 'login' | 'signup';
    showRegisterLink?: boolean;
  }

function AuthForm({ onSubmit, authType, showRegisterLink = true }: AuthFormProps) {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<AuthFormData>({
      resolver: zodResolver(authSchema),
    });
  
    return (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6"> 
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                    <input
                      type="email"
                      {...register('email')}
                      className={`input input-bordered w-full pl-10 ${
                        errors.email ? 'input-error' : ''
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.email.message}
                      </span>
                    </label>
                  )}
                </div>
  
                {/* Password Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                    <input
                      type="password"
                      {...register('password')}
                      className={`input input-bordered w-full pl-10 ${
                        errors.password ? 'input-error' : ''
                      }`}
                      placeholder="Enter your password"
                    />
                  </div>
                  {errors.password && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.password.message}
                      </span>
                    </label>
                  )}
                </div>
  
                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Processing...
                    </>
                  ) : (
                    authType === 'login' ? 'Sign In' : 'Sign Up'
                  )}
                </button>
  
                {/* Register Link */}             
                  <div className="text-center text-sm">
                    <span className="text-base-content/70">
                    {authType === 'login' ?'  Don&apos;t have an account' : 'Already have an account?'} 
                    </span>
                    
                    <Link
                      href={authType === 'login' ? '/signup' : '/login'}
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      {authType === 'login' ? 'Create one now' : 'Sign in'}
                    </Link>
                  </div>
               
              </form>
          
    );
  }

  export default AuthForm;