import { useCallback, useMemo, useState } from "react";
import type { DragEvent } from "react";

import { decodeSave, encodeSave, downloadFile } from "../services/decryptor";

export interface SaveFileObj {
  state: {
    fileName: string;
    isSavefileDecrypted: boolean;
    jsonText: string;
    parsedJson: unknown;
    isValidJson: boolean;
    errorMessage: string;
  };
  handlers: {
    setJsonText: (text: string) => void;
    handleFile: (file: File) => void;
    handleDrop: (event: DragEvent<HTMLDivElement>) => void;
    handleDragOver: (event: DragEvent<HTMLDivElement>) => void;
    saveEncrypted: () => void;
    savePlain: () => void;
  };
}

export function isValidSaveData(parsedJson: object): boolean {
  return "playerData" in parsedJson && "silk" in ((parsedJson.playerData ?? {}) as object);
}

export function useSaveFile() {
  const [fileName, setFileName] = useState("");
  const [isSavefileDecrypted, setIsSavefileDecrypted] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const parsedJson = useMemo(() => {
    if (!jsonText) return null;
    try {
      return JSON.parse(jsonText);
    } catch {
      return null;
    }
  }, [jsonText]);

  const isValidJson = useMemo(() => {
    if (!jsonText) return true; // Empty text is considered valid
    try {
      JSON.parse(jsonText);
      setErrorMessage("");
      return true;
    } catch {
      setErrorMessage("Invalid JSON format. Please check your syntax.");
      return false;
    }
  }, [jsonText]);

  const handleFile = useCallback((file: File) => {
    setFileName(file.name);
    setErrorMessage("");
    const reader = new FileReader();
    reader.onload = e => {
      if (!e.target?.result) return;
      setIsSavefileDecrypted(false);
      setJsonText("");
      try {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const json = decodeSave(data);
        const parsedJson = JSON.parse(json);

        if (!isValidSaveData(parsedJson)) {
          throw new Error("This does not appear to be a Silksong savefile.");
        }

        const pretty = JSON.stringify(parsedJson, null, 2);
        setJsonText(pretty);
        setIsSavefileDecrypted(true);
        setErrorMessage("");
      } catch (error: unknown) {
        if (error instanceof Error && error.message.includes("Silksong")) {
          setErrorMessage(error.message);
          return;
        }
        const errorMsg = "This file is in an unsupported format.";
        setErrorMessage(errorMsg);
        console.error(error);
      }
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const saveEncrypted = useCallback(() => {
    const encoded = encodeSave(jsonText);
    downloadFile(encoded, fileName || "save.dat");
  }, [jsonText, fileName]);

  const savePlain = useCallback(() => {
    const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
    downloadFile(jsonText, `${nameWithoutExtension || "save"}.json`);
  }, [jsonText, fileName]);

  return {
    state: {
      fileName,
      isSavefileDecrypted,
      jsonText,
      parsedJson,
      isValidJson,
      errorMessage,
    },
    handlers: {
      setJsonText,
      handleFile,
      handleDrop,
      handleDragOver,
      saveEncrypted,
      savePlain,
    },
  };
}
