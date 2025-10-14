import type { ReactNode } from "react";
import { formatPercent, getGenericProgress, getHuntersJournalProgress } from "../tabs/utils";

interface TabProgressProps {
  parsedJson: unknown;
  decrypted: boolean;
  tabLabel: string;
  useCount?: boolean;
  isHuntersJournal?: boolean;
}

export function TabProgress({ parsedJson, decrypted, tabLabel, useCount = false, isHuntersJournal = false }: TabProgressProps): ReactNode {
  if (!decrypted || !parsedJson) {
    return null;
  }

  if (isHuntersJournal) {
    const progressData = getHuntersJournalProgress({ parsedJson, decrypted });
    if (!progressData) return null;

    return (
      <div className="text-xs mt-1 font-normal">
        <span className="text-green-400 font-bold">{`Completed ${progressData.completed} / ${progressData.total}`}</span><br />
        <span className="text-yellow-400 font-bold">{`Encountered ${progressData.encountered} / ${progressData.total}`}</span>
      </div>
    );
  }

  const progressData = getGenericProgress({ parsedJson, decrypted, tabLabel, useCount });
  if (!progressData) return null;

  if (progressData.type === 'count') {
    return (
      <div className="text-xs text-blue-200 mt-1 font-normal">
        {`${progressData.current}/${progressData.total}`}
      </div>
    );
  } else {
    return (
      <div className="text-xs text-blue-200 mt-1 font-normal">
        {`${formatPercent(progressData.current)} / ${formatPercent(progressData.total)}`}
      </div>
    );
  }
}