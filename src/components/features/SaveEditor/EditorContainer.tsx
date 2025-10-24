import { useState, useRef, useEffect, type ReactElement } from "react";
import Editor from "@monaco-editor/react";
import type { SaveFileObj } from "@/hooks";
import { DownloadButton } from "@/components/ui";
import { cn } from "@/utils";

function EditorStatusBar({ isValidJson }: { isValidJson: boolean }) {
  return (
    <div className="mb-0 z-100">
      <div className="bg-gradient-to-tl from-gray-800/40 to-gray-800/20 border-2 border-gray-600/30 px-4 py-2 border-t-0">
        <div className="flex justify-between items-center text-xs text-gray-300 ">
          <p className="-mb-2">
            Use <span className="font-mono">Ctrl</span>
            <span className="text-gray-400 mx-1">+</span>
            <span className="font-mono">F</span>
            <span className="text-gray-400 mx-1">or</span>
            <span className="font-mono">⌘</span>
            <span className="text-gray-400 mx-1">+</span>
            <span className="font-mono">F</span> to search within the editor.
          </p>
          <span
            className={`inline-flex items-center justify-center font-semibold text-[10px] text-white border-2 px-2 py-1 rounded-lg ${
              isValidJson ? "border-emerald-500 bg-emerald-600" : "border-orange-500 bg-orange-600"
            }`}
          >
            {isValidJson ? "✓ Valid JSON" : "✗ Invalid JSON"}
          </span>
        </div>
      </div>
    </div>
  );
}

export function EditorContainer({
  saveFileObj,
  isExpanded,
}: {
  saveFileObj: SaveFileObj;
  isExpanded: boolean;
}): ReactElement {
  const [editorHeight, setEditorHeight] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number>(0);
  const startHeightRef = useRef<number>(0);

  useEffect(() => {
    if (!isDragging) return;

    document.body.style.cursor = "ns-resize";
    document.body.style.userSelect = "none";

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const deltaY = e.clientY - startYRef.current;
      const newHeight = Math.max(200, Math.min(1200, startHeightRef.current + deltaY));
      setEditorHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startYRef.current = e.clientY;
    startHeightRef.current = editorHeight;
  };

  const handleChange = (value: string) => {
    saveFileObj.handlers.setJsonText(value);
  };

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        !isExpanded ? "max-h-0" : "max-h-[1200px]"
      )}
    >
      {/* Fullscreen overlay while dragging to maintain cursor */}
      {isDragging && <div className="fixed inset-0 z-[9999] cursor-ns-resize" style={{ pointerEvents: "all" }} />}

      <EditorStatusBar isValidJson={saveFileObj.state.isValidJson} />

      <div
        className="bg-gradient-to-br from-gray-800/40 to-gray-800/20 border-2 border-gray-600/30 border-t-0 overflow-hidden relative"
        ref={editorRef}
      >
        <Editor
          height={`${editorHeight}px`}
          defaultLanguage="json"
          value={saveFileObj.state.jsonText || ""}
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
            formatOnType: false,
            wordWrap: "on",
            tabSize: 2,
            insertSpaces: true,
            bracketPairColorization: { enabled: true },
            folding: true,
            foldingHighlight: true,
            showFoldingControls: "mouseover",
            matchBrackets: "always",
            contextmenu: true,
            find: {
              addExtraSpaceOnTop: false,
              autoFindInSelection: "never",
              seedSearchStringFromSelection: "always",
            },
          }}
        />

        <div className="p-4 border-t-2 border-gray-600/30">
          <div className="flex flex-col md:flex-row gap-2">
            <DownloadButton onClick={() => saveFileObj.handlers.saveEncrypted()}>
              Download (encrypted) .dat
            </DownloadButton>
            <DownloadButton onClick={() => saveFileObj.handlers.savePlain()}>Download (plain) .json</DownloadButton>
          </div>
        </div>

        <div
          onMouseDown={handleMouseDown}
          className={cn(
            "group absolute bottom-0 left-0 right-0 h-3 transition-all duration-200 select-none cursor-ns-resize hover:bg-gray-700/50 z-10",
            isDragging ? "bg-gray-700/50" : "bg-transparent"
          )}
        >
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
            <div
              className={cn(
                "w-12 h-0.5 bg-gray-600/50 rounded-full transition-all duration-200",
                "group-hover:w-16 group-hover:h-1 group-hover:bg-gray-400/70",
                isDragging && "w-16 h-1 bg-gray-400"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
