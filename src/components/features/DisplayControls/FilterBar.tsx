import { TextWithEmojiButton, PillButton } from "../../ui/ToggleButton";
import { Separator } from "../../ui/Separator";
import { cn } from "../../../utils/classNames";
import type { ActFilter } from "./index";

function ShowEverythingButton({
  inShowEverythingMode,
  onClick,
}: {
  inShowEverythingMode: boolean;
  onClick: () => void;
}) {
  return (
    <TextWithEmojiButton
      text={inShowEverythingMode ? "Nope, take me back!" : "Show me, everything!"}
      emoji={inShowEverythingMode ? "🐵" : "🙈"}
      emojiClassName={inShowEverythingMode ? "-mt-0.5" : ""}
      onClick={onClick}
    />
  );
}

function ShowUnlockedButton({
  showUnlocked,
  onClick,
  disabled = false,
}: {
  showUnlocked: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <TextWithEmojiButton
      text={showUnlocked ? "Showing all items!" : "Showing missing items"}
      emoji={showUnlocked ? "🔓" : "🔒"}
      emojiClassName="-mt-0.5"
      onClick={onClick}
      disabled={disabled}
    />
  );
}

function SpoilersButton({
  showSpoilers,
  onClick,
  disabled = false,
}: {
  showSpoilers: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <TextWithEmojiButton
      text={showSpoilers ? "Spoilers are shown!" : "Spoilers are hidden"}
      emoji={showSpoilers ? "😮" : "🤫"}
      emojiPosition="left"
      onClick={onClick}
      disabled={disabled}
    />
  );
}

interface FilterBarProps {
  hasRealSaveFile: boolean;
  showSpoilers: boolean;
  showUnlocked: boolean;
  inShowEverythingMode: boolean;
  actFilter: ActFilter;
  onShowSpoilersChange: (value: boolean) => void;
  onShowUnlockedChange: (value: boolean) => void;
  onShowEverythingToggle: () => void;
  onActFilterChange: (value: ActFilter) => void;
  isExpanded: boolean;
}

export function FilterBar({
  hasRealSaveFile,
  showSpoilers,
  showUnlocked,
  inShowEverythingMode,
  actFilter,
  onShowSpoilersChange,
  onShowUnlockedChange,
  onShowEverythingToggle,
  onActFilterChange,
  isExpanded,
}: FilterBarProps) {
  const actOptions = [
    { value: 1 as const, label: "Act I" },
    { value: 2 as const, label: "Act II" },
    { value: 3 as const, label: "Act III" },
  ];

  const filtersDisabled = !hasRealSaveFile && !inShowEverythingMode;

  const toggleAct = (act: 1 | 2 | 3) => {
    if (filtersDisabled) return;
    const newFilter = new Set(actFilter);
    if (newFilter.has(act)) {
      newFilter.delete(act);
    } else {
      newFilter.add(act);
    }
    onActFilterChange(newFilter);
  };

  return (
    <div
      className={cn(
        "bg-gradient-to-br from-gray-800/40 to-gray-800/20 border-2 border-gray-600/30",
        "border-t-0 overflow-hidden transition-all duration-300 ease-in-out",
        isExpanded ? "max-h-[200px] opacity-100 p-8" : "max-h-0 opacity-0 p-0"
      )}
    >
      <div className="flex items-center justify-between gap-6 text-sm">
        <div className="w-[200px] flex justify-end">
          {hasRealSaveFile ? (
            <ShowUnlockedButton
              showUnlocked={showUnlocked}
              onClick={() => onShowUnlockedChange(!showUnlocked)}
              disabled={filtersDisabled}
            />
          ) : (
            <ShowEverythingButton inShowEverythingMode={inShowEverythingMode} onClick={onShowEverythingToggle} />
          )}
        </div>

        <Separator orientation="vertical" />

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            {actOptions.map(option => {
              const isSelected = actFilter.has(option.value);
              return (
                <PillButton
                  key={option.value}
                  onClick={() => toggleAct(option.value)}
                  disabled={filtersDisabled}
                  selected={isSelected}
                  aria-label={`Toggle ${option.label}`}
                >
                  {option.label}
                </PillButton>
              );
            })}
          </div>
        </div>

        <Separator orientation="vertical" />

        <div className="w-[200px] flex justify-start">
          <SpoilersButton
            showSpoilers={showSpoilers}
            onClick={() => onShowSpoilersChange(!showSpoilers)}
            disabled={filtersDisabled}
          />
        </div>
      </div>
    </div>
  );
}
