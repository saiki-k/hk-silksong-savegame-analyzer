import { CATEGORIES, isItemUnlockedInPlayerSave } from "../parsers/dictionary";

interface TotalProgressProps {
  parsedJson: unknown;
}

export function TotalProgress({ parsedJson }: TotalProgressProps) {
  let percent = 0;
  if (parsedJson) {
    // Flatten all items from all categories
    const allItems = CATEGORIES.flatMap(category => {
      if ("items" in category) {
        // Legacy TrackableCategory
        return category.items;
      } else {
        // NormalisedTrackableCategory
        return category.sections.flatMap(section => section.items);
      }
    });

    // Only count items with a positive completionPercent
    const itemsWithPercent = allItems.filter(
      item => typeof item.completionPercent === "number" && item.completionPercent > 0
    );

    let unlockedPercent = 0;
    for (const item of itemsWithPercent) {
      const { unlocked } = isItemUnlockedInPlayerSave(item.parsingInfo, parsedJson);
      if (unlocked) {
        unlockedPercent += item.completionPercent;
      }
    }

    percent = unlockedPercent;
  }

  // NOTE: Added for a future, when DLCs drop, when TOTAL_PERCENT might become > 100
  const TOTAL_PERCENT = 100;
  return (
    <div className="w-full my-4">
      <div className="flex justify-between text-sm text-blue-200 mb-1">
        <span>Total Progress</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-[#24344d] rounded-full h-3">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${(percent / TOTAL_PERCENT) * 100}%` }}
        />
      </div>
    </div>
  );
}
