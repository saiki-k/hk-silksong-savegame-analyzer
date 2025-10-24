import type { ReactElement } from "react";
import type { TabProgressInfo } from "./index";
import { cn } from "@/utils";

interface TabProgressProps {
  inShowEverythingMode: boolean;
  progressInfo: TabProgressInfo;
  isHovered?: boolean;
  isActive?: boolean;
}

export function TabProgress({
  inShowEverythingMode,
  progressInfo,
  isHovered = false,
  isActive = false,
}: TabProgressProps): ReactElement {
  const { progressText, isProgressComplete, completedCount, encounteredProgressText } = progressInfo;
  const shouldHighlightBorder = isHovered || isActive;

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
  const borderColorMap: Record<string, { active: string; inactive: string }> = {
    orange: { active: "border-orange-400/50", inactive: "border-orange-400/30" },
    emerald: { active: "border-emerald-400/50", inactive: "border-emerald-400/30" },
    yellow: { active: "border-yellow-400/50", inactive: "border-yellow-400/30" },
  };

  const bgColor = bgColorMap[colorVariant];
  const textColor = textColorMap[colorVariant];
  const borderColor = shouldHighlightBorder
    ? borderColorMap[colorVariant].active
    : borderColorMap[colorVariant].inactive;

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
