import { useState, useRef, useEffect, type ReactElement } from "react";
import Editor from "@monaco-editor/react";
import { type TabContentProps } from "./types";
import { CategoryHeader } from "./shared";
import { Button } from "../../ui/Button";
import { cn } from "../../../utils/classNames";

interface DownloadButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const downloadButtonStyles = {
  base: "bg-gray-700/30 text-gray-400 border border-gray-600/30 hover:border-gray-500/50 hover:text-gray-300 font-semibold py-2 px-4 rounded transition-all duration-200 flex-1 cursor-pointer",
} as const;

function DownloadButton({ children, onClick, className, ...props }: DownloadButtonProps) {
  return (
    <Button onClick={onClick} className={cn(downloadButtonStyles.base, className)} {...props}>
      {children}
    </Button>
  );
}

function KeyboardButton({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="min-h-7.5 inline-flex justify-center items-center py-1 px-1.5 mx-0.5 bg-white border border-gray-200 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)] rounded-md">
      {children}
    </kbd>
  );
}

function SaveEditorStatusBar({ isValidJson }: { isValidJson: boolean }) {
  return (
    <div className="mb-0">
      <div className="bg-gray-800/50 border border-gray-600 px-2 py-2 border-t-0">
        <div className="flex justify-end items-center">
          <span
            className={`inline-flex items-center justify-center text-xs px-2 py-0.5 rounded-lg ${
              isValidJson ? "bg-green-600 text-white" : "bg-red-600 text-white"
            }`}
          >
            {isValidJson ? "✓ Valid JSON" : "✗ Invalid JSON"}
          </span>
        </div>
      </div>
    </div>
  );
}

export function SaveEditor({ saveFileObj }: TabContentProps): ReactElement {
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

  if (!saveFileObj) {
    return <div className="text-white">No savefile loaded.</div>;
  }

  const handleChange = (value: string) => {
    saveFileObj.handlers.setJsonText(value);
  };

  return (
    <>
      {/* Fullscreen overlay while dragging to maintain cursor */}
      {isDragging && (
        <div className="fixed inset-0 z-[9999] cursor-ns-resize" style={{ pointerEvents: "all" }} />
      )}

      <CategoryHeader
        title="Save Editor"
        description={
          <p>
            View and edit your save file in JSON format. Use <KeyboardButton>Ctrl</KeyboardButton>
            <span className="text-gray-400 mx-1">or</span>
            <KeyboardButton>⌘</KeyboardButton>
            <span className="text-gray-400 mx-1">+</span>
            <KeyboardButton>F</KeyboardButton> to search within the editor.
          </p>
        }
      />

      <SaveEditorStatusBar isValidJson={saveFileObj.state.isValidJson} />

      <div className="bg-gray-900/50 border border-gray-600 rounded-b-lg border-t-0 overflow-hidden relative" ref={editorRef}>
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

        <div className="p-4 border-t border-gray-600">
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
    </>
  );
}
