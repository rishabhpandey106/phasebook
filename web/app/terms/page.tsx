import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white font-mono selection:bg-black selection:text-white p-8 md:p-16">
      <div className="max-w-3xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center gap-2 font-bold uppercase tracking-widest hover:underline transition-none text-sm">
          <ArrowLeft size={16} /> Back to System
        </Link>
        
        <header className="border-b-4 border-black pb-8">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Terms of Service</h1>
          <p className="text-xl font-bold text-[#555555] uppercase tracking-[0.08em] mt-4">The rules of the system.</p>
        </header>
        
        <div className="prose prose-neutral max-w-none prose-p:font-bold prose-p:text-[#555555] prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-a:text-black prose-a:font-bold">
          <h2>1. Usage Limits</h2>
          <p>
            You agree not to abuse the API or use it for mass distribution of unencrypted payloads. We reserve the right to terminate access if abuse is detected.
          </p>
          
          <h2>2. Liability</h2>
          <p>
            Phasebook is provided "as is" without warranty of any kind. We are not liable for lost data, though we take extreme measures to prevent such events.
          </p>
          
          <h2>3. Modifications</h2>
          <p>
            We may update these terms at any time. Continued use of the service constitutes acceptance of the new terms.
          </p>
        </div>
      </div>
    </div>
  );
}
