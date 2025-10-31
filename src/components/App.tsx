import { useState, useEffect, useMemo } from "react";

import { useSaveFile } from "@/hooks";

import { getNormalizedDictMap, type DictMapWithSaveData } from "@/dictionary";

import { computeDictMapWithSaveData } from "@/utils";

import type { TabId } from "./features/TabBar/tabs";
import type { ActFilter } from "./features/FilterControls";

import { AppContainer } from "./features/AppContainer";

import { Header } from "./features/Header";
import { SaveFileInfo } from "./features/SaveFileInfo";
import { FileUpload } from "./features/FileUpload";
import { FilterControls } from "./features/FilterControls";

import { Separator } from "./ui/Separator";

import { TotalProgress } from "./features/TotalProgress";
import { TabBar } from "./features/TabBar";
import { TabContainer } from "./features/TabContainer";

import { Footer } from "./features/Footer";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("Stats");
  const [inShowEverythingMode, setInShowEverythingMode] = useState(false);
  const [isLoadingDict, setIsLoadingDict] = useState(true);
  const [normalizedDictMap, setNormalizedDictMap] = useState<Awaited<ReturnType<typeof getNormalizedDictMap>> | null>(null);

  const [globalFilters, setGlobalFilters] = useState({
    showSpoilers: false,
    showMissingOnly: true,
    actFilter: new Set([1, 2, 3] as const),
  });
  const [tabFilterMap, setTabFilterMap] = useState(new Map());

  const saveFileObj = useSaveFile();

  const hasUploadedSaveFile = Boolean(saveFileObj.state.fileName && saveFileObj.state.isSaveFileDecrypted);
  const hasUploadedSaveData = Boolean(hasUploadedSaveFile && !saveFileObj.state.errorMessage);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dictMap = await getNormalizedDictMap();
        setNormalizedDictMap(dictMap);
      } finally {
        setIsLoadingDict(false);
      }
    };
    loadDictionary();
  }, []);

  const dictMapWithSaveData = useMemo((): DictMapWithSaveData | null => {
    if (!normalizedDictMap || (!hasUploadedSaveData && !inShowEverythingMode)) {
      return null;
    }

    const parsedJson = !inShowEverythingMode && (saveFileObj.state.parsedJson ?? {});
    return computeDictMapWithSaveData(normalizedDictMap, parsedJson, inShowEverythingMode);
  }, [normalizedDictMap, saveFileObj.state.parsedJson, hasUploadedSaveData, inShowEverythingMode]);

  useEffect(() => {
    // Reset filters when a (new) save file is loaded
    setInShowEverythingMode(false);
    setGlobalFilters({
      showSpoilers: false,
      showMissingOnly: true,
      actFilter: new Set([1, 2, 3] as const),
    });
    setTabFilterMap(new Map());
    setActiveTab("Stats");
  }, [saveFileObj]);

  if (isLoadingDict) {
    return (
      <AppContainer>
        <Header />

        <Separator />
        
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg text-white">Loading...</div>
        </div>
      </AppContainer>
    );
  }

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

  const handleGlobalFilterChange = (filterType: string, value: boolean | ActFilter) => {
    setGlobalFilters(prev => ({ ...prev, [filterType]: value }));

    // Update the specific filterType across all existing tab configurations
    setTabFilterMap(prev => {
      const newMap = new Map(prev);
      for (const [tabId, tabFilters] of newMap) {
        newMap.set(tabId, { ...tabFilters, [filterType]: value });
      }
      return newMap;
    });
  };

  const handleTabFilterChange = (filterType: string, value: boolean | ActFilter) => {
    const currentTabFilters = tabFilterMap.get(activeTab) ?? globalFilters;
    const newTabFilters = { ...currentTabFilters, [filterType]: value };
    setTabFilterMap(prev => new Map(prev.set(activeTab, newTabFilters)));
  };

  return (
    <AppContainer>
      <Header />

      <Separator />

      <SaveFileInfo onCopyPath={handleCopyPath} />
      <FileUpload saveFileObj={saveFileObj} />
      <FilterControls
        hasUploadedSaveFile={hasUploadedSaveFile}
        hasUploadedSaveData={hasUploadedSaveData}
        globalFilters={globalFilters}
        inShowEverythingMode={inShowEverythingMode}
        onGlobalFilterChange={handleGlobalFilterChange}
        onShowEverythingToggle={handleShowEverythingToggle}
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
        inShowEverythingMode={inShowEverythingMode}
        globalFilters={globalFilters}
        tabFilterMap={tabFilterMap}
        onTabFilterChange={handleTabFilterChange}
      />

      <Separator />

      <Footer />
    </AppContainer>
  );
}
