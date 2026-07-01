"use client";

import { useState } from 'react';
import { api } from '../../../lib/api';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Card } from '../../../components/Card';
import { LogIn, UserPlus } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const response = await api.post(endpoint, { email, password });
      
      const { token, user } = response.data;
      await signIn(token, user);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Phasebook</h1>
          <p className="text-secondary font-bold uppercase text-sm tracking-widest">Journal System v1.0</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border-2 border-red-900 text-red-900 px-4 py-3 text-sm font-bold uppercase">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest block">Email</label>
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="USER@SYSTEM.COM" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest block">Password</label>
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required 
              />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full flex gap-2" disabled={isLoading}>
                {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                {isLogin ? 'Authenticate' : 'Initialize Account'}
              </Button>
            </div>
          </form>
          
          <div className="mt-8 text-center border-t-2 border-black pt-6">
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold uppercase tracking-widest hover:underline focus:outline-none"
            >
              {isLogin ? 'Need an account? Register' : 'Have an account? Log in'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
