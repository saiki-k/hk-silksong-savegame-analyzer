import { Button } from "../../ui/Button";
import { cn } from "../../../utils/classNames";

interface EditorTogglerProps {
  disabled?: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

export function EditorToggler({ isExpanded, onToggle, disabled }: EditorTogglerProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-gray-800/40 to-gray-800/20 border-2 border-gray-600/30",
        "rounded-t-lg border-b-0 pt-0.5 flex justify-center"
      )}
    >
      <div className="w-fit">
        <Button
          onClick={onToggle}
          className={cn(
            "py-2 px-4 flex items-center justify-center gap-2 transition-colors group",
            disabled
              ? "text-gray-600/50 cursor-not-allowed opacity-50"
              : "text-gray-500/80 hover:text-gray-400 cursor-pointer"
          )}
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? "Hide" : "Show"} save file editor`}
          disabled={disabled}
        >
          <span
            className={cn(
              "text-xs font-light leading-none transition-all duration-300",
              disabled
                ? "opacity-0"
                : cn(
                    "opacity-0 group-hover:opacity-100",
                    isExpanded ? "rotate-0 group-hover:rotate-180" : "rotate-180 group-hover:rotate-0"
                  )
            )}
          >
            ▼
          </span>
          <div
            className={cn(
              "h-px w-8 transition-colors",
              disabled ? "bg-gray-600/20" : "bg-gray-600/40 group-hover:bg-gray-500/60"
            )}
          />
          <span className="text-[10px] font-light uppercase tracking-[0.15em] leading-none">Save Editor</span>
          <div
            className={cn(
              "h-px w-8 transition-colors",
              disabled ? "bg-gray-600/20" : "bg-gray-600/40 group-hover:bg-gray-500/60"
            )}
          />
          <span
            className={cn(
              "text-xs font-light leading-none transition-all duration-300",
              disabled
                ? "opacity-0"
                : cn(
                    "opacity-0 group-hover:opacity-100",
                    isExpanded ? "rotate-0 group-hover:rotate-180" : "rotate-180 group-hover:rotate-0"
                  )
            )}
          >
            ▼
          </span>
        </Button>
      </div>
    </div>
  );
}
