import type { ReactNode } from "react";
import { useMemo } from "react";
import { formatPercent, getGenericProgress, getHuntersJournalProgress } from "../../../utils";
import type { SaveFileObj } from "../../../hooks/useSaveFile";

interface TabProgressProps {
  saveFileObj: SaveFileObj;
  tabLabel: string;
  isPercentProgression?: boolean;
  inShowEverythingMode?: boolean;
}

export function TabProgress({
  saveFileObj,
  tabLabel,
  isPercentProgression = false,
  inShowEverythingMode = false,
}: TabProgressProps): ReactNode {
  // Memoize progress calculations - only recalculate when save data changes
  const progressData = useMemo(() => {
    if (!saveFileObj.state.isSavefileDecrypted || !saveFileObj.state.parsedJson) {
      return null;
    }

    const isHuntersJournal = tabLabel === "Hunter's Journal";
    if (isHuntersJournal) {
      return getHuntersJournalProgress({
        parsedJson: saveFileObj.state.parsedJson,
        isSavefileDecrypted: saveFileObj.state.isSavefileDecrypted,
      });
    }

    return getGenericProgress({
      parsedJson: saveFileObj.state.parsedJson,
      isSavefileDecrypted: saveFileObj.state.isSavefileDecrypted,
      tabLabel,
      isPercentProgression,
    });
  }, [saveFileObj.state.parsedJson, saveFileObj.state.isSavefileDecrypted, tabLabel, isPercentProgression]);

  if (!progressData) {
    return null;
  }

  // In "Show Everything" mode, display only the totals
  if (inShowEverythingMode) {
    if (progressData.progressType === "Count Progression") {
      return <div className="text-xs text-blue-200 mt-1 font-normal">{progressData.total}</div>;
    }

    if (progressData.progressType === "Percent Progression") {
      return <div className="text-xs text-blue-200 mt-1 font-normal">{formatPercent(progressData.total)}</div>;
    }

    if (progressData.progressType === "Hunter's Journal Progression") {
      return <div className="text-xs text-blue-200 mt-1 font-bold">{progressData.total}</div>;
    }

    return null;
  }

  // Normal mode - show current/total
  if (progressData.progressType === "Count Progression") {
    return (
      <div className="text-xs text-blue-200 mt-1 font-normal">{`${progressData.current}/${progressData.total}`}</div>
    );
  }

  if (progressData.progressType === "Percent Progression") {
    return (
      <div className="text-xs text-blue-200 mt-1 font-normal">
        {`${formatPercent(progressData.current)} / ${formatPercent(progressData.total)}`}
      </div>
    );
  }

  if (progressData.progressType === "Hunter's Journal Progression") {
    return (
      <div className="text-xs mt-1 font-normal">
        <span className="text-green-400 font-bold">{`Completed ${progressData.completed} / ${progressData.total}`}</span>
        <br />
        <span className="text-yellow-400 font-bold">{`Encountered ${progressData.encountered} / ${progressData.total}`}</span>
      </div>
    );
  }

  return null;
}
