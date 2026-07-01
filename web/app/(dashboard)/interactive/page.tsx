"use client";

import { useEffect, useState } from "react";
import InteractiveBook, { BookPage } from "@/components/ui/interactive-book";
import { api } from "@/lib/api";

export default function InteractiveBookDemo() {
  const [pages, setPages] = useState<BookPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await api.get('/entries');
        const entries = res.data.entries;
        
        // Sort oldest first so the book flows chronologically
        const sorted = [...entries].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        
        // Take up to the last 7 entries (e.g. last week)
        const lastWeek = sorted.slice(-7);
        
        const bookPages = lastWeek.map((entry: any, index: number) => {
          const dateObj = new Date(entry.created_at.endsWith('Z') ? entry.created_at : entry.created_at + 'Z');
          const title = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
          
          return {
            title: title,
            content: entry.content,
            pageNumber: index + 1,
            backContent: (
              <div className="flex flex-col h-full justify-center opacity-50 space-y-4">
                {entry.mood && <div className="font-bold uppercase tracking-widest text-xs"><span className="font-normal">Mood: </span>{entry.mood}</div>}
                {entry.location && <div className="font-bold uppercase tracking-widest text-xs"><span className="font-normal">Coordinates: </span>{entry.location}</div>}
                {/* <div className="font-bold uppercase tracking-widest text-xs">Visibility: {entry.is_public === 1 ? 'PUBLIC' : 'PRIVATE'}</div> */}
              </div>
            )
          };
        });
        
        setPages(bookPages);
      } catch (e) {
        console.error("Failed to fetch", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntries();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="font-bold uppercase tracking-widest animate-pulse">Loading Archives...</span>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="font-bold uppercase tracking-widest text-secondary">No records found.</span>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-8 animate-in fade-in duration-0 w-full">
      <div className="mb-12 text-center space-y-2">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Interactive Archive</h1>
        <p className="font-bold uppercase text-xs tracking-widest text-secondary">Past 7 Entries</p>
      </div>
      
      <InteractiveBook
        pages={pages}
        bookTitle="The Diary of Young Boy"
        bookAuthor="on ma mama soul gng"
        coverImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
      />
    </div>
  );
}