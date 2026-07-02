import React from 'react';

interface BookPage {
    title?: string;
    content: React.ReactNode;
    backContent?: React.ReactNode;
    pageNumber: number;
}
interface InteractiveBookProps {
    coverImage: string;
    bookTitle?: string;
    bookAuthor?: string;
    pages: BookPage[];
    className?: string;
    width?: number | string;
    height?: number | string;
}
declare function InteractiveBook({ coverImage, bookTitle, bookAuthor, pages, className, width, height, }: InteractiveBookProps): React.JSX.Element;
interface JournalEntry {
    id?: string;
    content: string;
    mood?: string | null;
    location?: string | null;
    created_at: string;
}
interface JournalBookProps extends Omit<InteractiveBookProps, 'pages'> {
    entries: JournalEntry[];
    /** Reverse the entries array so the oldest is on page 1 */
    chronological?: boolean;
}
declare function JournalBook({ entries, chronological, ...bookProps }: JournalBookProps): React.JSX.Element;

export { type BookPage, type InteractiveBookProps, JournalBook, type JournalBookProps, type JournalEntry, InteractiveBook as default };
