import { ALL_TRACKED_CATEGORIES } from "../../../dictionary";
import { isItemUnlockedInPlayerSave } from "../../../dictionary/parsers";
import type { SaveFileObj } from "../../../hooks/useSaveFile";

// NOTE: Added for a future, when DLCs drop, when TOTAL_PERCENT_ACHIEVABLE might become > 100
const TOTAL_PERCENT_ACHIEVABLE = 100;

interface TotalProgressProps {
  saveFileObj: SaveFileObj;
}

export function TotalProgress({ saveFileObj }: TotalProgressProps) {
  let percent = 0;
  if (saveFileObj.state.parsedJson) {
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

    percent = unlockedPercent;
  }

  return (
    <div className="w-full my-4">
      <div className="flex justify-between text-sm text-blue-200 mb-1">
        <span>Total Progress</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-[#24344d] rounded-full h-3">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${(percent / TOTAL_PERCENT_ACHIEVABLE) * 100}%` }}
        />
      </div>
    </div>
  );
}
