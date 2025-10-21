import type { ReactElement } from "react";
import { huntersJournal } from "../../../dictionary/categories/huntersJournal";
import { type TabContentProps } from "./types";
import {
  filterItems,
  getCategoryDisplayStatusText,
  getTableRowBlurClassNames,
  type FilteredItem,
} from "../../../utils";

import { CategoryHeader, StatusBar, EmptyState } from "./shared";
import { Table, MapButton } from "../../ui";

function getHuntersJournalStatusColor(
  unlocked: boolean,
  killsAchieved: number | undefined,
  killsRequired: number | undefined
): string {
  if (!unlocked) {
    return "text-red-400";
  }

  if (killsAchieved !== undefined && killsRequired !== undefined) {
    return killsAchieved >= killsRequired ? "text-green-400" : "text-yellow-400";
  }

  return "";
}

export function HuntersJournalContent({
  saveFileObj,
  showUnlocked,
  showSpoilers,
  inShowEverythingMode,
  actFilter,
}: TabContentProps): ReactElement {
  if (!saveFileObj) {
    return <div className="text-white">No save file loaded.</div>;
  }

  const allEntries = huntersJournal.sections.flatMap(section => section.items);
  const visibleEntries = filterItems({
    items: allEntries,
    parsedJson: saveFileObj.state.parsedJson,
    inShowEverythingMode: inShowEverythingMode ?? false,
    showUnlocked: showUnlocked ?? false,
    actFilter,
    hasGameModeSpecificItems: true,
    isJournalCategory: true,
  });

  const statusText = getCategoryDisplayStatusText({
    inShowEverythingMode: inShowEverythingMode ?? false,
    showUnlocked: showUnlocked ?? false,
    showSpoilers: showSpoilers ?? false,
    actFilter,
    itemTypeText: "entries",
  });

  return (
    <>
      <CategoryHeader title={huntersJournal.name} description={huntersJournal.description} />

      {visibleEntries.length === 0 && <EmptyState />}

      {visibleEntries.length > 0 && <StatusBar statusText={statusText} hasMultipleSections={false} />}

      {visibleEntries.length > 0 && (
        <div className="bg-gray-900/50 border border-gray-600 rounded-b-lg border-t-0 overflow-hidden">
          <Table<FilteredItem>
            isFixedLayout={true}
            tableData={visibleEntries}
            rowClassName="border-b border-gray-700 last:border-none group bg-gray-800/30 hover:bg-gray-700/40 transition-colors"
            columns={[
              {
                width: "56px",
                cellClassName: "text-center align-middle",
                renderCell: (item: FilteredItem) => (
                  <span className={getHuntersJournalStatusColor(item.unlocked, item.killsAchieved, item.killsRequired)}>
                    {item.unlocked && (item.killsAchieved ?? 0) >= (item.killsRequired ?? 0) ? "[x]" : "[ ]"}
                  </span>
                ),
              },
              {
                width: "56px",
                headerClassName: "px-2 py-3 text-center text-gray-300 font-medium",
                cellClassName: "text-center align-middle",
                renderCell: () => <span className="text-xs text-blue-200 mt-1 font-normal" />,
              },
              {
                width: "220px",
                header: "Name",
                cellClassName: (item: FilteredItem) =>
                  `${getTableRowBlurClassNames({ shouldBlur: !item.unlocked && !showSpoilers })}`,
                renderCell: (item: FilteredItem) => item.name,
              },
              {
                width: "130px",
                header: "Kills Achieved",
                headerClassName: "px-2 py-3 text-center text-gray-300 font-medium",
                cellClassName: (item: FilteredItem) =>
                  `text-center ${getTableRowBlurClassNames({ shouldBlur: !item.unlocked && !showSpoilers })}`,
                renderCell: (item: FilteredItem) => item.killsAchieved,
              },
              {
                width: "130px",
                header: "Kills Required",
                headerClassName: "px-2 py-3 text-center text-gray-300 font-medium",
                cellClassName: (item: FilteredItem) =>
                  `text-center ${getTableRowBlurClassNames({ shouldBlur: !item.unlocked && !showSpoilers })}`,
                renderCell: (item: FilteredItem) => item.killsRequired ?? "N/A",
              },
              {
                width: "64px",
                cellClassName: (item: FilteredItem) =>
                  `text-center ${getTableRowBlurClassNames({ shouldBlur: !item.unlocked && !showSpoilers })}`,
                renderCell: (item: FilteredItem) => <MapButton mapLink={item.mapLink} />,
              },
            ]}
          />
        </div>
      )}
    </>
  );
}
