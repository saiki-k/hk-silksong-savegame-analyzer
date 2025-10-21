import { useState, useEffect } from "react";
import { EditorContainer } from "./EditorContainer.tsx";
import { EditorToggler } from "./EditorToggler.tsx";
import type { SaveFileObj } from "../../../hooks/useSaveFile.ts";

interface SaveEditorProps {
  saveFileObj: SaveFileObj;
  hasUploadedSaveFile: boolean;
}

export function SaveEditor({ saveFileObj, hasUploadedSaveFile }: SaveEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!hasUploadedSaveFile) {
      setIsExpanded(false);
    }
  }, [hasUploadedSaveFile]);

  return (
    <div className="mb-0">
      <EditorToggler
        disabled={!hasUploadedSaveFile}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />
      {hasUploadedSaveFile ? (
        <EditorContainer saveFileObj={saveFileObj} isExpanded={isExpanded} hasUploadedSaveFile={hasUploadedSaveFile} />
      ) : null}
    </div>
  );
}
