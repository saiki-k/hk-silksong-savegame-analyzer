import type { DictMapWithSaveData } from "@/dictionary";

// NOTE: Added for a future, when DLCs drop, when TOTAL_PERCENT_ACHIEVABLE might become > 100
const TOTAL_PERCENT_ACHIEVABLE = 100;

interface TotalProgressProps {
  dictMapWithSaveData: DictMapWithSaveData | null;
  inShowEverythingMode: boolean;
}

export function TotalProgress({ dictMapWithSaveData, inShowEverythingMode }: TotalProgressProps) {
  if (inShowEverythingMode || !dictMapWithSaveData) {
    return null;
  }

  const { totalCompletedPercent } = dictMapWithSaveData;

  return (
    <div className="w-full my-8">
      <div className="flex justify-between items-center text-xs tracking-wider mb-1">
        <span className="text-blue-200/40 font-semibold uppercase">Total Progress</span>
        <span className="font-semibold text-blue-200">{totalCompletedPercent}%</span>
      </div>
      <div className="w-full bg-gradient-to-br from-gray-800/40 to-gray-800/20 rounded-full h-2.5 overflow-hidden border border-gray-700/50">
        <div
          className="bg-gradient-to-br from-emerald-500/20 via-emerald-500/50 to-emerald-500/80 h-full rounded-full transition-all duration-500"
          style={{ width: `${(totalCompletedPercent / TOTAL_PERCENT_ACHIEVABLE) * 100}%` }}
        />
      </div>
    </div>
  );
}
