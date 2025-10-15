import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

import type { TabRenderProps } from "./types";

function KeyboardButton({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 mx-0.5 bg-white border border-gray-200 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)] rounded-md">
      {children}
    </kbd>
  );
}

export function JsonEditorTab({ jsonText, setJsonText, saveEncrypted, savePlain }: TabRenderProps) {
  const [isValidJson, setIsValidJson] = useState(true);

  // Validate JSON on initial load
  useEffect(() => {
    try {
      JSON.parse(jsonText);
      setIsValidJson(true);
    } catch {
      setIsValidJson(false);
    }
  }, [jsonText]);

  const handleChange = (value: string) => {
    // Validate JSON
    try {
      JSON.parse(value);
      setIsValidJson(true);
    } catch {
      setIsValidJson(false);
    }
    setJsonText(value);
  };

  return (
    <div className="text-white">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2 text-blue-200">Save Editor</h2>
        <p className="text-sm text-gray-300">
          View and/or edit the uploaded savefile in JSON format. Use <KeyboardButton>Ctrl</KeyboardButton>
          <span className="text-gray-400 mx-1">or</span>
          <KeyboardButton>⌘</KeyboardButton>
          <span className="text-gray-400 mx-1">+</span>
          <KeyboardButton>F</KeyboardButton> to search within the editor.
        </p>
      </div>

      <div className="flex justify-end mb-1">
        <span
          className={`inline-flex items-center justify-center text-xs px-2 py-0.5 rounded-lg ${
            isValidJson ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {isValidJson ? "✓ Valid JSON" : "✗ Invalid JSON"}
        </span>
      </div>

      <div className="border border-gray-600 rounded overflow-hidden">
        <Editor
          height="400px"
          defaultLanguage="json"
          value={jsonText}
          onChange={value => handleChange(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: "on",
            renderWhitespace: "selection",
            automaticLayout: true,
            formatOnPaste: true,
            formatOnType: false, // Disable auto-formatting while typing for performance
            wordWrap: "on",
            tabSize: 2,
            insertSpaces: true,
            bracketPairColorization: { enabled: true },
            folding: true,
            foldingHighlight: true,
            showFoldingControls: "always",
            matchBrackets: "always",
            contextmenu: true,
            find: {
              addExtraSpaceOnTop: false,
              autoFindInSelection: "never",
              seedSearchStringFromSelection: "always",
            },
          }}
        />
      </div>

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
