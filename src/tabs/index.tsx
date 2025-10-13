import type { TabDefinition } from "./types";
import { StatsTab } from "./StatsTab";
import { GenericTab, getGenericExtra } from "./GenericTab";
import { HuntersJournalTab, getHuntersJournalExtra } from "./HuntersJournalTab";
import { JsonEditorTab } from "./JsonEditorTab";

// Helper function to create generic tab definitions
function createGenericTab(tabLabel: string, options = { useCount: false }): TabDefinition {
  const { useCount } = options;
  return {
    id: tabLabel as any, // Cast to TabId since we know these match
    tabLabel,
    render: props => <GenericTab {...props} tabLabel={tabLabel} />,
    getExtra: ({ parsedJson, decrypted }) => getGenericExtra({ parsedJson, decrypted, tabLabel, useCount }),
  };
}

export const tabDefinitions: TabDefinition[] = [
  { id: "Stats", tabLabel: "Stats", render: props => <StatsTab {...props} /> },
  createGenericTab("Mask Shards"),
  createGenericTab("Spool Fragments"),
  createGenericTab("Upgrades"),
  createGenericTab("Tools"),
  createGenericTab("Crests"),
  createGenericTab("Ancestral Arts"),
  createGenericTab("Relics", { useCount: true }),
  createGenericTab("Fleas", { useCount: true }),
  createGenericTab("Memory Lockets", { useCount: true }),
  createGenericTab("Craftmetals", { useCount: true }),
  createGenericTab("Keys", { useCount: true }),
  createGenericTab("Quests", { useCount: true }),
  createGenericTab("Bosses", { useCount: true }),
  { id: "Hunter's Journal", tabLabel: "Hunter's Journal", render: props => <HuntersJournalTab {...props} />, getExtra: getHuntersJournalExtra },
  { id: "JSON Editor", tabLabel: "JSON Editor", render: props => <JsonEditorTab {...props} /> },
];
