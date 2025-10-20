import { useState, useEffect } from "react";
import { useSaveFile } from "../hooks/useSaveFile";

import type { TabId } from "./features/TabBar/tabs";

import { AppContainer } from "./features/AppContainer";

import { Header } from "./features/Header";
import { FileUpload } from "./features/FileUpload";
import { DisplayControls, type ActFilter } from "./features/DisplayControls";

import { Separator } from "./ui/Separator";

import { TotalProgress } from "./features/TotalProgress";
import { TabBar } from "./features/TabBar";
import { TabContent } from "./features/TabContent";

import { Footer } from "./features/Footer";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("Stats");
  const [showSpoilers, setShowSpoilers] = useState(false);
  const [showUnlocked, setShowUnlocked] = useState(false);
  const [inShowEverythingMode, setInShowEverythingMode] = useState(false);
  const [actFilter, setActFilter] = useState<ActFilter>(new Set([1, 2, 3]));

  const saveFileObj = useSaveFile();

  const hasRealSaveFile = Boolean(
    saveFileObj.state.fileName && saveFileObj.state.isSavefileDecrypted && !saveFileObj.state.errorMessage
  );

  // Reset inShowEverythingMode when a save file is loaded
  useEffect(() => {
    if (hasRealSaveFile) {
      setInShowEverythingMode(false);
    }
  }, [hasRealSaveFile]);

  let effectiveSaveFileObj = saveFileObj;
  if (!hasRealSaveFile && inShowEverythingMode) {
    // When in "show everything" mode, provide empty parsedJson to display all content
    const effectiveSaveFileState = {
      ...saveFileObj.state,
      isSavefileDecrypted: true,
      parsedJson: {},
    };
    effectiveSaveFileObj = { ...saveFileObj, state: effectiveSaveFileState };
  }

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

      <FileUpload saveFileObj={effectiveSaveFileObj} onCopyPath={handleCopyPath} />
      <DisplayControls
        hasRealSaveFile={hasRealSaveFile}
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

      <TotalProgress saveFileObj={effectiveSaveFileObj} />
      <TabBar
        activeTab={activeTab}
        onSelect={handleTabSelect}
        saveFileObj={effectiveSaveFileObj}
        inShowEverythingMode={inShowEverythingMode}
      />

      <Separator />

      <TabContent
        activeTab={activeTab}
        saveFileObj={effectiveSaveFileObj}
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
