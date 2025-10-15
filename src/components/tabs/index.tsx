import type { TabId, TabDefinition } from "./types";
import { StatsTab } from "./StatsTab";
import { GenericTab } from "./GenericTab";
import { HuntersJournalTab } from "./HuntersJournalTab";
import { TabProgress } from "../TabBar/TabProgress";
import { JsonEditorTab } from "./JsonEditorTab";

// Helper function to create generic tab definitions
function createGenericTab(tabLabel: string, options = { isPercentProgress: false }): TabDefinition {
  const { isPercentProgress } = options;
  return {
    id: tabLabel as TabId,
    tabLabel,
    render: props => <GenericTab {...props} tabLabel={tabLabel} />,
    getProgress: ({ parsedJson, decrypted }) => <TabProgress parsedJson={parsedJson} decrypted={decrypted} tabLabel={tabLabel} isPercentProgress={isPercentProgress} />,
  };
}

export const tabDefinitions: TabDefinition[] = [
  { id: "Stats", tabLabel: "Stats", render: props => <StatsTab {...props} /> },
  createGenericTab("Masks & Spools", { isPercentProgress: true }),
  createGenericTab("Abilities", { isPercentProgress: true }),
  createGenericTab("Upgrades", { isPercentProgress: true }),
  createGenericTab("Tools", { isPercentProgress: true }),
  createGenericTab("Crests", { isPercentProgress: true }),

  createGenericTab("Lost Fleas"),
  createGenericTab("Relics"),
  createGenericTab("Memory Lockets"),
  createGenericTab("Craftmetals"),
  createGenericTab("Mossberries"),
  createGenericTab("Silkeaters"),
  
  createGenericTab("Keys"),
  createGenericTab("Mementos"),
  createGenericTab("Maps"),
  createGenericTab("Bellways"),
  createGenericTab("Ventrica Stations"),
  createGenericTab("Quests"),
  
  createGenericTab("Bosses"),
  { id: "Hunter's Journal", tabLabel: "Hunter's Journal", render: props => <HuntersJournalTab {...props} />, getProgress: ({ parsedJson, decrypted }) => <TabProgress parsedJson={parsedJson} decrypted={decrypted} tabLabel="Hunter's Journal" isHuntersJournal={true} /> },
  { id: "Save Editor", tabLabel: "Save Editor", render: props => <JsonEditorTab {...props} /> },
];
