import { TRACKED_CATEGORY_DICT } from "../../../dictionary";
import type { TrackableCategory, CategorySection } from "../../../dictionary/types";
import type { TabContentProps } from "./types";
import {
  filterItems,
  getCategoryDisplayStatusText,
  getTableRowBlurClassNames,
  type FilteredItem,
  cn,
} from "../../../utils";

import { CategoryHeader, SectionHeader, StatusBar, EmptyState } from "./shared";
import { Table, MapButton } from "../../ui";

function GenericSectionTable({
  section,
  sectionsLength,
  parsedJson,
  inShowEverythingMode,
  showUnlocked,
  showSpoilers,
  actFilter,
}: {
  section: CategorySection;
  sectionsLength: number;
  parsedJson: unknown;
  inShowEverythingMode: boolean;
  showUnlocked: boolean;
  showSpoilers: boolean;
  actFilter?: Set<1 | 2 | 3>;
}) {
  const visibleItems = filterItems({
    items: section.items,
    parsedJson,
    inShowEverythingMode,
    showUnlocked,
    actFilter,
    hasGameModeSpecificItems: section.hasGameModeSpecificItems,
  });

  if (visibleItems.length === 0) return null;

  return (
    <div className="mb-8">
      {/* Section Headers for multi-section categories only */}
      {sectionsLength > 1 && (
        <SectionHeader
          name={section.name}
          description={section.description}
          descriptionMarkup={section.descriptionMarkup}
          showSpoilers={showSpoilers}
        />
      )}

      <div
        className={cn(
          "bg-gray-900/50 border-2 border-gray-600/30 overflow-hidden",
          sectionsLength === 1 && "border-t-0 rounded-b-lg", // Single section - connect to status bar above
          section.name || section.description || section.descriptionMarkup
            ? sectionsLength > 1 && "rounded-b-lg" // Multi-section with header - connect to section header
            : sectionsLength > 1 && "rounded-lg" // Multi-section without header - standalone container
        )}
      >
        <Table<FilteredItem>
          isFixedLayout={true}
          tableData={visibleItems}
          rowClassName={() =>
            `border-b border-gray-700 last:border-none group bg-gray-800/30 hover:bg-gray-700/40 transition-colors`
          }
          columns={[
            {
              width: "56px",
              cellClassName: "text-center align-middle",
              renderCell: (item: FilteredItem) => (
                <span className={item.unlocked ? "text-green-400" : "text-red-400"}>
                  {item.unlocked ? "[x]" : "[ ]"}
                </span>
              ),
            },
            {
              width: "56px",
              headerClassName: "px-2 py-3 text-center text-gray-300 font-medium",
              cellClassName: "text-center align-middle",
              renderCell: (item: FilteredItem) => (
                <span className="text-xs text-blue-200 mt-1 font-normal">
                  {item.completionPercent ? `+${item.completionPercent}%` : ""}
                </span>
              ),
            },
            {
              width: "220px",
              header: "Name",
              cellClassName: (item: FilteredItem) =>
                `${getTableRowBlurClassNames({ shouldBlur: !item.unlocked && !showSpoilers })}`,
              renderCell: (item: FilteredItem) => item.name,
            },
            {
              width: "260px",
              header: "Details",
              cellClassName: (item: FilteredItem) =>
                `relative min-w-[140px] max-w-[260px] ${getTableRowBlurClassNames({ shouldBlur: !item.unlocked && !showSpoilers })}`,
              renderCell: (item: FilteredItem) => item.locationDetails,
            },
            {
              width: "48px",
              header: "Act",
              cellClassName: (item: FilteredItem) =>
                `w-[48px] text-center ${getTableRowBlurClassNames({ shouldBlur: !item.unlocked && !showSpoilers })}`,
              renderCell: (item: FilteredItem) => item.whichAct,
            },
            {
              width: "64px",
              cellClassName: (item: FilteredItem) =>
                `text-center ${getTableRowBlurClassNames({ shouldBlur: !item.unlocked && !(showSpoilers ?? false) })}`,
              renderCell: (item: FilteredItem) => <MapButton mapLink={item.mapLink} />,
            },
          ]}
        />
      </div>
    </div>
  );
}

export function GenericContent({
  saveFileObj,
  tabLabel,
  inShowEverythingMode,
  showUnlocked,
  showSpoilers,
  actFilter,
}: TabContentProps) {
  if (!saveFileObj || !tabLabel) {
    return <div className="text-white">No save file loaded.</div>;
  }

  const categoryData = TRACKED_CATEGORY_DICT[tabLabel] as TrackableCategory;
  if (!categoryData) {
    return <div className="text-white text-center">Category "{tabLabel}" not found.</div>;
  }

  const statusText = getCategoryDisplayStatusText({
    inShowEverythingMode: inShowEverythingMode ?? false,
    showUnlocked: showUnlocked ?? false,
    showSpoilers: showSpoilers ?? false,
    actFilter,
    itemTypeText: "items",
  });

  const hasVisibleItems = categoryData.sections.some(section => {
    const visibleItems = filterItems({
      items: section.items,
      parsedJson: saveFileObj.state.parsedJson,
      inShowEverythingMode: inShowEverythingMode ?? false,
      showUnlocked: showUnlocked ?? false,
      actFilter,
      hasGameModeSpecificItems: section.hasGameModeSpecificItems,
    });
    return visibleItems.length > 0;
  });

  return (
    <>
      <CategoryHeader title={categoryData.name} description={categoryData.description} />

      {!hasVisibleItems && <EmptyState />}

      {hasVisibleItems && <StatusBar statusText={statusText} hasMultipleSections={categoryData.sections.length > 1} />}

      {hasVisibleItems &&
        categoryData.sections.map((section, sectionIndex) => (
          <GenericSectionTable
            key={section.name || sectionIndex}
            section={section}
            sectionsLength={categoryData.sections.length}
            parsedJson={saveFileObj.state.parsedJson}
            inShowEverythingMode={inShowEverythingMode ?? false}
            showUnlocked={showUnlocked ?? false}
            showSpoilers={showSpoilers ?? false}
            actFilter={actFilter}
          />
        ))}
    </>
  );
}
