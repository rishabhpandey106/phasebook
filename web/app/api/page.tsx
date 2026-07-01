import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-white font-mono selection:bg-black selection:text-white p-8 md:p-16">
      <div className="max-w-3xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center gap-2 font-bold uppercase tracking-widest hover:underline transition-none text-sm">
          <ArrowLeft size={16} /> Back to System
        </Link>
        
        <header className="border-b-4 border-black pb-8">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">API Reference</h1>
          <p className="text-xl font-bold text-[#555555] uppercase tracking-[0.08em] mt-4">Programmatic access to your logs.</p>
        </header>
        
        <div className="prose prose-neutral max-w-none prose-p:font-bold prose-p:text-[#555555] prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-a:text-black prose-a:font-bold">
          <h2>Authentication</h2>
          <p>
            All API requests require a standard Bearer token header. Generate your API key from your account dashboard.
          </p>
          <pre className="bg-[#000000] p-6 border-2 border-[#000000] text-white font-mono text-sm shadow-[4px_4px_0_0_#000000] overflow-x-auto my-6">
<code>Authorization: Bearer hyp_xxxxxxxxxx</code>
          </pre>
          
          <h2>GET /v1/entries</h2>
          <p>
            Fetches all journal entries for the authenticated user, paginated in batches of 50.
          </p>
          
          <h2>POST /v1/entries</h2>
          <p>
            Creates a new encrypted journal entry. Requires a JSON payload containing the raw content, mood, and location.
          </p>
          <pre className="bg-[#000000] p-6 border-2 border-[#000000] text-white font-mono text-sm shadow-[4px_4px_0_0_#000000] overflow-x-auto my-6">
<code>{`{
  "content": "System operational.",
  "mood": "FOCUSED",
  "location": "Core"
}`}</code>
          </pre>

          <h2>This page will be updated soon...</h2>
        </div>
      </div>
    </div>
  );
}
