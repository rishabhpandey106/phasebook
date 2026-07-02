// src/server.tsx
import { JournalBook } from "./index";
import { jsx } from "react/jsx-runtime";
async function HyperspaceJournal({
  apiKey,
  baseUrl = "http://127.0.0.1:8787",
  coverImage,
  bookTitle,
  bookAuthor,
  className,
  width,
  height
}) {
  let entries = [];
  try {
    const response = await fetch(`${baseUrl}/api/public/sdk/entries`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      cache: "no-store"
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch journal entries: ${response.statusText}`);
    }
    const data = await response.json();
    entries = data.entries || [];
  } catch (error) {
    console.error("[HyperspaceJournal] Error:", error);
    entries = [{
      content: "Error loading journal entries. Please check your API key.",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      mood: "Error",
      location: "Connection lost"
    }];
  }
  return /* @__PURE__ */ jsx(
    JournalBook,
    {
      entries,
      coverImage,
      bookTitle,
      bookAuthor,
      className,
      width,
      height
    }
  );
}
export {
  HyperspaceJournal
};
