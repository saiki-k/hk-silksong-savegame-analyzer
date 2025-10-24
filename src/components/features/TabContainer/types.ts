import type { TabId } from "@/components/features/TabBar/tabs";
import type { ActFilter } from "@/components/features/FilterControls";
import type { DictMapWithSaveData, NormalizedCategory, NormalizedSection, NormalizedItem } from "@/dictionary";

export interface SectionWithItems extends NormalizedSection {
  items: NormalizedItem[]; // Pre-computed items filtered by actFilter
}

export interface StatsItemWithDisplay extends NormalizedItem {
  displayValue: string;
  rawValue: string | number | boolean | undefined;
  detailedValue?: string;
}

export interface ComputedTabData {
  category: NormalizedCategory | null;
  hasVisibleItems: boolean;
  sectionEntries: [string, SectionWithItems][];
  sectionsLength: number;
  statsItems?: StatsItemWithDisplay[]; // For Stats tab only
}

export interface TabContainerProps {
  dictMapWithSaveData: DictMapWithSaveData | null;
  activeTab: TabId;
  hasUploadedSaveFile: boolean;
  hasUploadedSaveData: boolean;
  inShowEverythingMode: boolean;
  showMissingOnly: boolean;
  showSpoilers: boolean;
  actFilter: ActFilter;
}

export interface TabContentProps {
  tabLabel: string;
  showSpoilers: boolean;
  showMissingOnly: boolean;
  inShowEverythingMode: boolean;
  actFilter: ActFilter;
  computedData?: ComputedTabData;
}
