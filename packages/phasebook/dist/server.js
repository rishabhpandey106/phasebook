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

// src/server.tsx
var server_exports = {};
__export(server_exports, {
  HyperspaceJournal: () => HyperspaceJournal
});
module.exports = __toCommonJS(server_exports);
var import_index = require("./index");
var import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_index.JournalBook,
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HyperspaceJournal
});
