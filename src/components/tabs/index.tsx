import type { TabDefinition } from "./types";
import { StatsTab } from "./StatsTab";
import { GenericTab } from "./GenericTab";
import { HuntersJournalTab } from "./HuntersJournalTab";
import { TabProgress } from "../TabBar/TabProgress";
import { JsonEditorTab } from "./JsonEditorTab";

// Helper function to create generic tab definitions
function createGenericTab(tabLabel: string, options = { useCount: false }): TabDefinition {
  const { useCount } = options;
  return {
    id: tabLabel as any, // Cast to TabId since we know these match
    tabLabel,
    render: props => <GenericTab {...props} tabLabel={tabLabel} />,
    getProgress: ({ parsedJson, decrypted }) => <TabProgress parsedJson={parsedJson} decrypted={decrypted} tabLabel={tabLabel} useCount={useCount} />,
  };
}

export const tabDefinitions: TabDefinition[] = [
  { id: "Stats", tabLabel: "Stats", render: props => <StatsTab {...props} /> },
  createGenericTab("Masks & Spools"),
  createGenericTab("Abilities"),
  createGenericTab("Upgrades"),
  createGenericTab("Tools"),
  createGenericTab("Crests"),
  createGenericTab("Relics", { useCount: true }),
  createGenericTab("Lost Fleas", { useCount: true }),
  createGenericTab("Memory Lockets", { useCount: true }),
  createGenericTab("Craftmetals", { useCount: true }),
  createGenericTab("Keys", { useCount: true }),
  createGenericTab("Quests", { useCount: true }),
  createGenericTab("Bosses", { useCount: true }),
  { id: "Hunter's Journal", tabLabel: "Hunter's Journal", render: props => <HuntersJournalTab {...props} />, getProgress: ({ parsedJson, decrypted }) => <TabProgress parsedJson={parsedJson} decrypted={decrypted} tabLabel="Hunter's Journal" isHuntersJournal={true} /> },
  { id: "Save Editor", tabLabel: "Save Editor", render: props => <JsonEditorTab {...props} /> },
];
