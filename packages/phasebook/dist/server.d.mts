import React from 'react';
import { InteractiveBookProps } from './index';

interface HyperspaceJournalProps extends Omit<InteractiveBookProps, 'pages'> {
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
declare function HyperspaceJournal({ apiKey, baseUrl, coverImage, bookTitle, bookAuthor, className, width, height }: HyperspaceJournalProps): Promise<React.JSX.Element>;

export { HyperspaceJournal, type HyperspaceJournalProps };
