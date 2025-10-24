import type { ReactElement } from "react";
import { type TabContentProps } from "./types";
import type { NormalizedItem } from "@/dictionary";
import { getHoverBlurClassNames, getCategoryDisplayStatusText } from "@/utils";

import { CategoryHeader, StatusBar, EmptyState } from "./shared";
import { Table, MapButton } from "@/components/ui";

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
  tabLabel,
  showSpoilers,
  showMissingOnly,
  inShowEverythingMode,
  actFilter,
  computedData,
}: TabContentProps): ReactElement {
  if (!computedData) {
    return <div className="text-white text-center">No "Journal" data available.</div>;
  }

  const { category, hasVisibleItems, sectionEntries } = computedData;

  const statusText = getCategoryDisplayStatusText({
    inShowEverythingMode,
    showMissingOnly,
    showSpoilers,
    actFilter,
    itemTypeText: "entries",
  });

  if (!category) {
    return <div className="text-white text-center">Category "Hunter's Journal" not found.</div>;
  }

  const items = sectionEntries.flatMap(([, section]) => section.items);

  return (
    <>
      <CategoryHeader title={tabLabel || category.name} description={category.description} />

      <StatusBar statusText={statusText ?? ""} hasVisibleItems={hasVisibleItems} hasMultipleSections={false} />

      {!hasVisibleItems && <EmptyState />}

      {hasVisibleItems && (
        <div className="bg-gray-900/50 border-2 border-gray-600/30 rounded-b-lg border-t-0 overflow-hidden">
          <Table<NormalizedItem>
            isFixedLayout={true}
            tableData={items}
            rowClassName="border-b border-gray-700 last:border-none group bg-gray-800/30 hover:bg-gray-700/40 transition-colors"
            columns={[
              {
                width: "56px",
                cellClassName: "text-center align-middle",
                renderCell: (item: NormalizedItem) => (
                  <span
                    className={getHuntersJournalStatusColor(
                      item.unlocked ?? false,
                      item.killsAchieved,
                      item.killsRequired
                    )}
                  >
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
                cellClassName: (item: NormalizedItem) =>
                  `${getHoverBlurClassNames({ shouldBlur: !item.unlocked && !showSpoilers })}`,
                renderCell: (item: NormalizedItem) => item.name,
              },
              {
                width: "130px",
                header: "Kills Achieved",
                headerClassName: "px-2 py-3 text-center text-gray-300 font-medium",
                cellClassName: (item: NormalizedItem) =>
                  `text-center ${getHoverBlurClassNames({ shouldBlur: !item.unlocked && !showSpoilers })}`,
                renderCell: (item: NormalizedItem) => item.killsAchieved ?? 0,
              },
              {
                width: "130px",
                header: "Kills Required",
                headerClassName: "px-2 py-3 text-center text-gray-300 font-medium",
                cellClassName: (item: NormalizedItem) =>
                  `text-center ${getHoverBlurClassNames({ shouldBlur: !item.unlocked && !showSpoilers })}`,
                renderCell: (item: NormalizedItem) => item.killsRequired ?? "N/A",
              },
              {
                width: "64px",
                cellClassName: (item: NormalizedItem) =>
                  `text-center ${getHoverBlurClassNames({ shouldBlur: !item.unlocked && !showSpoilers })}`,
                renderCell: (item: NormalizedItem) => <MapButton mapLink={item.mapLink} />,
              },
            ]}
          />
        </div>
      )}
    </>
  );
}
