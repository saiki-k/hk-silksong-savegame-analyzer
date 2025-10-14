import { useMemo, useState } from "react";

import type { TabRenderProps } from "./types";

export function JsonEditorTab({ jsonText, setJsonText, saveEncrypted, savePlain }: TabRenderProps) {
  const [search, setSearch] = useState("");

  const filteredJson = useMemo(() => {
    if (!search) return jsonText;
    const lower = search.toLowerCase();
    return jsonText
      .split("\n")
      .filter(line => line.toLowerCase().includes(lower))
      .join("\n");
  }, [jsonText, search]);

  const handleChange = (value: string) => {
    if (!search) {
      setJsonText(value);
      return;
    }

    const originalLines = jsonText.split("\n");
    const lower = search.toLowerCase();
    const editedLines = value.split("\n");
    let filteredIndex = 0;

    const mergedLines = originalLines.map(line => {
      if (!line.toLowerCase().includes(lower)) return line;
      const replacement = editedLines[filteredIndex];
      filteredIndex += 1;
      return typeof replacement === "string" ? replacement : line;
    });

    setJsonText(mergedLines.join("\n"));
  };

  return (
    <div className="text-white">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2 text-blue-200">Save Editor</h2>
        <p className="text-sm text-gray-300 mb-2">View and/or edit the uploaded savefile in JSON format.</p>
      </div>
      <input
        type="text"
        placeholder="Search JSON..."
        value={search}
        onChange={event => setSearch(event.target.value)}
        className="w-full p-2 rounded bg-[#24344d] text-white border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        className="w-full h-96 p-3 rounded bg-[#0d1b2a] text-white font-mono overflow-auto resize-none mt-2"
        value={filteredJson}
        onChange={event => handleChange(event.target.value)}
        spellCheck={false}
      />
      <div className="flex flex-col md:flex-row gap-2 mt-2">
        <button
          onClick={saveEncrypted}
          className="bg-[#24344d] text-white hover:bg-blue-600 font-semibold py-2 px-4 rounded flex-1"
        >
          Save as (encrypted) .dat
        </button>
        <button
          onClick={savePlain}
          className="bg-[#24344d] text-white hover:bg-blue-600 font-semibold py-2 px-4 rounded flex-1"
        >
          Save as (plain) .json
        </button>
      </div>
    </div>
  );
}
