import type { ReactElement } from "react";
import type { TabId } from "./tabs";
import { TabProgress } from "./TabProgress";
import type { TabProgressInfo } from "./index";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils";

interface TabButtonProps {
  tab: {
    tabId: TabId;
    hasProgress?: boolean;
    isPercentProgression?: boolean;
  };
  isActive: boolean;
  onSelect: (tab: TabId) => void;
  progressInfo?: TabProgressInfo;
  hasUploadedSaveData: boolean;
  inShowEverythingMode: boolean;
}

export function TabButton({
  tab,
  isActive,
  onSelect,
  progressInfo,
  hasUploadedSaveData,
  inShowEverythingMode,
}: TabButtonProps): ReactElement {
  const isDisabled = !hasUploadedSaveData && !inShowEverythingMode;

  const tabButtonStyles = cn(
    "w-full py-2 font-semibold border transition-all duration-300",
    progressInfo ? "rounded-t rounded-b-none border-b-0" : "rounded",
    isDisabled && "bg-gray-700/30 text-gray-400 border-gray-600/30 opacity-50 cursor-not-allowed",
    isActive && !isDisabled && "bg-blue-500/20 text-blue-300 border-blue-400/40 shadow-sm shadow-blue-500/10 cursor-pointer",
    !isActive && !isDisabled && "bg-gray-700/30 text-gray-400 border-gray-600/30 group-hover:border-gray-500/50 group-hover:text-gray-300 cursor-pointer"
  );

  return (
    <div className="flex-1 min-w-[120px] flex flex-col group relative">
      <Button
        onClick={() => onSelect(tab.tabId)}
        disabled={isDisabled}
        className={tabButtonStyles}
        aria-pressed={isActive}
        aria-label={`Switch to ${tab.tabId} tab`}
      >
        {tab.tabId}
      </Button>
      {progressInfo && (
        <TabProgress
          inShowEverythingMode={inShowEverythingMode}
          progressInfo={progressInfo}
        />
      )}
      {progressInfo?.sectionNames && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 animate-in fade-in slide-in-from-top-2">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-600 rounded shadow-xl px-3 py-2 w-max min-w-[140px]">
            <ul className="text-xs text-gray-300 space-y-1">
              {progressInfo.sectionNames.map(name => (
                <li key={name} className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-blue-400">•</span>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
