import type { TabContentProps } from "./types";
import { GenericContent } from "./GenericContent";
import { StatsContent } from "./Stats";
import { HuntersJournalContent } from "./HuntersJournal";
import type { TabId } from "../TabBar/tabs";

import { NoSaveFileLoaded } from "./shared";

export function TabContent(props: TabContentProps) {
  const { activeTab, hasUploadedSaveFile, saveFileObj, showUnlocked, showSpoilers, inShowEverythingMode, actFilter } =
    props;

  if (!activeTab || !saveFileObj) {
    return null;
  }

  if (!hasUploadedSaveFile && !inShowEverythingMode) {
    return <NoSaveFileLoaded />;
  }

  // Don't allow "Show Everything" mode for Stats tab
  if (!hasUploadedSaveFile && inShowEverythingMode && activeTab === "Stats") {
    return <NoSaveFileLoaded />;
  }

  if (!saveFileObj.state.isValidJson) {
    return (
      <div className="text-white text-center text-lg">
        Corrupted save data (invalid JSON). Fix it in the editor, maybe?
      </div>
    );
  }

  const tabContentProps: TabContentProps = {
    activeTab,
    hasUploadedSaveFile,
    saveFileObj,
    tabLabel: activeTab,
    showUnlocked,
    showSpoilers,
    inShowEverythingMode,
    actFilter,
  };

  const getTabContent = (activeTab: TabId) => {
    switch (activeTab) {
      case "Stats":
        return <StatsContent {...tabContentProps} tabLabel="At a glance..." />;
      case "Hunter's Journal":
        return <HuntersJournalContent {...tabContentProps} />;
      default:
        return <GenericContent {...tabContentProps} />;
    }
  };

  return <div className="text-white"> {getTabContent(activeTab)} </div>;
}
