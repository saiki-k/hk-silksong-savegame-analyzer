import { useState, useEffect, useMemo } from "react";

import { useSaveFile } from "@/hooks";

import { NORMALISED_DICT_MAP, type DictMapWithSaveData } from "@/dictionary";

import { computeDictMapWithSaveData } from "@/utils";

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
import { TabContainer } from "./features/TabContainer";

import { Footer } from "./features/Footer";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("Stats");
  const [showSpoilers, setShowSpoilers] = useState(false);
  const [showMissingOnly, setShowMissingOnly] = useState(true);
  const [inShowEverythingMode, setInShowEverythingMode] = useState(false);
  const [actFilter, setActFilter] = useState<ActFilter>(new Set([1, 2, 3]));

  const saveFileObj = useSaveFile();

  const hasUploadedSaveFile = Boolean(saveFileObj.state.fileName && saveFileObj.state.isSaveFileDecrypted);
  const hasUploadedSaveData = Boolean(hasUploadedSaveFile && !saveFileObj.state.errorMessage);

  const dictMapWithSaveData = useMemo((): DictMapWithSaveData | null => {
    if (!hasUploadedSaveData && !inShowEverythingMode) {
      return null;
    }

    const parsedJson = !inShowEverythingMode && (saveFileObj.state.parsedJson ?? {});
    return computeDictMapWithSaveData(NORMALISED_DICT_MAP, parsedJson, inShowEverythingMode);
  }, [saveFileObj.state.parsedJson, hasUploadedSaveData, inShowEverythingMode]);

  useEffect(() => {
    // Reset filters when a (new) save file is loaded
    if (hasUploadedSaveFile) {
      setInShowEverythingMode(false);
      setShowSpoilers(false);
      setShowMissingOnly(true);
      setActFilter(new Set([1, 2, 3]));
      setActiveTab("Stats");
    }
  }, [hasUploadedSaveFile, saveFileObj.state.jsonText]);

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path);
  };

  const handleTabSelect = (tab: TabId) => {
    // If the active tab is clicked, deactivate it and return to Stats
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
        hasUploadedSaveData={hasUploadedSaveData}
        showSpoilers={showSpoilers}
        showMissingOnly={showMissingOnly}
        inShowEverythingMode={inShowEverythingMode}
        actFilter={actFilter}
        onShowSpoilersChange={setShowSpoilers}
        onShowMissingOnlyChange={setShowMissingOnly}
        onShowEverythingToggle={handleShowEverythingToggle}
        onActFilterChange={setActFilter}
      />

      <Separator />

      <TotalProgress dictMapWithSaveData={dictMapWithSaveData} inShowEverythingMode={inShowEverythingMode} />
      <TabBar
        activeTab={activeTab}
        onSelect={handleTabSelect}
        dictMapWithSaveData={dictMapWithSaveData}
        inShowEverythingMode={inShowEverythingMode}
        hasUploadedSaveData={hasUploadedSaveData}
      />

      <Separator />

      <TabContainer
        activeTab={activeTab}
        dictMapWithSaveData={dictMapWithSaveData}
        hasUploadedSaveFile={hasUploadedSaveFile}
        hasUploadedSaveData={hasUploadedSaveData}
        showMissingOnly={showMissingOnly}
        inShowEverythingMode={inShowEverythingMode}
        showSpoilers={showSpoilers}
        actFilter={actFilter}
      />

      <Separator />

      <Footer />
    </AppContainer>
  );
}
