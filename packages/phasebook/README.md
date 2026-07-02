# Phasebook

Phasebook is a lightweight, hardware-accelerated 3D interactive book component for React and Next.js. It features 60FPS WebGL-style CSS 3D transforms, providing realistic page turns and physics out of the box.

## Installation

```bash
npm install phasebook
```

*Note: Phasebook requires `framer-motion` and `lucide-react` as peer dependencies.*

```bash
npm install framer-motion lucide-react
```

## Usage

Phasebook is designed to be completely flexible. You can use it as a dumb UI component passing any raw content you'd like, or use the pre-built `JournalBook` for structured journal entries.

### Basic Implementation

```tsx
import { InteractiveBook } from 'phasebook';
import 'phasebook/styles.css';

export default function MyBook() {
  const pages = [
    {
      pageNumber: 1,
      title: "Chapter 1",
      content: <p>It was a dark and stormy night...</p>,
    },
    {
      pageNumber: 2,
      title: "Chapter 2",
      content: <p>The plot thickens.</p>,
    }
  ];

  return (
    <InteractiveBook 
      pages={pages}
      bookTitle="My Great Novel"
      bookAuthor="John Doe"
      coverImage="https://example.com/cover.jpg"
    />
  );
}
```

### The JournalBook

If you are building a journaling application, you can use the specialized `JournalBook` component which automatically handles date formatting, mood, and location tags.

```tsx
import { JournalBook } from 'phasebook';
import 'phasebook/styles.css';

const entries = [
  {
    content: "Today was a good day.",
    mood: "HAPPY",
    location: "Home",
    created_at: new Date().toISOString()
  }
];

export default function MyJournal() {
  return (
    <JournalBook 
      entries={entries}
      bookTitle="My Personal Logs"
      bookAuthor="Admin"
      coverImage="https://example.com/cover.jpg"
      chronological={true}
    />
  );
}
```

## Features
- **Fully Responsive**: Scales automatically to fit mobile and desktop viewports using dynamic CSS clamps.
- **Hardware Accelerated**: Uses `preserve-3d` and pure CSS transforms for perfectly smooth animations.
- **Interactive**: Users can click to turn pages, drag, or use keyboard arrows to navigate.
- **Tailwind Ready**: Ships with its own isolated styles but can be overridden easily.

## License
MIT
