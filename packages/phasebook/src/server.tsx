import React from 'react';
import { JournalBook, JournalEntry, InteractiveBookProps } from './index';

export interface HyperspaceJournalProps extends Omit<InteractiveBookProps, 'pages'> {
    /**
     * Your highly secure Server-Side API Key.
     * Do NOT expose this to the browser.
     */
    apiKey: string;
    /**
     * Optional backend URL override (for local testing).
     * Defaults to the production Hyperspace backend.
     */
    baseUrl?: string;
}

/**
 * HyperspaceJournal - A Next.js Server Component that securely fetches your public
 * journal entries from the Hyperspace backend and renders the InteractiveBook.
 */
export async function HyperspaceJournal({
    apiKey,
    baseUrl = 'http://127.0.0.1:8787',
    coverImage,
    bookTitle,
    bookAuthor,
    className,
    width,
    height
}: HyperspaceJournalProps) {
    let entries: JournalEntry[] = [];

    try {
        const response = await fetch(`${baseUrl}/api/public/sdk/entries`, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch journal entries: ${response.statusText}`);
        }

        const data = await response.json();
        entries = data.entries || [];

    } catch (error) {
        console.error("[HyperspaceJournal] Error:", error);
        // Fallback error entry
        entries = [{
            content: "Error loading journal entries. Please check your API key.",
            created_at: new Date().toISOString(),
            mood: "Error",
            location: "Connection lost"
        }];
    }

    return (
        <JournalBook
            entries={entries}
            coverImage={coverImage}
            bookTitle={bookTitle}
            bookAuthor={bookAuthor}
            className={className}
            width={width}
            height={height}
        />
    );
}
