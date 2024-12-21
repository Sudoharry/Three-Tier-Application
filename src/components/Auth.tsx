import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { AppleButton } from './ui/AppleButton';
import { AppleInput } from './ui/AppleInput';
import { AppleCard } from './ui/AppleCard';

export function Auth() {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-primary">Task Flow</h1>
            <p className="mt-2 text-secondary">Streamline your productivity, one task at a time</p>
          </div>
          
          <AppleCard className="bg-surface-secondary">
            <h2 className="text-2xl font-semibold text-primary mb-6">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h2>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <AppleInput
                label="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <AppleInput
                label="Password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="space-y-4">
                <AppleButton type="submit" disabled={loading} className="w-full">
                  {isSignUp ? 'Create account' : 'Sign in'}
                </AppleButton>
                
                <AppleButton
                  type="button"
                  variant="ghost"
                  onClick={() => setIsSignUp(!isSignUp)}
                  disabled={loading}
                  className="w-full"
                >
                  {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
                </AppleButton>
              </div>
            </form>
          </AppleCard>
        </div>
      </div>
    </div>
  );
}