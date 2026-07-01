"use client";

import { useState } from 'react';
import { api } from '@/lib/api';
import { Key, Copy, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/Button';

export default function ApiKeysPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [rawKey, setRawKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateKey = async () => {
    // Confirm if they already generated one this session
    if (rawKey && !window.confirm("Generating a new key will instantly invalidate your current key. Are you sure you want to proceed?")) {
      return;
    }

    setIsGenerating(true);
    setError(null);
    setCopied(false);

    try {
      const res = await api.post('/auth/keys');
      if (res.data && res.data.rawKey) {
        setRawKey(res.data.rawKey);
      } else {
        throw new Error("Failed to generate key");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred while generating the key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (rawKey) {
      navigator.clipboard.writeText(rawKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-2 sm:px-0 animate-in fade-in duration-0">
      <div className="mb-8 border-b-4 border-black pb-6">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
          <Key className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={3} />
          SDK API Keys
        </h1>
        <p className="font-bold uppercase tracking-widest text-secondary mt-2 text-sm sm:text-base">
          Manage your Phasebook SDK access
        </p>
      </div>

      <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-xl font-black uppercase tracking-tight mb-4">Secret Key Generation</h2>
        <p className="text-sm sm:text-base mb-6 font-medium text-neutral-600">
          Your API key grants full access to your public journal entries via the Phasebook SDK. 
          Keep it secure and never share it publicly.
        </p>

        <div className="bg-[#fff3cd] border-l-4 border-black p-4 mb-8 flex gap-3 items-start">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
          <div className="text-sm font-bold uppercase tracking-wider leading-relaxed">
            For security reasons, your API key will only be shown once. 
            <br className="hidden sm:block" />
            Generating a new key will instantly revoke your previous key.
          </div>
        </div>

        {rawKey ? (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
            <label className="block text-xs font-bold uppercase tracking-widest text-secondary">
              Your New Secret Key
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <code className="flex-1 bg-black text-white p-4 font-mono text-sm sm:text-base break-all rounded-none border-2 border-transparent">
                {rawKey}
              </code>
              <Button 
                onClick={copyToClipboard}
                className={`flex items-center justify-center gap-2 px-6 ${copied ? 'bg-green-500 hover:bg-green-600 text-white border-green-500' : ''}`}
              >
                {copied ? <CheckCircle2 size={18} strokeWidth={3} /> : <Copy size={18} strokeWidth={3} />}
                {copied ? 'COPIED!' : 'COPY'}
              </Button>
            </div>
            <p className="text-xs font-bold text-red-500 uppercase tracking-widest mt-2">
              Please copy this key now. You won't be able to see it again!
            </p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-neutral-100 border-2 border-black border-dashed">
            <div className="text-sm font-bold uppercase tracking-wider text-secondary">
              No key generated this session
            </div>
            <Button 
              onClick={generateKey} 
              disabled={isGenerating}
              className="flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <RefreshCw size={18} strokeWidth={3} className={isGenerating ? 'animate-spin' : ''} />
              {isGenerating ? 'GENERATING...' : 'GENERATE KEY'}
            </Button>
          </div>
        )}

        {error && (
          <div className="mt-4 text-sm font-bold text-red-500 uppercase tracking-widest border-2 border-red-500 p-3 bg-red-50">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}
