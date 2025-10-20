import { ALL_TRACKED_CATEGORIES } from "../../../dictionary";

const TRACKED_CATEGORY_NAMES = ALL_TRACKED_CATEGORIES.map(category => category.name);

const PERCENT_PROGRESSION_CATEGORIES = [
  "Mask Shards",
  "Spool Fragments",
  "Abilities",
  "Upgrades",
  "Tools",
  "Crests",
] as const;

const TABS = [...TRACKED_CATEGORY_NAMES, "Save Editor"] as const;
const PERCENT_PROGRESSION_TABS = PERCENT_PROGRESSION_CATEGORIES;
const NO_PROGRESSION_TABS = ["Stats", "Save Editor"] as const;

export type TabId = (typeof TABS)[number];

interface TabConfig {
  tabId: TabId;
  hasProgress?: boolean;
  isPercentProgression?: boolean;
  hideButton?: boolean;
}

export const TAB_CONFIG: TabConfig[] = TABS.map(tabId => {
  return {
    tabId,
    hasProgress: !NO_PROGRESSION_TABS.includes(tabId as (typeof NO_PROGRESSION_TABS)[number]),
    isPercentProgression: PERCENT_PROGRESSION_TABS.includes(tabId as (typeof PERCENT_PROGRESSION_TABS)[number]),
    hideButton: tabId === "Stats",
  };
});
