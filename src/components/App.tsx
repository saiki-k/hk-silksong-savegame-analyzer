import { useState, useEffect } from "react";
import { useSaveFile } from "../hooks/useSaveFile";

import type { TabId } from "./features/TabBar/tabs";

import { AppContainer } from "./features/AppContainer";

import { Header } from "./features/Header";
import { SaveFileInfo } from "./features/SaveFileInfo";
import { FileUpload } from "./features/FileUpload";
import { SaveEditor } from "./features/SaveEditor";
import { FilterControls, type ActFilter } from "./features/FilterControls";

import { Separator } from "./ui/Separator";

import { TotalProgress } from "./features/TotalProgress";
import { TabBar } from "./features/TabBar";
import { TabContent } from "./features/TabContent";

import { Footer } from "./features/Footer";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("Stats");
  const [hasUploadedSaveFile, setHasUploadedSaveFile] = useState(false);
  const [showSpoilers, setShowSpoilers] = useState(false);
  const [showUnlocked, setShowUnlocked] = useState(false);
  const [inShowEverythingMode, setInShowEverythingMode] = useState(false);
  const [actFilter, setActFilter] = useState<ActFilter>(new Set([1, 2, 3]));

  const saveFileObjFromHook = useSaveFile();
  const [saveFileObj, setSaveFileObj] = useState(saveFileObjFromHook);

  useEffect(() => {
    setSaveFileObj(saveFileObjFromHook);

    const {
      state: { fileName, isSaveFileDecrypted, errorMessage },
    } = saveFileObjFromHook;
    const hasUploadedSaveFile = Boolean(fileName && isSaveFileDecrypted && !errorMessage);
    setHasUploadedSaveFile(hasUploadedSaveFile);
  }, [saveFileObjFromHook.state.jsonText]);

  useEffect(() => {
    // Reset inShowEverythingMode when a save file is loaded
    if (hasUploadedSaveFile) {
      setInShowEverythingMode(false);
    }

    // When in "show everything" mode, provide empty parsedJson to display all content
    if (!hasUploadedSaveFile && inShowEverythingMode) {
      setSaveFileObj(prevSaveFileObj => ({
        ...prevSaveFileObj,
        state: {
          ...prevSaveFileObj.state,
          parsedJson: {},
          jsonText: "{}",
        },
      }));
    }

    if (!hasUploadedSaveFile && !inShowEverythingMode) {
      setSaveFileObj(saveFileObjFromHook);
    }
  }, [hasUploadedSaveFile, inShowEverythingMode]);

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path);
  };

  const handleTabSelect = (tab: TabId) => {
    // Toggle: If the active tab is clicked, deactivate it and return to Stats
    if (tab === activeTab) {
      setActiveTab("Stats");
    } else {
      setActiveTab(tab);
    }
  };

  const handleShowEverythingToggle = () => {
    setInShowEverythingMode(!inShowEverythingMode);
  };

  return (
    <AppContainer>
      <Header />

      <Separator />

      <SaveFileInfo onCopyPath={handleCopyPath} />
      <SaveEditor saveFileObj={saveFileObj} hasUploadedSaveFile={hasUploadedSaveFile} />
      <FileUpload saveFileObj={saveFileObj} />
      <FilterControls
        hasUploadedSaveFile={hasUploadedSaveFile}
        showSpoilers={showSpoilers}
        showUnlocked={showUnlocked}
        inShowEverythingMode={inShowEverythingMode}
        actFilter={actFilter}
        onShowSpoilersChange={setShowSpoilers}
        onShowUnlockedChange={setShowUnlocked}
        onShowEverythingToggle={handleShowEverythingToggle}
        onActFilterChange={setActFilter}
      />

      <Separator />

      <TotalProgress saveFileObj={saveFileObj} hasUploadedSaveFile={hasUploadedSaveFile} />
      <TabBar
        activeTab={activeTab}
        onSelect={handleTabSelect}
        saveFileObj={saveFileObj}
        inShowEverythingMode={inShowEverythingMode}
        hasUploadedSaveFile={hasUploadedSaveFile}
      />

      <Separator />

      <TabContent
        activeTab={activeTab}
        saveFileObj={saveFileObj}
        hasUploadedSaveFile={hasUploadedSaveFile}
        showUnlocked={showUnlocked}
        showSpoilers={showSpoilers}
        inShowEverythingMode={inShowEverythingMode}
        actFilter={actFilter}
      />

      <Separator />

      <Footer />
    </AppContainer>
  );
}
