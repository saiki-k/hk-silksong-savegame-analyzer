import { useState, useEffect } from "react";
import { FilterBar } from "./FilterBar";
import { FilterToggleBar } from "./FilterToggleBar";

export type ActFilter = Set<1 | 2 | 3>;

interface DisplayControlsProps {
  hasRealSaveFile: boolean;
  showSpoilers: boolean;
  showUnlocked: boolean;
  inShowEverythingMode: boolean;
  actFilter: ActFilter;
  onShowSpoilersChange: (value: boolean) => void;
  onShowUnlockedChange: (value: boolean) => void;
  onShowEverythingToggle: () => void;
  onActFilterChange: (value: ActFilter) => void;
}

export function DisplayControls({
  hasRealSaveFile,
  showSpoilers,
  showUnlocked,
  inShowEverythingMode,
  actFilter,
  onShowSpoilersChange,
  onShowUnlockedChange,
  onShowEverythingToggle,
  onActFilterChange,
}: DisplayControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (hasRealSaveFile) {
      setIsExpanded(true);
    }
  }, [hasRealSaveFile]);

  return (
    <div className="-mt-1">
      <FilterBar
        hasRealSaveFile={hasRealSaveFile}
        showSpoilers={showSpoilers}
        showUnlocked={showUnlocked}
        inShowEverythingMode={inShowEverythingMode}
        actFilter={actFilter}
        onShowSpoilersChange={onShowSpoilersChange}
        onShowUnlockedChange={onShowUnlockedChange}
        onShowEverythingToggle={() => {
          if (inShowEverythingMode && !hasRealSaveFile) {
            setIsExpanded(false);
          }
          onShowEverythingToggle();
        }}
        onActFilterChange={onActFilterChange}
        isExpanded={isExpanded}
      />
      <FilterToggleBar
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        hasRealSaveFile={hasRealSaveFile}
      />
    </div>
  );
}
