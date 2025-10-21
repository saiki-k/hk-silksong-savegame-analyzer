import type { ReactElement } from "react";
import type { TabId } from "./tabs";
import { TabProgress } from "./TabProgress";
import type { SaveFileObj } from "../../../hooks/useSaveFile";
import { Button } from "../../ui/Button";
import { cn } from "../../../utils/classNames";

interface TabButtonProps {
  tab: {
    tabId: TabId;
    hasProgress?: boolean;
    isPercentProgression?: boolean;
  };
  isActive: boolean;
  onSelect: (tab: TabId) => void;
  saveFileObj: SaveFileObj;
  inShowEverythingMode?: boolean;
}

export function TabButton({
  tab,
  isActive,
  onSelect,
  saveFileObj,
  inShowEverythingMode,
}: TabButtonProps): ReactElement {
  const shouldShowProgress = tab.hasProgress && saveFileObj.state.isSaveFileDecrypted && saveFileObj.state.parsedJson;
  const isDisabled = !saveFileObj.state.isSaveFileDecrypted;

  return (
    <Button
      onClick={() => onSelect(tab.tabId)}
      disabled={isDisabled}
      className={cn(
        "flex-1 min-w-[120px] py-2 rounded font-semibold transition-all duration-200 border",
        isActive
          ? "bg-blue-500/20 text-blue-300 border-blue-400/40 shadow-sm shadow-blue-500/10"
          : "bg-gray-700/30 text-gray-400 border-gray-600/30 hover:border-gray-500/50 hover:text-gray-300",
        isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      )}
      aria-pressed={isActive}
      aria-label={`Switch to ${tab.tabId} tab`}
    >
      <div className="flex flex-col items-center">
        <span>{tab.tabId}</span>
        {shouldShowProgress ? (
          <TabProgress
            saveFileObj={saveFileObj}
            tabLabel={tab.tabId}
            isPercentProgression={tab.isPercentProgression}
            inShowEverythingMode={inShowEverythingMode}
          />
        ) : null}
      </div>
    </Button>
  );
}
