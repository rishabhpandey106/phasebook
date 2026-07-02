"use client";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  JournalBook: () => JournalBook,
  default: () => InteractiveBook
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_framer_motion = require("framer-motion");

// src/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/index.tsx
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
function InteractiveBook({
  coverImage,
  bookTitle = "Book Title",
  bookAuthor = "Author Name",
  pages,
  className,
  width = "clamp(150px, 45vw, 350px)",
  height = "clamp(214px, 64vw, 500px)"
}) {
  const [isOpen, setIsOpen] = (0, import_react.useState)(false);
  const [currentPageIndex, setCurrentPageIndex] = (0, import_react.useState)(-1);
  const [isHovering, setIsHovering] = (0, import_react.useState)(false);
  const widthNum = typeof width === "number" ? width : 350;
  const BOOK_OPEN_DURATION = 1.5;
  const EASING = [0.25, 0, 0, 1];
  const handleOpenBook = () => {
    setIsOpen(true);
    setCurrentPageIndex(pages.length - 2);
  };
  const handleCloseBook = (e) => {
    e?.stopPropagation();
    setIsOpen(false);
    setCurrentPageIndex(-1);
  };
  const nextPage = (e) => {
    e?.stopPropagation();
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };
  const prevPage = (e) => {
    e?.stopPropagation();
    if (currentPageIndex >= 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };
  const restartBook = (e) => {
    e?.stopPropagation();
    setCurrentPageIndex(-1);
  };
  const handleSliderChange = (e) => {
    setCurrentPageIndex(parseInt(e.target.value, 10));
  };
  (0, import_react.useEffect)(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
      if (e.key === "Escape") handleCloseBook();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentPageIndex]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: cn("relative flex items-center justify-center perspective-[2000px] w-full h-full min-h-[500px]", className),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          import_framer_motion.motion.div,
          {
            className: cn(
              "relative preserve-3d"
            ),
            style: { width, height },
            initial: { x: 0 },
            animate: { x: isOpen ? "50%" : 0 },
            transition: { duration: BOOK_OPEN_DURATION, ease: EASING },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                import_framer_motion.motion.div,
                {
                  className: "absolute inset-0 w-full h-full origin-left",
                  initial: { rotateY: 0, zIndex: 100 },
                  animate: {
                    rotateY: isOpen ? -180 : isHovering ? -15 : 0,
                    zIndex: isOpen ? 0 : 100
                  },
                  transition: {
                    rotateY: { duration: BOOK_OPEN_DURATION, ease: EASING },
                    zIndex: { delay: isOpen ? BOOK_OPEN_DURATION * 0.6 : BOOK_OPEN_DURATION * 0.4 }
                  },
                  style: { transformStyle: "preserve-3d" },
                  onClick: !isOpen ? handleOpenBook : void 0,
                  onHoverStart: () => !isOpen && setIsHovering(true),
                  onHoverEnd: () => setIsHovering(false),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      "div",
                      {
                        className: "absolute inset-0 w-full h-full backface-hidden rounded-r-md rounded-l-sm shadow-2xl cursor-pointer overflow-hidden group",
                        style: { transform: "translateZ(0.5px)" },
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            "div",
                            {
                              className: "absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105",
                              style: { backgroundImage: `url(${coverImage})` }
                            }
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "absolute bottom-4 left-3 right-3 text-white text-left", children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-sm font-serif font-bold tracking-wide mb-1 drop-shadow-md leading-tight", children: bookTitle }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-[8px] font-sans tracking-widest opacity-90 uppercase border-t border-white/30 pt-1 inline-block", children: bookAuthor })
                          ] }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white/30 to-transparent opacity-40" }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[12px] top-0 bottom-0 w-[1px] bg-black/30" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      "div",
                      {
                        className: "absolute inset-0 w-full h-full backface-hidden rounded-l-md rounded-r-sm bg-paper rotate-y-180 flex flex-col p-8 border-r border-neutral-200 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.05)] cursor-pointer group transition-colors",
                        style: { transform: "rotateY(180deg) translateZ(0.5px)" },
                        onClick: (e) => {
                          e.stopPropagation();
                          prevPage();
                        },
                        children: [
                          pages[0]?.backContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 overflow-hidden prose prose-neutral prose-lg max-w-none font-mono text-neutral-800 leading-relaxed select-none h-full flex flex-col relative z-10 text-xl", children: pages[0].backContent }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex-1 flex flex-col justify-center items-center text-center opacity-80 relative z-10", children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-2xl font-serif text-neutral-800 mb-2 tracking-wide", children: bookTitle }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-8 h-[1px] bg-neutral-300 mb-3" }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs text-neutral-500 uppercase tracking-widest", children: "Interactive Edition" })
                          ] }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/20 via-black/5 to-transparent pointer-events-none mix-blend-multiply" })
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "absolute inset-0 w-full h-full z-0", style: { transformStyle: "preserve-3d" }, children: [
                pages.map((page, index) => {
                  const isFlipped = index <= currentPageIndex;
                  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    import_framer_motion.motion.div,
                    {
                      className: "absolute inset-0 w-full h-full origin-left bg-[#fdfbf7] rounded-r-md rounded-l-sm shadow-sm border border-neutral-100",
                      style: { transformStyle: "preserve-3d" },
                      initial: { rotateY: 0, zIndex: pages.length - index },
                      animate: {
                        rotateY: isFlipped ? -180 : 0,
                        zIndex: isFlipped ? index + 1 : pages.length - index
                      },
                      transition: {
                        duration: 0.6,
                        ease: [0.645, 0.045, 0.355, 1]
                      },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                          "div",
                          {
                            className: "absolute inset-0 w-full h-full backface-hidden p-8 flex flex-col bg-paper cursor-pointer group transition-colors shadow-[inset_10px_0_20px_rgba(0,0,0,0.05)]",
                            style: { transform: "translateZ(0.5px)" },
                            onClick: (e) => {
                              e.stopPropagation();
                              nextPage();
                            },
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex-1 relative z-10 flex flex-col overflow-hidden pb-4", children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs text-neutral-400 text-right mb-4 font-sans tracking-wider shrink-0", children: page.pageNumber * 2 - 1 }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                  "div",
                                  {
                                    className: "prose prose-neutral prose-lg max-w-none font-handwriting text-neutral-800 leading-relaxed select-none text-xl flex-1 overflow-y-auto overflow-x-hidden book-scrollbar pr-4",
                                    onClick: (e) => e.stopPropagation(),
                                    onPointerDown: (e) => e.stopPropagation(),
                                    children: [
                                      page.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-3xl font-medium text-center mb-6 text-neutral-900 tracking-tight font-mono", children: page.title }),
                                      page.content
                                    ]
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none mix-blend-multiply" }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "absolute bottom-6 right-6 flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: [
                                "Turn Page ",
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronRight, { size: 16 })
                              ] })
                            ]
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                          "div",
                          {
                            className: "absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-paper border-r border-neutral-200 overflow-hidden p-8 flex flex-col cursor-pointer group transition-colors shadow-[inset_-10px_0_20px_rgba(0,0,0,0.05)]",
                            style: { transform: "rotateY(180deg) translateZ(0.5px)" },
                            onClick: (e) => {
                              e.stopPropagation();
                              prevPage();
                            },
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/20 via-black/5 to-transparent pointer-events-none mix-blend-multiply" }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex-1 overflow-hidden relative z-10 flex flex-col pb-4", children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs text-neutral-400 text-left mb-4 font-sans tracking-wider shrink-0", children: page.pageNumber * 2 }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  "div",
                                  {
                                    className: "prose prose-neutral prose-lg max-w-none font-mono text-neutral-800 leading-relaxed select-none flex-1 overflow-y-auto overflow-x-hidden book-scrollbar pr-4 text-xl",
                                    onClick: (e) => e.stopPropagation(),
                                    onPointerDown: (e) => e.stopPropagation(),
                                    children: pages[index + 1]?.backContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-full", children: pages[index + 1].backContent }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full h-full flex items-center justify-center opacity-[0.03]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-serif text-8xl italic font-bold text-black", children: page.pageNumber * 2 }) })
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "absolute bottom-6 left-6 flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronLeft, { size: 16 }),
                                " Turn Back"
                              ] })
                            ]
                          }
                        )
                      ]
                    },
                    index
                  );
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "div",
                  {
                    className: "absolute inset-0 w-full h-full bg-[#fdfbf7] rounded-r-md rounded-l-sm shadow-xl border border-neutral-200",
                    style: { transform: "translateZ(-1px)", zIndex: -1 },
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "absolute inset-0 p-8 flex flex-col items-center justify-center text-center opacity-40", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "font-serif text-neutral-500 italic", children: "The End" }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                        "button",
                        {
                          onClick: restartBook,
                          className: "mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors text-sm text-neutral-600 cursor-pointer",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.RefreshCcw, { size: 14 }),
                            " Read Again"
                          ]
                        }
                      )
                    ] })
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_framer_motion.motion.button,
          {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.8 },
            onClick: handleCloseBook,
            className: "absolute top-8 right-8 p-2 rounded-full bg-white/50 dark:bg-neutral-800/50 hover:bg-white dark:hover:bg-neutral-800 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 backdrop-blur-sm text-neutral-800 dark:text-neutral-100 z-[1000] transition-all hover:scale-110 shadow-sm hover:shadow-xl",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { size: 24 })
          }
        ) }) }),
        !isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_framer_motion.motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 1, duration: 1 },
            className: "absolute bottom-4 text-neutral-500 dark:text-neutral-400 text-sm font-medium tracking-widest uppercase cursor-pointer z-50 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors",
            onClick: handleOpenBook,
            children: "Click to Open"
          }
        )
      ]
    }
  );
}
function JournalBook({
  entries,
  chronological = true,
  ...bookProps
}) {
  let pages = [];
  const orderedEntries = chronological ? [...entries].reverse() : entries;
  if (orderedEntries.length === 0) {
    pages = [{
      pageNumber: 1,
      content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "italic opacity-50 font-serif text-center mt-10", children: "This journal is completely empty." }),
      backContent: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {})
    }];
  } else {
    pages = orderedEntries.map((entry, index) => {
      const dateObj = new Date(entry.created_at);
      const dateString = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      return {
        pageNumber: index + 1,
        // Right side: Content
        content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col h-full min-h-full", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 whitespace-pre-wrap text-neutral-800 leading-relaxed font-serif text-2xl", children: entry.content }) }),
        // Left side: Date, Mood, Location
        backContent: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col h-full justify-center items-center text-center px-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-8 opacity-60", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "font-serif text-3xl italic tracking-wider mb-2", children: dateString }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-[1px] bg-neutral-400 mx-auto" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-4 font-mono text-sm tracking-widest uppercase opacity-80", children: [
            entry.mood && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-neutral-400 block mb-1 text-[10px]", children: "Mood" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-neutral-800", children: entry.mood })
            ] }),
            entry.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-neutral-400 block mb-1 text-[10px]", children: "Location" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-neutral-800", children: entry.location })
            ] })
          ] })
        ] })
      };
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractiveBook, { pages, ...bookProps });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JournalBook
});
