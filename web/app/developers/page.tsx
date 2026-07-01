"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, Database, Terminal, Copy, Check, Eye } from 'lucide-react';
import { Button } from '../../components/Button';
import { JournalBook } from 'phasebook';
import 'phasebook/styles.css';

function CopyButton({ text, dark = false }: { text: string, dark?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={`p-2 transition-colors border-2 border-transparent hover:border-current flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${
        dark ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-black"
      }`}
      title="Copy to clipboard"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] selection:bg-black selection:text-white pb-24">
      
      {/* Header */}
      <header className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <ArrowLeft strokeWidth={3} size={24} />
            <span className="font-black uppercase tracking-widest text-xl">Phasebook</span>
          </Link>
          <div className="font-bold uppercase tracking-widest text-sm px-3 py-1 bg-black text-white">
            Developer Docs
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-16 space-y-16">
        
        {/* Intro */}
        <section className="space-y-6">
          <h1 className="text-5xl font-black uppercase tracking-tighter">Phasebook SDK</h1>
          <p className="text-xl font-bold text-neutral-600 uppercase tracking-widest leading-relaxed">
            Integrate your beautiful, interactive Phasebook journals directly into your own applications. We provide two uncompromising methods to suit your architecture.
          </p>
        </section>

        {/* Live Demo */}
        <section className="border-4 border-black bg-white shadow-brutal-md overflow-hidden">
          <div className="bg-black text-white p-6 flex items-center gap-4">
            <Eye size={32} />
            <div>
              <h2 className="text-2xl font-black uppercase tracking-wider">Live Preview</h2>
              <p className="font-mono text-sm opacity-80 mt-1">Interact with the actual 3D component below</p>
            </div>
          </div>
          <div className="p-8 bg-neutral-100 flex items-center justify-center w-full overflow-hidden">
            {/* The actual component */}
            <div className="w-full h-[600px] flex items-center justify-center">
              <JournalBook 
                entries={[
                  { 
                    id: "1", 
                    content: "This is a live, interactive demo of the Phasebook component embedded directly in this documentation! Notice the crisp typography and the beautifully aligned layout. Click the right margin to turn the page!", 
                    created_at: new Date().toISOString(), 
                    mood: "FOCUSED", 
                    location: "DOCUMENTATION" 
                  },
                  { 
                    id: "2", 
                    content: "The pages cast realistic shadows onto the spine as they turn. This is the exact component your users will interact with. Whether you use the Smart SDK or the Dumb UI, the result looks perfectly identical to this.", 
                    created_at: new Date(Date.now() + 86400000).toISOString(), 
                    mood: "EXCITED", 
                    location: "Phasebook" 
                  }
                ]} 
                coverImage="https://images.unsplash.com/photo-1528459105426-b9548367069b?auto=format&fit=crop&q=80"
                bookTitle="Phasebook Demo"
                bookAuthor="Phasebook SDK"
              />
            </div>
          </div>
        </section>

        {/* The Smart SDK */}
        <section className="border-4 border-black bg-white shadow-brutal-md overflow-hidden">
          <div className="bg-black text-white p-6 flex items-center gap-4">
            <Database size={32} />
            <div>
              <h2 className="text-2xl font-black uppercase tracking-wider">Method 1: The Smart SDK</h2>
              <p className="font-mono text-sm opacity-80 mt-1">For Next.js 13+ App Router (Server Components)</p>
            </div>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="prose prose-neutral max-w-none font-body">
              <p className="text-lg">
                The absolute easiest way to embed your journal. This server component takes your <strong>API Key</strong>, automatically fetches your public journal entries from our edge network, and renders the beautiful 3D book entirely on the server. Zero client-side fetching.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <Terminal size={16} /> Installation
              </div>
              <div className="bg-neutral-100 p-4 border-2 border-black font-mono text-sm overflow-x-auto flex items-center justify-between">
                <code>npm install phasebook</code>
                <CopyButton text="npm install phasebook" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <Code size={16} /> Usage
              </div>
              <div className="relative">
                <div className="absolute top-4 right-4">
                  <CopyButton dark text={`import { HyperspaceJournal } from "phasebook/server";
import "phasebook/styles.css";

export default function MyBlog() {
  return (
    <div className="my-layout">
      {/* Fetches and renders instantly */}
      <HyperspaceJournal 
        apiKey={process.env.PHASEBOOK_API_KEY} 
        coverImage="https://example.com/cover.jpg"
        bookTitle="Phasebook SDK"
        bookAuthor="John Doe"
      />
    </div>
  );
}`} />
                </div>
                <pre className="bg-neutral-900 text-neutral-100 p-6 pt-12 border-2 border-black font-mono text-sm overflow-x-auto leading-relaxed shadow-inner">
<code>{`import { HyperspaceJournal } from "phasebook/server";
import "phasebook/styles.css";

export default function MyBlog() {
  return (
    <div className="my-layout">
      {/* Fetches and renders instantly */}
      <HyperspaceJournal 
        apiKey={process.env.PHASEBOOK_API_KEY} 
        coverImage="https://example.com/cover.jpg"
        bookTitle="Phasebook SDK"
        bookAuthor="John Doe"
      />
    </div>
  );
}`}</code>
              </pre>
              </div>
            </div>
          </div>
        </section>

        {/* The Dumb UI */}
        <section className="border-4 border-black bg-white shadow-brutal-md overflow-hidden">
          <div className="bg-black text-white p-6 flex items-center gap-4">
            <Code size={32} />
            <div>
              <h2 className="text-2xl font-black uppercase tracking-wider">Method 2: The Dumb UI</h2>
              <p className="font-mono text-sm opacity-80 mt-1">For React, Vite, Vue, or Custom Backends</p>
            </div>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="prose prose-neutral max-w-none font-body">
              <p className="text-lg">
                If you are not using Next.js Server Components, or if you want to fetch the data from your own custom backend, you can use the pure UI wrapper. You provide the raw data array, and we do the beautiful 3D styling.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <Code size={16} /> Usage
              </div>
              <div className="relative">
                <div className="absolute top-4 right-4">
                  <CopyButton dark text={`import { useEffect, useState } from "react";
import { JournalBook } from "phasebook";
import "phasebook/styles.css";

export default function MyReactApp() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // 1. Fetch the data from your own API or Phasebook API
    fetch("https://phasebook-api.com/entries").then(r => r.json()).then(setEntries);
  }, []);

  return (
    // 2. Pass the raw array directly to JournalBook
    <JournalBook 
      entries={entries} 
      coverImage="https://example.com/cover.jpg"
      bookTitle="Offline Journal"
    />
  );
}`} />
                </div>
                <pre className="bg-neutral-900 text-neutral-100 p-6 pt-12 border-2 border-black font-mono text-sm overflow-x-auto leading-relaxed shadow-inner">
<code>{`import { useEffect, useState } from "react";
import { JournalBook } from "phasebook";
import "phasebook/styles.css";

export default function MyReactApp() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // 1. Fetch the data from your own API or Phasebook API
    fetch("https://phasebook-api.com/entries").then(r => r.json()).then(setEntries);
  }, []);

  return (
    // 2. Pass the raw array directly to JournalBook
    <JournalBook 
      entries={entries} 
      coverImage="https://example.com/cover.jpg"
      bookTitle="Offline Journal"
    />
  );
}`}</code>
              </pre>
              </div>
            </div>
            
          </div>
        </section>

        {/* Method 3: Raw Engine */}
        <section className="border-4 border-black bg-white shadow-brutal-md overflow-hidden">
          <div className="bg-black text-white p-6 flex items-center gap-4">
            <Terminal size={32} />
            <div>
              <h2 className="text-2xl font-black uppercase tracking-wider">Method 3: Raw Engine</h2>
              <p className="font-mono text-sm opacity-80 mt-1">For Custom Layouts, Photo Albums, and Recipes</p>
            </div>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="prose prose-neutral max-w-none font-body">
              <p className="text-lg">
                Need total control? Import the core <code>InteractiveBook</code> engine directly. You pass an array of pages containing raw React nodes for the right-side content and left-side back content. This allows you to build anything imaginable.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <Code size={16} /> Usage
              </div>
              <div className="relative">
                <div className="absolute top-4 right-4">
                  <CopyButton dark text={`import { InteractiveBook } from "phasebook";
import "phasebook/styles.css";

export default function CustomBook() {
  const pages = [
    {
      title: "My Recipe",
      content: <div><h2>Ingredients</h2><ul><li>Flour</li></ul></div>,
      backContent: <img src="/flour.jpg" />
    },
    {
      content: <p>Mix it all together...</p>
    }
  ];

  return (
    <InteractiveBook 
      pages={pages} 
      coverImage="https://example.com/cookbook.jpg"
      bookTitle="My Recipes"
    />
  );
}`} />
                </div>
                <pre className="bg-neutral-900 text-neutral-100 p-6 pt-12 border-2 border-black font-mono text-sm overflow-x-auto leading-relaxed shadow-inner">
<code>{`import { InteractiveBook } from "phasebook";
import "phasebook/styles.css";

export default function CustomBook() {
  const pages = [
    {
      title: "My Recipe",
      content: <div><h2>Ingredients</h2><ul><li>Flour</li></ul></div>,
      backContent: <img src="/flour.jpg" />
    },
    {
      content: <p>Mix it all together...</p>
    }
  ];

  return (
    <InteractiveBook 
      pages={pages} 
      coverImage="https://example.com/cookbook.jpg"
      bookTitle="My Recipes"
    />
  );
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
