import { Button } from "@/components/ui";
import { cn } from "@/utils";

interface FiltersBarTogglerProps {
  isExpanded: boolean;
  onToggle: () => void;
  hasUploadedSaveFile: boolean;
  inShowEverythingMode?: boolean;
}

export function FiltersBarToggler({
  isExpanded,
  onToggle,
  hasUploadedSaveFile,
  inShowEverythingMode,
}: FiltersBarTogglerProps) {
  const displayText =
    hasUploadedSaveFile || inShowEverythingMode ? "Global Filters" : "No save file? You can still see everything.";

  return (
    <div
      className={cn(
        "bg-gradient-to-br from-gray-800/40 to-gray-800/20 border-2 border-gray-600/30",
        "border-t-0 rounded-b-lg pt-0.5 flex justify-center"
      )}
    >
      <div className="w-fit">
        <Button
          onClick={onToggle}
          className="py-2 px-4 flex items-center justify-center gap-2 text-gray-500/80 hover:text-gray-400 transition-colors group cursor-pointer"
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? "Hide" : "Show"} content filters`}
        >
          <span
            className={cn(
              "text-xs font-light leading-none opacity-0 group-hover:opacity-100 transition-all duration-300",
              isExpanded ? "rotate-0 group-hover:rotate-180" : "rotate-180 group-hover:rotate-0"
            )}
          >
            ▼
          </span>
          <div className="h-px w-8 bg-gray-600/40 group-hover:bg-gray-500/60 transition-colors" />
          <span className="text-[10px] font-light uppercase tracking-[0.15em] leading-none">{displayText}</span>
          <div className="h-px w-8 bg-gray-600/40 group-hover:bg-gray-500/60 transition-colors" />
          <span
            className={cn(
              "text-xs font-light leading-none opacity-0 group-hover:opacity-100 transition-all duration-300",
              isExpanded ? "rotate-0 group-hover:rotate-180" : "rotate-180 group-hover:rotate-0"
            )}
          >
            ▼
          </span>
        </Button>
      </div>
    </div>
  );
}
