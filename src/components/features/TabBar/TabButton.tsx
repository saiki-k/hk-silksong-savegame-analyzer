import type { ReactElement } from "react";
import { useState } from "react";
import type { TabId } from "./tabs";
import { TabProgress } from "./TabProgress";
import type { SaveFileObj } from "../../../hooks/useSaveFile";
import type { TabProgressInfo } from "./index";
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
  progressInfo?: TabProgressInfo;
}

export function TabButton({ tab, isActive, onSelect, saveFileObj, progressInfo }: TabButtonProps): ReactElement {
  const [isHovered, setIsHovered] = useState(false);
  const isDisabled = !saveFileObj.state.isSaveFileDecrypted;

  const handleMouseEnter = () => {
    if (!isDisabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getButtonStyles = () => {
    const baseStyles = "w-full py-2 font-semibold border";
    const transitionStyles = "transition-all duration-300";
    const roundingStyles = progressInfo ? "rounded-t rounded-b-none border-b-0" : "rounded";

    if (isDisabled) {
      return cn(
        baseStyles,
        transitionStyles,
        roundingStyles,
        "bg-gray-700/30 text-gray-400 border-gray-600/30 opacity-50 cursor-not-allowed"
      );
    }

    if (isActive) {
      return cn(
        baseStyles,
        transitionStyles,
        roundingStyles,
        "bg-blue-500/20 text-blue-300 border-blue-400/40 shadow-sm shadow-blue-500/10 cursor-pointer"
      );
    }

    return cn(
      baseStyles,
      transitionStyles,
      roundingStyles,
      "bg-gray-700/30 text-gray-400 border-gray-600/30",
      "group-hover:border-gray-500/50 group-hover:text-gray-300 cursor-pointer"
    );
  };

  return (
    <div
      className="flex-1 min-w-[120px] flex flex-col group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button
        onClick={() => onSelect(tab.tabId)}
        disabled={isDisabled}
        className={getButtonStyles()}
        aria-pressed={isActive}
        aria-label={`Switch to ${tab.tabId} tab`}
      >
        {tab.tabId}
      </Button>
      {progressInfo && <TabProgress progressInfo={progressInfo} isHovered={isHovered} isActive={isActive} />}
    </div>
  );
}
