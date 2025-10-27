import { ALL_TRACKED_CATEGORIES } from "@/dictionary";

const TRACKED_CATEGORY_NAMES = ALL_TRACKED_CATEGORIES.map(category => category.name);

const PERCENT_PROGRESSION_CATEGORIES = [
  "Mask Shards",
  "Spool Fragments",
  "Abilities",
  "Upgrades",
  "Tools",
  "Crests",
] as const;

const TABS = [...TRACKED_CATEGORY_NAMES] as const;
const PERCENT_PROGRESSION_TABS = PERCENT_PROGRESSION_CATEGORIES;
const NO_PROGRESSION_TABS = ["Stats"] as const;

export type TabId = (typeof TABS)[number];

export type TabGroup = "core" | "collectibles" | "exploration" | "progression";

interface TabConfig {
  tabId: TabId;
  hasProgress?: boolean;
  hasPercentProgression?: boolean;
  hideButton?: boolean;
  group?: TabGroup;
}

const TAB_GROUPS: Record<TabGroup, TabId[]> = {
  core: ["Mask Shards", "Spool Fragments", "Abilities", "Upgrades", "Tools", "Crests"],
  collectibles: ["Lost Fleas", "Relics", "Memory Lockets", "Craftmetals", "Mossberries", "Silkeaters", "Keys", "Mementos"],
  exploration: ["Maps", "Bellways", "Ventrica Stations"],
  progression: ["Quests", "Bosses", "Hunter's Journal"],
};

export const TAB_CONFIG: TabConfig[] = TABS.map(tabId => {
  const group = (Object.keys(TAB_GROUPS) as TabGroup[]).find(groupKey =>
    TAB_GROUPS[groupKey].includes(tabId as TabId)
  );

  return {
    tabId,
    hasProgress: !NO_PROGRESSION_TABS.includes(tabId as (typeof NO_PROGRESSION_TABS)[number]),
    hasPercentProgression: PERCENT_PROGRESSION_TABS.includes(tabId as (typeof PERCENT_PROGRESSION_TABS)[number]),
    hideButton: tabId === "Stats",
    group,
  };
});

export const GROUP_LABELS: Record<TabGroup, string> = {
  core: "Core Progress",
  collectibles: "Collectibles & Resources",
  exploration: "Exploration & Navigation",
  progression: "Progression & Journal",
};
