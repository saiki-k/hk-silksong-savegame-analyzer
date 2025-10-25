import type { ReactElement } from "react";
import type { TabProgressInfo } from "./index";
import { cn } from "@/utils";

interface TabProgressProps {
  inShowEverythingMode: boolean;
  progressInfo: TabProgressInfo;
}

export function TabProgress({ inShowEverythingMode, progressInfo }: TabProgressProps): ReactElement {
  const { progressText, isProgressComplete, completedCount, encounteredProgressText } = progressInfo;

  const isZeroProgress = completedCount === 0;

  const colorVariant = isZeroProgress || inShowEverythingMode ? "orange" : isProgressComplete ? "emerald" : "yellow";

  const bgColorMap: Record<string, string> = {
    orange: "bg-orange-500/25",
    emerald: "bg-emerald-500/25",
    yellow: "bg-yellow-500/25",
  };
  const textColorMap: Record<string, string> = {
    orange: "text-orange-200",
    emerald: "text-emerald-200",
    yellow: "text-yellow-200",
  };
  const borderColorMap = {
    orange: "border-orange-400/30 group-hover:border-orange-400/50 group-aria-[pressed=true]:border-orange-400/50",
    emerald: "border-emerald-400/30 group-hover:border-emerald-400/50 group-aria-[pressed=true]:border-emerald-400/50",
    yellow: "border-yellow-400/30 group-hover:border-yellow-400/50 group-aria-[pressed=true]:border-yellow-400/50",
  };
  const bgColor = bgColorMap[colorVariant];
  const textColor = textColorMap[colorVariant];
  const borderColor = borderColorMap[colorVariant];

  return (
    <div className={cn("w-full border rounded-b transition-all duration-300", bgColor, textColor, borderColor)}>
      <div className="flex items-center justify-between">
        <div className="flex-1" />
        <div className="text-[10px] font-medium">{progressText}</div>
        <div className="flex-1 flex justify-end">
          {encounteredProgressText && (
            <div className="text-[8px] uppercase font-medium px-2 py-0.5 text-orange-200">
              {encounteredProgressText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
