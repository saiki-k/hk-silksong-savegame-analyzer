import { TextWithEmojiButton, PillButton } from "@/components/ui";
import type { ActFilter } from "@/components/features/FilterControls";
import { getActFilterText, toggleActInFilter } from "@/utils";

interface StatusBarProps {
  inShowEverythingMode: boolean;
  tabLabel: string;
  hasMultipleSections: boolean;
  hasVisibleItems: boolean;
  showMissingOnly: boolean;
  showSpoilers: boolean;
  actFilter: ActFilter;
  onShowMissingOnlyChange: () => void;
  onShowSpoilersChange: () => void;
  onActFilterChange: (filter: ActFilter) => void;
}

export function StatusBar({
  inShowEverythingMode,
  tabLabel,
  hasMultipleSections,
  hasVisibleItems,
  showMissingOnly,
  showSpoilers,
  actFilter,
  onShowMissingOnlyChange,
  onShowSpoilersChange,
  onActFilterChange,
}: StatusBarProps) {
  const toggleAct = (act: 1 | 2 | 3) => {
    const newFilter = toggleActInFilter(actFilter, act);
    onActFilterChange(newFilter);
  };

  const isJournalCategory = tabLabel === "Hunter's Journal";
  const isBossesCategory = tabLabel === "Bosses";

  const actText = getActFilterText(actFilter, { returnEmpty: isJournalCategory });

  const itemTypeText = isJournalCategory || isBossesCategory ? "entries" : "items";

  const missingText = `missing ${itemTypeText}`;
  const allText = `all ${itemTypeText}`;

  const actFilterButtons = (
    <div className="flex items-center gap-1.5 flex-shrink-0">
      <PillButton onClick={() => toggleAct(1)} selected={actFilter.has(1)} disabled={false}>
        Act I
      </PillButton>
      <PillButton onClick={() => toggleAct(2)} selected={actFilter.has(2)} disabled={false}>
        Act II
      </PillButton>
      <PillButton onClick={() => toggleAct(3)} selected={actFilter.has(3)} disabled={false}>
        Act III
      </PillButton>
    </div>
  );

  return (
    <div className={hasMultipleSections && hasVisibleItems ? "mb-8" : "mb-0"}>
      <div
        className={`bg-gray-800/50 border-2 border-gray-600/30 px-4 border-t-0 min-h-[44px] flex items-center ${
          hasMultipleSections && hasVisibleItems ? "rounded-b-lg" : ""
        }`}
      >
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="text-xs text-gray-300 flex items-center gap-1 flex-wrap">
            <span>Showing</span>
            {!inShowEverythingMode ? (
              <TextWithEmojiButton
                text={showMissingOnly ? missingText : allText}
                emoji={showMissingOnly ? "🔒" : "🔓"}
                emojiClassName={`-mt-0.5 -mr-1 ${showMissingOnly ? "" : "ml-0.5"}`}
                emojiPosition="left"
                onClick={onShowMissingOnlyChange}
              />
            ) : (
              <span className="">
                {allText}
              </span>
            )}
            <span className={`${isJournalCategory ? "-ml-1" : ""}`}>{actText}, with</span>
            <TextWithEmojiButton
              text={showSpoilers ? "spoilers shown" : "spoilers blurred"}
              emoji={showSpoilers ? "😮" : "🤫"}
              emojiClassName="-mr-1"
              emojiPosition="left"
              onClick={onShowSpoilersChange}
              disabled={false}
            />
            <span className={`${showSpoilers ? "-ml-1" : ""}`}>
              {showSpoilers ? "!" : "(until you hover over them)."}
            </span>
          </div>
          
          {tabLabel !== "Hunter's Journal" && actFilterButtons}
        </div>
      </div>
    </div>
  );
}
