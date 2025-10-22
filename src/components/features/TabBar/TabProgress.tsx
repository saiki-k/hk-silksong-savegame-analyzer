import type { ReactElement } from "react";
import { cn } from "../../../utils/classNames";
import type { TabProgressInfo } from "./index";

interface TabProgressProps {
  progressInfo: TabProgressInfo;
  isHovered?: boolean;
  isActive?: boolean;
}

export function TabProgress({ progressInfo, isHovered = false, isActive = false }: TabProgressProps): ReactElement {
  const { displayText, isComplete, completedCount, encounteredOnlyDisplayText } = progressInfo;
  const shouldHighlightBorder = isHovered || isActive;

  const isZeroProgress = completedCount === 0;

  const colorVariant = isZeroProgress ? "orange" : isComplete ? "emerald" : "yellow";
  const bgColor = `bg-${colorVariant}-500/25`;
  const textColor = `text-${colorVariant}-200`;
  const borderColor = `border-${colorVariant}-400/${shouldHighlightBorder ? "50" : "30"}`;

  return (
    <div className={cn("w-full border rounded-b transition-all duration-300", bgColor, textColor, borderColor)}>
      <div className="flex items-center justify-between">
        <div className="flex-1" />
        <div className="text-[10px] font-medium">{displayText}</div>
        <div className="flex-1 flex justify-end">
          {encounteredOnlyDisplayText && (
            <div className="text-[8px] uppercase font-medium px-2 py-0.5 text-orange-200">
              {encounteredOnlyDisplayText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
