import { useState, useEffect } from "react";
import { FiltersBar } from "./FiltersBar";
import { FiltersBarToggler } from "./FiltersBarToggler";

export type ActFilter = Set<1 | 2 | 3>;

interface FilterControlsProps {
  hasUploadedSaveFile: boolean;
  showSpoilers: boolean;
  showUnlocked: boolean;
  inShowEverythingMode: boolean;
  actFilter: ActFilter;
  onShowSpoilersChange: (value: boolean) => void;
  onShowUnlockedChange: (value: boolean) => void;
  onShowEverythingToggle: () => void;
  onActFilterChange: (value: ActFilter) => void;
}

export function FilterControls({
  hasUploadedSaveFile,
  showSpoilers,
  showUnlocked,
  inShowEverythingMode,
  actFilter,
  onShowSpoilersChange,
  onShowUnlockedChange,
  onShowEverythingToggle,
  onActFilterChange,
}: FilterControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (hasUploadedSaveFile) {
      setIsExpanded(true);
    }
  }, [hasUploadedSaveFile]);

  return (
    <div className="-mt-1">
      <FiltersBar
        hasUploadedSaveFile={hasUploadedSaveFile}
        showSpoilers={showSpoilers}
        showUnlocked={showUnlocked}
        inShowEverythingMode={inShowEverythingMode}
        actFilter={actFilter}
        onShowSpoilersChange={onShowSpoilersChange}
        onShowUnlockedChange={onShowUnlockedChange}
        onShowEverythingToggle={() => {
          if (inShowEverythingMode && !hasUploadedSaveFile) {
            setIsExpanded(false);
          }
          onShowEverythingToggle();
        }}
        onActFilterChange={onActFilterChange}
        isExpanded={isExpanded}
      />
      <FiltersBarToggler
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        hasUploadedSaveFile={hasUploadedSaveFile}
      />
    </div>
  );
}
