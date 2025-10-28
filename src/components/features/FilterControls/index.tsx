import { useState, useEffect } from "react";
import { FiltersBar } from "./FiltersBar";
import { FiltersBarToggler } from "./FiltersBarToggler";

export type ActFilter = Set<1 | 2 | 3>;

interface FilterControlsProps {
  hasUploadedSaveFile: boolean;
  hasUploadedSaveData: boolean;
  showSpoilers: boolean;
  showMissingOnly: boolean;
  inShowEverythingMode: boolean;
  actFilter: ActFilter;
  onShowSpoilersChange: (value: boolean) => void;
  onShowMissingOnlyChange: (value: boolean) => void;
  onShowEverythingToggle: () => void;
  onActFilterChange: (value: ActFilter) => void;
}

export function FilterControls({
  hasUploadedSaveFile,
  hasUploadedSaveData,
  showSpoilers,
  showMissingOnly,
  inShowEverythingMode,
  actFilter,
  onShowSpoilersChange,
  onShowMissingOnlyChange,
  onShowEverythingToggle,
  onActFilterChange,
}: FilterControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (hasUploadedSaveFile) {
      setIsExpanded(false);
    }
  }, [hasUploadedSaveFile]);

  return (
    <div className="mt-0">
      <FiltersBar
        hasUploadedSaveFile={hasUploadedSaveFile}
        hasUploadedSaveData={hasUploadedSaveData}
        showSpoilers={showSpoilers}
        showMissingOnly={showMissingOnly}
        inShowEverythingMode={inShowEverythingMode}
        actFilter={actFilter}
        onShowSpoilersChange={onShowSpoilersChange}
        onShowMissingOnlyChange={onShowMissingOnlyChange}
        onShowEverythingToggle={() => {
          if (inShowEverythingMode && !hasUploadedSaveData) {
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
