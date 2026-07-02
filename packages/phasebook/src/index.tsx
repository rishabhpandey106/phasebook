"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './utils';
import { ChevronLeft, ChevronRight, RefreshCcw, X, BookOpen } from 'lucide-react';

export interface BookPage {
    title?: string;
    content: React.ReactNode;
    backContent?: React.ReactNode;
    pageNumber: number;
}

export interface InteractiveBookProps {
    coverImage: string;
    bookTitle?: string;
    bookAuthor?: string;
    pages: BookPage[];
    className?: string;
    width?: number | string;
    height?: number | string;
}

export default function InteractiveBook({
    coverImage,
    bookTitle = "Book Title",
    bookAuthor = "Author Name",
    pages,
    className,
    width = "clamp(150px, 45vw, 350px)",
    height = "clamp(214px, 64vw, 500px)",
}: InteractiveBookProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(-1);
    const [isHovering, setIsHovering] = useState(false);

    // Calculate dynamic width/height values for animations
    const widthNum = typeof width === 'number' ? width : 350;

    // Sync container shift with cover open
    const BOOK_OPEN_DURATION = 1.5;
    const EASING: [number, number, number, number] = [0.25, 0, 0, 1]; // milder smoothing

    const handleOpenBook = () => {
        setIsOpen(true);
        // Automatically jump to the last page (today) when opened
        setCurrentPageIndex(pages.length - 2);
    };

    const handleCloseBook = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setIsOpen(false);
        setCurrentPageIndex(-1);
    };

    const nextPage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (currentPageIndex < pages.length - 1) {
            setCurrentPageIndex((prev) => prev + 1);
        }
    };

    const prevPage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (currentPageIndex >= 0) {
            setCurrentPageIndex((prev) => prev - 1);
        }
    };

    const restartBook = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentPageIndex(-1);
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPageIndex(parseInt(e.target.value, 10));
    };

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextPage();
            if (e.key === 'ArrowLeft') prevPage();
            if (e.key === 'Escape') handleCloseBook();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentPageIndex]);

    return (
        <div
            className={cn("relative flex items-center justify-center perspective-[2000px] w-full h-full min-h-[500px]", className)}
        >
            <motion.div
                className={cn(
                    "relative preserve-3d"
                )}
                style={{ width, height }}
                initial={{ x: 0 }}
                animate={{ x: isOpen ? "50%" : 0 }}
                transition={{ duration: BOOK_OPEN_DURATION, ease: EASING }}
            >

                {/* Front Cover */}
                <motion.div
                    className="absolute inset-0 w-full h-full origin-left"
                    initial={{ rotateY: 0, zIndex: 100 }}
                    animate={{
                        rotateY: isOpen ? -180 : (isHovering ? -15 : 0),
                        zIndex: isOpen ? 0 : 100
                    }}
                    transition={{
                        rotateY: { duration: BOOK_OPEN_DURATION, ease: EASING },
                        zIndex: { delay: isOpen ? BOOK_OPEN_DURATION * 0.6 : BOOK_OPEN_DURATION * 0.4 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                    onClick={!isOpen ? handleOpenBook : undefined}
                    onHoverStart={() => !isOpen && setIsHovering(true)}
                    onHoverEnd={() => setIsHovering(false)}
                >
                    {/* Front Face */}
                    <div
                        className="absolute inset-0 w-full h-full backface-hidden rounded-r-md rounded-l-sm shadow-2xl cursor-pointer overflow-hidden group"
                        style={{ transform: 'translateZ(0.5px)' }}
                    >
                        {/* Image Background */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${coverImage})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute bottom-4 left-3 right-3 text-white text-left">
                            <h1 className="text-sm font-serif font-bold tracking-wide mb-1 drop-shadow-md leading-tight">{bookTitle}</h1>
                            <p className="text-[8px] font-sans tracking-widest opacity-90 uppercase border-t border-white/30 pt-1 inline-block">{bookAuthor}</p>
                        </div>

                        {/* Spine Highlight */}
                        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white/30 to-transparent opacity-40" />
                        <div className="absolute left-[12px] top-0 bottom-0 w-[1px] bg-black/30" />
                    </div>

                    {/* Back Face (Inner Cover) */}
                    <div
                        className="absolute inset-0 w-full h-full backface-hidden rounded-l-md rounded-r-sm bg-paper rotate-y-180 flex flex-col p-8 border-r border-neutral-200 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.05)] cursor-pointer group transition-colors"
                        style={{ transform: 'rotateY(180deg) translateZ(0.5px)' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            prevPage();
                        }}
                    >
                        {pages[0]?.backContent ? (
                            <div className="flex-1 overflow-hidden prose prose-neutral prose-lg max-w-none font-mono text-neutral-800 leading-relaxed select-none h-full flex flex-col relative z-10 text-xl">
                                {pages[0].backContent}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col justify-center items-center text-center opacity-80 relative z-10">
                                <h2 className="text-2xl font-serif text-neutral-800 mb-2 tracking-wide">{bookTitle}</h2>
                                <div className="w-8 h-[1px] bg-neutral-300 mb-3" />
                                <p className="text-xs text-neutral-500 uppercase tracking-widest">Interactive Edition</p>
                            </div>
                        )}
                        
                        {/* Deep spine shadow */}
                        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/20 via-black/5 to-transparent pointer-events-none mix-blend-multiply" />
                        
                        {/* Navigation Hint */}
                        {/* <div className="absolute bottom-6 left-6 flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ChevronLeft size={16} /> Close Cover
                        </div> */}
                    </div>
                </motion.div>

                {/* Pages Stack */}
                <div className="absolute inset-0 w-full h-full z-0" style={{ transformStyle: 'preserve-3d' }}>
                    {pages.map((page, index) => {
                        const isFlipped = index <= currentPageIndex;
                        // Stagger delays slightly for a realistic "whip" effect if user clicks fast, 
                        // but mostly we want instant feedback with smooth transition.

                        return (
                            <motion.div
                                key={index}
                                className="absolute inset-0 w-full h-full origin-left bg-[#fdfbf7] rounded-r-md rounded-l-sm shadow-sm border border-neutral-100"
                                style={{ transformStyle: 'preserve-3d' }}
                                initial={{ rotateY: 0, zIndex: pages.length - index }}
                                animate={{
                                    rotateY: isFlipped ? -180 : 0,
                                    zIndex: isFlipped ? index + 1 : pages.length - index
                                }}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.645, 0.045, 0.355, 1]
                                }}
                            >
                                {/* Front Face (Right Side) */}
                                <div
                                    className="absolute inset-0 w-full h-full backface-hidden p-8 flex flex-col bg-paper cursor-pointer group transition-colors shadow-[inset_10px_0_20px_rgba(0,0,0,0.05)]"
                                    style={{ transform: 'translateZ(0.5px)' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextPage();
                                    }}
                                >
                                    <div className="flex-1 relative z-10 flex flex-col overflow-hidden pb-4">
                                        <div className="text-xs text-neutral-400 text-right mb-4 font-sans tracking-wider shrink-0">
                                            {page.pageNumber * 2 - 1}
                                        </div>
                                        <div 
                                            className="prose prose-neutral prose-lg max-w-none font-handwriting text-neutral-800 leading-relaxed select-none text-xl flex-1 overflow-y-auto overflow-x-hidden book-scrollbar pr-4"
                                            onClick={(e) => e.stopPropagation()}
                                            onPointerDown={(e) => e.stopPropagation()}
                                        >
                                            {page.title && (
                                                <h3 className="text-3xl font-medium text-center mb-6 text-neutral-900 tracking-tight font-mono">
                                                    {page.title}
                                                </h3>
                                            )}
                                            {page.content}
                                        </div>
                                    </div>
                                    
                                    {/* Deep spine shadow */}
                                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none mix-blend-multiply" />
                                    
                                    {/* Navigation Hint */}
                                    <div className="absolute bottom-6 right-6 flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Turn Page <ChevronRight size={16} />
                                    </div>
                                </div>

                                {/* Back Face (Left Side) */}
                                <div
                                    className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-paper border-r border-neutral-200 overflow-hidden p-8 flex flex-col cursor-pointer group transition-colors shadow-[inset_-10px_0_20px_rgba(0,0,0,0.05)]"
                                    style={{ transform: 'rotateY(180deg) translateZ(0.5px)' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevPage();
                                    }}
                                >
                                    {/* Deep spine shadow */}
                                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/20 via-black/5 to-transparent pointer-events-none mix-blend-multiply" />

                                    <div className="flex-1 overflow-hidden relative z-10 flex flex-col pb-4">
                                        <div className="text-xs text-neutral-400 text-left mb-4 font-sans tracking-wider shrink-0">
                                            {page.pageNumber * 2}
                                        </div>
                                        <div 
                                            className="prose prose-neutral prose-lg max-w-none font-mono text-neutral-800 leading-relaxed select-none flex-1 overflow-y-auto overflow-x-hidden book-scrollbar pr-4 text-xl"
                                            onClick={(e) => e.stopPropagation()}
                                            onPointerDown={(e) => e.stopPropagation()}
                                        >
                                            {pages[index + 1]?.backContent ? (
                                                <div className="min-h-full">
                                                    {pages[index + 1].backContent}
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center opacity-[0.03]">
                                                    <span className="font-serif text-8xl italic font-bold text-black">
                                                        {page.pageNumber * 2}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Navigation Hint */}
                                    <div className="absolute bottom-6 left-6 flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <ChevronLeft size={16} /> Turn Back
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Back Cover (Static) */}
                    <div
                        className="absolute inset-0 w-full h-full bg-[#fdfbf7] rounded-r-md rounded-l-sm shadow-xl border border-neutral-200"
                        style={{ transform: 'translateZ(-1px)', zIndex: -1 }}
                    >
                        <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center opacity-40">
                            <p className="font-serif text-neutral-500 italic">The End</p>
                            <button
                                onClick={restartBook}
                                className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors text-sm text-neutral-600 cursor-pointer"
                            >
                                <RefreshCcw size={14} /> Read Again
                            </button>
                        </div>
                    </div>
                </div>

                {/* Controls Bar Removed */}

            </motion.div>

            {/* Side Navigation Arrows */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={handleCloseBook}
                            className="absolute top-8 right-8 p-2 rounded-full bg-white/50 dark:bg-neutral-800/50 hover:bg-white dark:hover:bg-neutral-800 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 backdrop-blur-sm text-neutral-800 dark:text-neutral-100 z-[1000] transition-all hover:scale-110 shadow-sm hover:shadow-xl"
                        >
                            <X size={24} />
                        </motion.button>
                    </>
                )}
            </AnimatePresence>

            {/* Hint */}
            {!isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-4 text-neutral-500 dark:text-neutral-400 text-sm font-medium tracking-widest uppercase cursor-pointer z-50 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                    onClick={handleOpenBook}
                >
                    Click to Open
                </motion.div>
            )}
        </div>
    );
}

export interface JournalEntry {
    id?: string;
    content: string;
    mood?: string | null;
    location?: string | null;
    created_at: string;
}

export interface JournalBookProps extends Omit<InteractiveBookProps, 'pages'> {
    entries: JournalEntry[];
    /** Reverse the entries array so the oldest is on page 1 */
    chronological?: boolean;
}

export function JournalBook({
    entries,
    chronological = true,
    ...bookProps
}: JournalBookProps) {
    let pages: BookPage[] = [];

    const orderedEntries = chronological ? [...entries].reverse() : entries;

    if (orderedEntries.length === 0) {
        pages = [{
            pageNumber: 1,
            content: <div className="italic opacity-50 font-serif text-center mt-10">This journal is completely empty.</div>,
            backContent: <div />
        }];
    } else {
        pages = orderedEntries.map((entry, index) => {
            const dateObj = new Date(entry.created_at);
            const dateString = dateObj.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            return {
                pageNumber: index + 1,
                // Right side: Content
                content: (
                    <div className="flex flex-col h-full min-h-full">
                        <div className="flex-1 whitespace-pre-wrap text-neutral-800 leading-relaxed font-serif text-2xl">
                            {entry.content}
                        </div>
                    </div>
                ),
                // Left side: Date, Mood, Location
                backContent: (
                    <div className="flex flex-col h-full justify-center items-center text-center px-4">
                        <div className="mb-8 opacity-60">
                            <h3 className="font-serif text-3xl italic tracking-wider mb-2">
                                {dateString}
                            </h3>
                            <div className="w-12 h-[1px] bg-neutral-400 mx-auto" />
                        </div>
                        
                        <div className="space-y-4 font-mono text-sm tracking-widest uppercase opacity-80">
                            {entry.mood && (
                                <div>
                                    <span className="text-neutral-400 block mb-1 text-[10px]">Mood</span>
                                    <span className="text-neutral-800">{entry.mood}</span>
                                </div>
                            )}
                            {entry.location && (
                                <div>
                                    <span className="text-neutral-400 block mb-1 text-[10px]">Location</span>
                                    <span className="text-neutral-800">{entry.location}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )
            };
        });
    }

    return <InteractiveBook pages={pages} {...bookProps} />;
}
