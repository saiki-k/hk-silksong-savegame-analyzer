import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { SaveFileObj } from "../../../hooks/useSaveFile";

interface FileUploadProps {
  saveFileObj: SaveFileObj;
}

export function FileUpload({ saveFileObj }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { fileName, errorMessage, isSaveFileDecrypted } = saveFileObj.state;
  const hasError = !!errorMessage;
  const hasSuccess = fileName && isSaveFileDecrypted && !hasError;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) saveFileObj.handlers.handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
    saveFileObj.handlers.handleDrop(e);
  };

  const renderContent = () => {
    if (hasError) {
      return (
        <div className="space-y-1.5">
          <div className="text-3xl opacity-50">⚠️</div>
          <p className="text-sm font-semibold text-red-400 mb-0">{fileName || "Error loading file"}</p>
          <p className="text-xs text-red-300/80">{errorMessage} Click to select a different file.</p>
        </div>
      );
    }

    if (hasSuccess) {
      return (
        <div className="space-y-1.5">
          <div className="text-3xl opacity-50">📄</div>
          <p className="text-sm font-semibold text-green-400 mb-0">{fileName}</p>
          <p className="text-xs text-gray-400">Awesome, analyze away!</p>
        </div>
      );
    }

    return (
      <div className="space-y-1.5">
        <div className="text-3xl opacity-50">📁</div>
        <p className="text-sm font-semibold text-red-400 mb-0">where.dat</p>
        <p className="text-xs text-gray-400">Drag and drop your save file here, or click to browse.</p>
      </div>
    );
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      className={`
          relative overflow-hidden
          bg-gradient-to-br from-gray-800/60 to-gray-800/40 
          border-2 border-dashed p-2 mb-0
          text-center cursor-pointer 
          transition-all duration-300 
          hover:from-gray-700/60 hover:to-gray-700/40 
          hover:border-blue-500/50 hover:shadow-lg
          ${isDragging && "border-blue-500 from-blue-900/40 to-blue-800/30 scale-[1.01]"}
          ${hasSuccess && "border-green-500/50 from-green-900/20 to-gray-800/40"}
          ${hasError && "border-red-500/50 from-red-900/20 to-gray-800/40"}
          ${!isDragging && !hasSuccess && !hasError && "border-gray-600/50"}
        `}
    >
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 min-h-[60px] flex flex-col items-center justify-center">{renderContent()}</div>

      <input ref={inputRef} type="file" className="hidden" onChange={handleChange} />
    </div>
  );
}
