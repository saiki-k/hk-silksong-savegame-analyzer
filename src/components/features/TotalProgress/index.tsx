import { useMemo } from "react";
import { ALL_TRACKED_CATEGORIES } from "../../../dictionary";
import { isItemUnlockedInPlayerSave } from "../../../dictionary/parsers";
import type { SaveFileObj } from "../../../hooks/useSaveFile";

// NOTE: Added for a future, when DLCs drop, when TOTAL_PERCENT_ACHIEVABLE might become > 100
const TOTAL_PERCENT_ACHIEVABLE = 100;

interface TotalProgressProps {
  saveFileObj: SaveFileObj;
  hasUploadedSaveFile: boolean;
}

export function TotalProgress({ saveFileObj, hasUploadedSaveFile }: TotalProgressProps) {
  if (!hasUploadedSaveFile) {
    return null;
  }

  const percent = useMemo(() => {
    if (!saveFileObj.state.parsedJson) return 0;

    const allItems = ALL_TRACKED_CATEGORIES.flatMap(category => {
      return category.sections.flatMap(section => section.items);
    });

    const itemsWithPercent = allItems.filter(
      item => typeof item.completionPercent === "number" && item.completionPercent > 0
    );

    let unlockedPercent = 0;
    for (const item of itemsWithPercent) {
      const { unlocked } = isItemUnlockedInPlayerSave(item.parsingInfo, saveFileObj.state.parsedJson);
      if (unlocked) {
        unlockedPercent += item.completionPercent ?? 0;
      }
    }

    return unlockedPercent;
  }, [saveFileObj.state.jsonText]);

  return (
    <div className="w-full my-8">
      <div className="flex justify-between items-center text-xs mb-1">
        <span className="text-blue-200/30 font-semibold uppercase tracking-wider">Total Progress</span>
        <span className="font-semibold text-blue-200">{percent}%</span>
      </div>
      <div className="w-full bg-gradient-to-br from-gray-800/40 to-gray-800/20 rounded-full h-2.5 overflow-hidden border border-gray-700/50">
        <div
          className="bg-gradient-to-br from-emerald-500/20 via-emerald-500/50 to-emerald-500/80 h-full rounded-full transition-all duration-500"
          style={{ width: `${(percent / TOTAL_PERCENT_ACHIEVABLE) * 100}%` }}
        />
      </div>
    </div>
  );
}
