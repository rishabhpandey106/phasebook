"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '../../components/ThemeToggle';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { signOut, user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !user) {
    return <div className="min-h-screen bg-primary" />;
  }

  const tabs = [
    { name: 'JOURNAL', path: '/journal' },
    { name: 'HISTORY', path: '/history' },
    { name: 'INTERACTIVE', path: '/interactive' },
    { name: 'API KEYS', path: '/api-keys' },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="border-b-4 border-black px-4 sm:px-8 py-6 flex justify-between items-center gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter">Phasebook</h1>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest mt-1 truncate max-w-[150px] sm:max-w-none text-secondary">
            {user.email}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <ThemeToggle />
          <button
            onClick={signOut}
            className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm hover:underline px-2 py-1 focus:outline-2 focus:outline-black focus:outline-offset-4"
          >
            <LogOut size={20} strokeWidth={3} />
            <span className="hidden sm:inline">Terminate Session</span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b-4 border-black px-4 sm:px-8 flex gap-2 pt-6 bg-white overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={cn(
                "px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-base font-bold uppercase tracking-[0.1em] border-2 border-black border-b-0 transition-none flex-shrink-0",
                isActive 
                  ? "bg-black text-white" 
                  : "bg-white text-black hover:bg-gray-100"
              )}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>

      {/* Content */}
      <main className="p-4 sm:p-8 max-w-5xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
