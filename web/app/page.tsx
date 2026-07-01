import Link from 'next/link';
import { Button } from '../components/Button';
import { ArrowRight, Database, Lock, Terminal, Layout, Blocks } from 'lucide-react';
import { JournalBook } from 'phasebook';
import 'phasebook/styles.css';

export default function LandingPage() {
  const demoEntries = [
    { 
      id: "1", 
      content: "SYSTEM LOG v1.0\n\nInitialization complete. Welcome to Phasebook. A brutalist, uncompromising journaling system built for developers.", 
      created_at: new Date().toISOString(), 
      mood: "NEUTRAL", 
      location: "SYSTEM CORE" 
    },
    { 
      id: "2", 
      content: "Zero curves. Zero gradients. Pure signal. This component is rendering live in the hero section.", 
      created_at: new Date(Date.now() + 86400000).toISOString(), 
      mood: "FOCUSED", 
      location: "EDGE NETWORK" 
    }
  ];

  return (
    <div className="min-h-screen bg-white font-mono selection:bg-black selection:text-white">
      {/* 1. Global Navigation */}
      <header className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 transition-none">
            <span className="font-black uppercase tracking-widest text-xl">Phasebook</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 font-bold uppercase tracking-[0.08em] text-sm">
            <Link href="#features" className="hover:underline hover:bg-black hover:text-white px-2 py-1 transition-none">Features</Link>
            <Link href="/developers" className="hover:underline hover:bg-black hover:text-white px-2 py-1 transition-none">SDK</Link>
            <Link href="#pricing" className="hover:underline hover:bg-black hover:text-white px-2 py-1 transition-none">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/rishabhpandey106" className="hidden sm:block hover:bg-black hover:text-white px-2 py-1 font-bold uppercase tracking-[0.08em] text-sm transition-none">
              Github
            </Link>
            <Link href="/login">
              <Button variant="primary">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        
        {/* 2. Split Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] border-b-4 border-black">
          {/* Left: Copy */}
          <div className="p-8 md:p-16 flex flex-col justify-center space-y-8 border-b-4 lg:border-b-0 lg:border-r-4 border-black">
            <div className="inline-block border-2 border-black px-4 py-1 font-bold uppercase tracking-[0.08em] text-xs bg-white shadow-[4px_4px_0_0_#000000] self-start">
              System v1.0 Journal
            </div>
            <h1 className="text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
              Pure Signal.<br />No Noise.
            </h1>
            <p className="text-lg font-bold text-[#555555] uppercase tracking-[0.08em] leading-relaxed max-w-xl">
              A brutalist, uncompromising journaling system. Encrypted, offline-capable, and synced across all your devices. Built strictly on JetBrains Mono.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link href="/login" className="w-full sm:w-auto">
                <Button variant="primary" className="text-lg gap-3 w-full flex items-center justify-center">
                  Initialize <ArrowRight size={20} strokeWidth={3} />
                </Button>
              </Link>
              <Link href="/developers" className="w-full sm:w-auto">
                <Button variant="outline" className="text-lg w-full text-center">
                  Read Docs
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right: Live Demo */}
          <div className="bg-[radial-gradient(#00000022_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center p-8 overflow-hidden relative">
            <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 font-bold text-xs uppercase tracking-[0.08em]">
              Live Demo
            </div>
            <div className="w-full h-[500px] flex items-center justify-center">
              <JournalBook 
                entries={demoEntries} 
                coverImage="https://images.unsplash.com/photo-1528459105426-b9548367069b?auto=format&fit=crop&q=80"
                bookTitle="Phasebook"
                bookAuthor="Hyperspace v1.0"
              />
            </div>
          </div>
        </section>

        {/* 3. Social Proof Marquee */}
        <section className="border-b-4 border-black bg-white overflow-hidden py-6 flex items-center">
          <div className="flex gap-16 animate-marquee whitespace-nowrap px-8 font-black text-2xl uppercase tracking-[0.08em] text-[#555555]">
            <span> Not Trusted By</span> •
            <span> Google</span> •
            <span> Amazon</span> •
            <span> Open AI</span> •
            <span> Meta</span> •
            <span> Scaly</span> •
            <span> Sarvam AI</span> •
            <span> Anthropic</span> •
            <span> Figma</span> •
            <span> ShadCN</span> •
            <span> Vercel</span> •
            <span> Cypher</span> •
            <span> AWS</span> •
            <span> Atlasssian</span> •
            <span> Stripe</span> •
            <span> Vengeance UI</span>
          </div>
        </section>

        {/* 4. "How it Works" Code Snippet */}
        <section className="grid grid-cols-1 lg:grid-cols-2 border-b-4 border-black">
          <div className="bg-black text-white p-8 md:p-16 flex items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-black uppercase tracking-tighter">Embed anywhere in 3 lines of code.</h2>
              <p className="text-[#a0a0a0] font-bold text-lg uppercase tracking-[0.08em] leading-relaxed">
                The Phasebook SDK is built for modern React architectures. Use our server components to securely fetch and render your journal instantly on the edge.
              </p>
              <Link href="/developers" className="inline-block mt-4 text-white underline font-bold uppercase tracking-[0.08em] hover:text-[#555555] transition-none">
                View Full Documentation &rarr;
              </Link>
            </div>
          </div>
          <div className="bg-[#FFFFFF] p-8 md:p-16 flex items-center justify-center border-t-4 lg:border-t-0 lg:border-l-4 border-black relative">
            {/* Hard drop shadow as per DESIGN.md level 2 / level 3 */}
            <pre className="bg-[#000000] p-8 border-2 border-[#000000] text-white font-mono text-sm sm:text-base shadow-[6px_6px_0_0_#000000] overflow-x-auto w-full transition-none hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[10px_10px_0_0_#000000]">
<code><span className="text-[#888888]">{"// app/page.tsx"}</span>
{"\n"}
<span className="text-[#ff5555]">import</span> {"{ HyperspaceJournal }"} <span className="text-[#ff5555]">from</span> <span className="text-[#55ff55]">"phasebook/server"</span>;
{"\n\n"}
<span className="text-[#ff5555]">export default function</span> <span className="text-[#5555ff]">MyBlog</span>() {"{"}
{"\n"}  <span className="text-[#ff5555]">return</span> (
{"\n"}    {"<"}HyperspaceJournal 
{"\n"}      apiKey={<span className="text-[#5555ff]">process.env.HYPERSPACE_KEY</span>} 
{"\n"}    {"/>"}
{"\n"}  );
{"\n"}{"}"}</code>
            </pre>
          </div>
        </section>

        {/* 5. Bento Box Feature Grid */}
        <section id="features" className="p-8 md:p-16 bg-white border-b-4 border-black">
          <div className="mb-12">
            <h2 className="text-5xl font-black uppercase tracking-tighter">System Specs</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-min">
            
            {/* Wide Feature */}
            <div className="md:col-span-2 border-2 border-black p-8 shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] transition-none bg-white space-y-6 flex flex-col justify-between min-h-[300px]">
              <div className="flex items-center gap-4 border-b-2 border-black pb-4">
                <Terminal size={40} strokeWidth={2.5} />
                <h3 className="text-3xl font-black uppercase tracking-widest">Pure Mono Architecture</h3>
              </div>
              <p className="text-xl font-bold text-[#555555] leading-relaxed uppercase tracking-[0.08em]">
                Zero curves. Zero gradients. Built entirely on JetBrains Mono and raw HTML structures. Your content takes center stage without distracting UI elements.
              </p>
            </div>

            {/* Tall Feature */}
            <div className="border-2 border-black p-8 shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] transition-none bg-black text-white space-y-6 flex flex-col justify-between min-h-[300px]">
              <Lock size={40} strokeWidth={2.5} />
              <div>
                <h3 className="text-2xl font-black uppercase tracking-widest mb-4">Secure Core</h3>
                <p className="text-[#a0a0a0] font-bold uppercase tracking-[0.08em] leading-relaxed text-sm">
                  JWT authenticated sessions with strict private/public visibility protocols for every single entry. Your data is encrypted at rest.
                </p>
              </div>
            </div>

            {/* Standard Features */}
            <div className="border-2 border-black p-8 shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] transition-none bg-white space-y-6">
              <Database size={40} strokeWidth={2.5} />
              <h3 className="text-xl font-black uppercase tracking-widest">Edge Synced</h3>
              <p className="text-[#555555] font-bold text-sm uppercase tracking-[0.08em]">
                Powered by a high-speed Cloudflare Workers edge network. Access your logs globally with zero latency.
              </p>
            </div>

            <div className="border-2 border-black p-8 shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] transition-none bg-white space-y-6">
              <Layout size={40} strokeWidth={2.5} />
              <h3 className="text-xl font-black uppercase tracking-widest">3D Hardware Accel</h3>
              <p className="text-[#555555] font-bold text-sm uppercase tracking-[0.08em]">
                60FPS WebGL-style CSS 3D transforms rendering beautiful page turns on both desktop and mobile.
              </p>
            </div>

            <div className="border-2 border-black p-8 shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-[3px] hover:-translate-y-[3px] transition-none bg-white space-y-6">
              <Blocks size={40} strokeWidth={2.5} />
              <h3 className="text-xl font-black uppercase tracking-widest">Bring Your Own Data</h3>
              <p className="text-[#555555] font-bold text-sm uppercase tracking-[0.08em]">
                Don't want to use our backend? Use the Dumb UI method and pass any data source directly into the book.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* 6. Robust Footer */}
      <footer className="bg-black text-white border-t-8 border-black">
        <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 border-b-4 border-[#333333]">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-4xl font-black uppercase tracking-widest">Phasebook</h2>
            <p className="text-[#888888] font-bold uppercase tracking-[0.08em] max-w-sm text-sm">
              The uncompromising journaling system built for developers who demand control over their data and aesthetics.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-lg font-black uppercase tracking-widest text-[#555555]">Resources</h3>
            <ul className="space-y-4 font-bold uppercase tracking-[0.08em] text-sm">
              <li><Link href="/developers" className="hover:underline transition-none">Documentation</Link></li>
              <li><Link href="/api" className="hover:underline transition-none">API Reference</Link></li>
              <li><Link href="https://github.com" className="hover:underline transition-none">Source Code</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-lg font-black uppercase tracking-widest text-[#555555]">Company</h3>
            <ul className="space-y-4 font-bold uppercase tracking-[0.08em] text-sm">
              <li><Link href="/about" className="hover:underline transition-none">About</Link></li>
              <li><Link href="/privacy" className="hover:underline transition-none">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:underline transition-none">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between font-bold uppercase text-xs text-[#555555] tracking-widest">
          <p>&copy; {new Date().getFullYear()} Phasebook Systems. All rights reserved.</p>
          <p>Designed strictly per DESIGN.md</p>
        </div>
      </footer>

      {/* Tailwind Animation for Marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 15s linear infinite;
        }
      `}} />
    </div>
  );
}
