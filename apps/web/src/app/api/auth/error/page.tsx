'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration. Please try again later.'
      case 'AccessDenied':
        return 'Access denied. You do not have permission to sign in.'
      case 'Verification':
        return 'The verification link has expired or has already been used.'
      case 'OAuthSignin':
        return 'Error occurred while signing in with OAuth provider.'
      case 'OAuthCallback':
        return 'Error occurred while processing OAuth callback.'
      case 'EmailSignin':
        return 'The email sign-in link is invalid or has expired.'
      case 'CredentialsSignin':
        return 'Invalid credentials. Please check your email and password.'
      default:
        return 'An unexpected error occurred. Please try again.'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="max-w-md w-full mx-4">
        <div className="bg-base-100 shadow-lg rounded-lg p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-error" />
            </div>
            
            <h1 className="text-2xl font-bold text-base-content">
              Authentication Error
            </h1>
            
            <p className="text-center text-base-content/70">
              {getErrorMessage(error)}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
              <Link 
                href="/signup"
                className="btn btn-primary flex-1"
              >
                Try Again
              </Link>
              
              <Link 
                href="/"
                className="btn btn-outline flex-1"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 