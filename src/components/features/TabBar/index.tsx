import { useMemo } from "react";
import { type TabId, TAB_CONFIG, type TabGroup } from "./tabs";
import { TabButton } from "./TabButton";
import { formatPercent } from "@/utils";
import { type DictMapWithSaveData } from "@/dictionary";

interface TabBarProps {
  activeTab: TabId;
  onSelect: (tab: TabId) => void;
  dictMapWithSaveData: DictMapWithSaveData | null;
  inShowEverythingMode: boolean;
  hasUploadedSaveData: boolean;
}

export interface TabProgressInfo {
  isProgressComplete: boolean;
  progressText: string;
  encounteredCount?: number;
  completedCount?: number;
  encounteredProgressText?: string;
  sectionNames?: string[];
}

export function TabBar({
  activeTab,
  onSelect,
  dictMapWithSaveData,
  inShowEverythingMode,
  hasUploadedSaveData,
}: TabBarProps) {
  // Calculate progress for all tabs once at TabBar level
  const tabProgressMap = useMemo(() => {
    if (!inShowEverythingMode && !dictMapWithSaveData) return new Map<TabId, TabProgressInfo>();

    const progressMap = new Map<TabId, TabProgressInfo>();

    TAB_CONFIG.forEach(tab => {
      if (!tab.hasProgress) return;

      const category = dictMapWithSaveData?.allItems[tab.tabId];
      if (!category) return;

      // Special handling for Hunter's Journal
      if (tab.tabId === "Hunter's Journal" && category.saveMeta?.journalMeta) {
        const { encountered, completed } = category.saveMeta.journalMeta;
        const categoryTotal = category.totalCount;
        const isProgressComplete = completed === categoryTotal;
        const progressText = inShowEverythingMode ? `${categoryTotal}` : `${completed} / ${categoryTotal}`;
        const encounteredProgressText =
          !inShowEverythingMode && encountered !== completed ? `+${encountered - completed} Encountered` : undefined;

        progressMap.set(tab.tabId, {
          isProgressComplete,
          progressText,
          completedCount: completed,
          encounteredCount: encountered,
          encounteredProgressText,
        });

        return;
      }

      // Default handling for other tabs
      const hasPercentProgression = tab.hasPercentProgression && category.totalPercent > 0;
      const categoryTotal = hasPercentProgression ? category.totalPercent : category.totalCount;

      let currentTotal = categoryTotal;
      if (!inShowEverythingMode) {
        currentTotal = hasPercentProgression
          ? (category.saveMeta?.completedPercent ?? 0)
          : (category.saveMeta?.completedCount ?? 0);
      }

      const isProgressComplete = currentTotal === categoryTotal;

      let progressText = "";
      if (hasPercentProgression) {
        progressText = inShowEverythingMode
          ? formatPercent(categoryTotal)
          : `${formatPercent(currentTotal)} / ${formatPercent(categoryTotal)}`;
      } else {
        progressText = inShowEverythingMode ? `${categoryTotal}` : `${currentTotal} / ${categoryTotal}`;
      }

      const sectionNames = Object.keys(category.sections);

      progressMap.set(tab.tabId, {
        isProgressComplete,
        progressText,
        completedCount: currentTotal,
        sectionNames: sectionNames.length > 1 ? sectionNames : undefined,
      });
    });

    return progressMap;
  }, [dictMapWithSaveData, inShowEverythingMode]);

  const groupedTabs = useMemo(() => {
    const groups = new Map<TabGroup | undefined, typeof TAB_CONFIG>();
    
    TAB_CONFIG.filter(tab => !tab.hideButton).forEach(tab => {
      const group = tab.group;
      if (!groups.has(group)) {
        groups.set(group, []);
      }
      groups.get(group)!.push(tab);
    });

    return groups;
  }, []);

  return (
    <div className="mt-4 mb-2 space-y-3">
      {Array.from(groupedTabs.entries()).map(([group, tabs], groupIndex) => {
        const isFullWidthGroup = group === "exploration" || group === "progression";
        const gridClass = isFullWidthGroup
          ? "grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2"
          : "grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2";
        
        return (
          <div key={group || "ungrouped"}>
            <div className={gridClass}>
              {tabs.map(tab => (
                <TabButton
                  key={tab.tabId}
                  tab={tab}
                  isActive={tab.tabId === activeTab}
                  onSelect={onSelect}
                  progressInfo={tabProgressMap.get(tab.tabId)}
                  hasUploadedSaveData={hasUploadedSaveData}
                  inShowEverythingMode={inShowEverythingMode}
                  fullWidth={true}
                />
              ))}
            </div>
            {/* Subtle horizontal divider between groups, but not after the last group */}
            {groupIndex < groupedTabs.size - 1 && (
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-600/20 to-transparent mt-3" />
            )}
          </div>
        );
      })}
    </div>
  );
}
