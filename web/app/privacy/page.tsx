import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white font-mono selection:bg-black selection:text-white p-8 md:p-16">
      <div className="max-w-3xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center gap-2 font-bold uppercase tracking-widest hover:underline transition-none text-sm">
          <ArrowLeft size={16} /> Back to System
        </Link>
        
        <header className="border-b-4 border-black pb-8">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Privacy Policy</h1>
          <p className="text-xl font-bold text-[#555555] uppercase tracking-[0.08em] mt-4">Last updated: Today</p>
        </header>
        
        <div className="prose prose-neutral max-w-none prose-p:font-bold prose-p:text-[#555555] prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-a:text-black prose-a:font-bold">
          <h2>1. Data Collection</h2>
          <p>
            We collect the absolute minimum data required to keep the system operational. Your journal entries are end-to-end encrypted before they leave your device.
          </p>
          
          <h2>2. Analytics</h2>
          <p>
            We do not use third-party tracking scripts. We log generic access telemetry to prevent abuse, which is purged on a rolling 7-day basis.
          </p>
          
          <h2>3. Third Parties</h2>
          <p>
            We do not sell your data. We do not share your data. The only third-party infrastructure we rely on is Cloudflare for edge routing.
          </p>
        </div>
      </div>
    </div>
  );
}
