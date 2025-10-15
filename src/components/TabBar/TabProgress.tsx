import type { ReactNode } from "react";
import { useMemo } from "react";
import { formatPercent, getGenericProgress, getHuntersJournalProgress } from "../tabs/utils";

interface TabProgressProps {
  parsedJson: unknown;
  decrypted: boolean;
  tabLabel: string;
  isPercentProgress?: boolean;
  isHuntersJournal?: boolean;
}

export function TabProgress({
  parsedJson,
  decrypted,
  tabLabel,
  isPercentProgress = false,
  isHuntersJournal = false,
}: TabProgressProps): ReactNode {
  // Memoize progress calculations - only recalculate when save data changes
  const progressData = useMemo(() => {
    if (!decrypted || !parsedJson) {
      return null;
    }

    if (isHuntersJournal) {
      return getHuntersJournalProgress({ parsedJson, decrypted });
    }

    return getGenericProgress({ parsedJson, decrypted, tabLabel, isPercentProgress });
  }, [parsedJson, decrypted, tabLabel, isPercentProgress, isHuntersJournal]);

  if (!progressData) {
    return null;
  }

  if (progressData.progressType === "Hunter's Journal Progress") {
    return (
      <div className="text-xs mt-1 font-normal">
        <span className="text-green-400 font-bold">{`Completed ${progressData.completed} / ${progressData.total}`}</span>
        <br />
        <span className="text-yellow-400 font-bold">{`Encountered ${progressData.encountered} / ${progressData.total}`}</span>
      </div>
    );
  }

  if (progressData.progressType === "Generic Count Progress") {
    return (
      <div className="text-xs text-blue-200 mt-1 font-normal">{`${progressData.current}/${progressData.total}`}</div>
    );
  }

  if (progressData.progressType === "Generic Percent Progress") {
    return (
      <div className="text-xs text-blue-200 mt-1 font-normal">
        {`${formatPercent(progressData.current)} / ${formatPercent(progressData.total)}`}
      </div>
    );
  }

  return null;
}
