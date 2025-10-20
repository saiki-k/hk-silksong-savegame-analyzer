import type { TabContentProps } from "./types";
import { GenericContent } from "./GenericContent";
import { StatsContent } from "./Stats";
import { HuntersJournalContent } from "./HuntersJournal";
import { SaveEditor } from "./SaveEditor";
import type { TabId } from "../TabBar/tabs";

import { NoSavefileLoaded } from "./shared";

export function TabContent(props: TabContentProps) {
  const { activeTab, saveFileObj, showUnlocked, showSpoilers, inShowEverythingMode, actFilter } = props;

  if (!activeTab || !saveFileObj) {
    return null;
  }

  if (!saveFileObj.state.isSavefileDecrypted) {
    return <NoSavefileLoaded />;
  }

  const hasRealSaveFile = Boolean(
    saveFileObj.state.fileName && saveFileObj.state.isSavefileDecrypted && !saveFileObj.state.errorMessage
  );
  // Don't allow "Show Everything" mode for Stats and Save Editor
  if (!hasRealSaveFile && inShowEverythingMode && (activeTab === "Stats" || activeTab === "Save Editor")) {
    return <NoSavefileLoaded />;
  }

  if (activeTab !== "Save Editor" && !saveFileObj.state.isValidJson) {
    return (
      <div className="text-white text-center text-lg">
        Corrupted save data (invalid JSON). Fix it in the editor, maybe?
      </div>
    );
  }

  const tabContentProps: TabContentProps = {
    activeTab,
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
        return <StatsContent tabLabel="At a glance..." {...tabContentProps} />;
      case "Hunter's Journal":
        return <HuntersJournalContent {...tabContentProps} />;
      case "Save Editor":
        return <SaveEditor {...tabContentProps} />;
      default:
        return <GenericContent {...tabContentProps} />;
    }
  };

  return <div className="text-white"> {getTabContent(activeTab)} </div>;
}
