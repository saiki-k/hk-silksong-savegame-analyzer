import { useMemo } from "react";
import type { TabId } from "./tabs";
import { TAB_CONFIG } from "./tabs";
import { TabButton } from "./TabButton";
import type { SaveFileObj } from "../../../hooks/useSaveFile";
import { formatPercent, getGenericProgress, getHuntersJournalProgress } from "../../../utils";

interface TabBarProps {
  activeTab: TabId;
  onSelect: (tab: TabId) => void;
  saveFileObj: SaveFileObj;
  inShowEverythingMode?: boolean;
}

export interface TabProgressInfo {
  isComplete: boolean;
  displayText: string;
  encounteredCount?: number;
  completedCount?: number;
  encounteredOnlyDisplayText?: string;
}

export function TabBar({ activeTab, onSelect, saveFileObj, inShowEverythingMode }: TabBarProps) {
  const { parsedJson, isSaveFileDecrypted, jsonText } = saveFileObj.state;

  // Calculate progress for all tabs once at TabBar level
  const tabProgressMap = useMemo(() => {
    if (!isSaveFileDecrypted || !parsedJson) return new Map<TabId, TabProgressInfo>();

    const progressMap = new Map<TabId, TabProgressInfo>();

    TAB_CONFIG.forEach(tab => {
      if (!tab.hasProgress) return;

      const isHuntersJournal = tab.tabId === "Hunter's Journal";
      const progressData = isHuntersJournal
        ? getHuntersJournalProgress({
            parsedJson,
            isSaveFileDecrypted,
            inShowEverythingMode: inShowEverythingMode ?? false,
          })
        : getGenericProgress({
            parsedJson,
            isSaveFileDecrypted,
            inShowEverythingMode: inShowEverythingMode ?? false,
            tabLabel: tab.tabId,
            isPercentProgression: tab.isPercentProgression ?? false,
          });

      if (!progressData) return;

      const { progressType } = progressData;
      let isComplete = false;
      let displayText = "";
      let encounteredCount: number | undefined;
      let completedCount: number | undefined;
      let encounteredOnlyDisplayText = "";

      if (progressType === "Count Progression") {
        const { current, total } = progressData;
        isComplete = current === total;
        displayText = inShowEverythingMode ? `${total}` : `${current} / ${total}`;
        completedCount = current;
      } else if (progressType === "Percent Progression") {
        const { current, total } = progressData;
        isComplete = current === total;
        displayText = inShowEverythingMode
          ? formatPercent(total)
          : `${formatPercent(current)} / ${formatPercent(total)}`;
        completedCount = current;
      } else if (progressType === "Hunter's Journal Progression") {
        const { completed, total, encountered } = progressData;
        isComplete = completed === total;
        displayText = inShowEverythingMode ? `${total}` : `${completed} / ${total}`;
        encounteredCount = encountered;
        completedCount = completed;
        encounteredOnlyDisplayText = encountered - completed ? `+${encountered - completed} Encountered` : "";
      }

      progressMap.set(tab.tabId, {
        isComplete,
        displayText,
        encounteredCount,
        completedCount,
        encounteredOnlyDisplayText,
      });
    });

    return progressMap;
  }, [jsonText, isSaveFileDecrypted, inShowEverythingMode]);

  return (
    <div className="flex justify-between mt-4 mb-2 flex-wrap gap-2">
      {TAB_CONFIG.filter(tab => !tab.hideButton).map(tab => (
        <TabButton
          key={tab.tabId}
          tab={tab}
          isActive={tab.tabId === activeTab}
          onSelect={onSelect}
          saveFileObj={saveFileObj}
          progressInfo={tabProgressMap.get(tab.tabId)}
        />
      ))}
    </div>
  );
}
