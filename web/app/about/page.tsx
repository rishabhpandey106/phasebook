import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-mono selection:bg-black selection:text-white p-8 md:p-16">
      <div className="max-w-3xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center gap-2 font-bold uppercase tracking-widest hover:underline transition-none text-sm">
          <ArrowLeft size={16} /> Back to System
        </Link>
        
        <header className="border-b-4 border-black pb-8">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">About</h1>
          <p className="text-xl font-bold text-[#555555] uppercase tracking-[0.08em] mt-4">The philosophy behind Phasebook.</p>
        </header>
        
        <div className="prose prose-neutral max-w-none prose-p:font-bold prose-p:text-[#555555] prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-a:text-black prose-a:font-bold">
          <h2>Uncompromising Design</h2>
          <p>
            Phasebook was built as a reaction against modern software bloat. We removed gradients, shadows, border radii, and distractions. We are left with pure signal.
          </p>
          
          <h2>Data Sovereignty</h2>
          <p>
            Your thoughts belong to you. By utilizing edge-based encrypted sync, Phasebook ensures that only you have the keys to your personal journals.
          </p>
          
          <h2>The Phasebook Engine</h2>
          <p>
            We open-sourced our core rendering engine so developers can build beautiful, brutalist interactive 3D books in their own applications. Check out the SDK documentation for more details.
          </p>
        </div>
      </div>
    </div>
  );
}
