import type { ParsingInfo, ParsingInfoMulti, NormalisedTrackableCategory, TrackableCategory } from './types';

import { stats } from './categories/stats';
import { masksAndSpools } from './categories/masksAndSpools';
import { abilities } from './categories/abilities';
import { upgrades } from './categories/upgrades';
import { tools } from './categories/tools';
import { crests } from './categories/crests';
import { fleas } from './categories/fleas';
import { relics } from './categories/relics';
import { memoryLockets } from './categories/memoryLockets';
import { craftmetals } from './categories/craftmetals';
import { mossberries } from './categories/mossberries';
import { silkeaters } from './categories/silkeaters';
import { keys } from './categories/keys';
import { mementos } from './categories/mementos';
import { maps } from './categories/maps';
import { bellways } from './categories/bellways';
import { ventricaStations } from './categories/ventricaStations';
import { quests } from './categories/quests';
import { bosses } from './categories/bosses';
import { huntersJournal } from './categories/huntersJournal';

export const CATEGORIES: (NormalisedTrackableCategory | TrackableCategory)[] = [
  stats,
  masksAndSpools,
  abilities,
  upgrades,
  tools,
  crests,
  fleas,
  relics,
  memoryLockets,
  craftmetals,
  mossberries,
  silkeaters,
  keys,
  mementos,
  maps,
  bellways,
  ventricaStations,
  quests,
  bosses,
  huntersJournal
];

// Check if a category item is unlocked in the save data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isItemUnlockedInPlayerSave(itemParsingInfo: ParsingInfo | ParsingInfoMulti, saveData: any): { unlocked: boolean, returnValue?: number } {
  // Handle ParsingInfoMulti
  if (Array.isArray(itemParsingInfo)) {
    let unlocked = false;
    let returnValue: number | undefined;

    for (const parsingInfo of itemParsingInfo) {
      const result = isItemUnlockedInPlayerSave(parsingInfo, saveData);
      if (result.unlocked) {
        unlocked = true;
        returnValue = result.returnValue;
        break;
      }
    }

    return { unlocked, returnValue };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerData = (saveData as any).playerData ?? {};

  const typeHandlers = {
    flag: (flagName: string) => {
      const val = !!playerData[flagName];
      return { unlocked: val };
    },

    flagMulti: (flagNames: string[]) => {
      let unlocked = false;
      for (const flagName of flagNames) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((playerData as any)[flagName]) {
          unlocked = true;
          break;
        }
      }
      return { unlocked };
    },

    flagInt: ([flagName, value]: [string, number]) => {
      const actual = (playerData[flagName] as number) ?? 0;
      return { unlocked: actual >= value };
    },

    flagReturn: (flagName: string) => {
      const val = !!playerData[flagName];
      return { unlocked: val, returnValue: playerData[flagName] };
    },

    tool: (toolNames: string[]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tools = (playerData as any)?.Tools?.savedData || [];
      let unlocked = false;
      for (const name of toolNames) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const foundTool = tools.find((t: any) => t?.Name === name);
        if (foundTool && !!foundTool?.Data?.IsUnlocked) {
          unlocked = true;
          break;
        }
      }
      return { unlocked };
    },

    journal: ([entryName]: [string, number]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const journal = (playerData as any)?.EnemyJournalKillData?.list || [];
      let unlocked = false;
      let killsAchieved = 0;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const foundEntry = journal.find((t: any) => t?.Name === entryName);
      if (foundEntry) {
        killsAchieved = foundEntry.Record.Kills;
        if (foundEntry.Record.Kills >= 0) {
          unlocked = true;
        }
      } else {
        console.log(`Journal entry not found: ${entryName}`);
      }
      return { unlocked, returnValue: killsAchieved };
    },

    crest: (crestName: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const crest = (playerData as any)?.ToolEquips?.savedData || [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const foundCrest = crest.find((t: any) => t?.Name === crestName);
      return { unlocked: !!foundCrest?.Data?.IsUnlocked };
    },

    collectable: (itemName: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const collectableEntry = (playerData as any).Collectables?.savedData?.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (x: any) => x.Name === itemName
      );
      const amount = collectableEntry?.Data?.Amount ?? 0;
      return { unlocked: amount > 0 };
    },

    relict: (relicName: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const relics = (playerData as any)?.Relics?.savedData || [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const foundRelict = relics.find((r: any) => r?.Name === relicName);
      return { unlocked: !!foundRelict?.Data?.IsCollected };
    },

    quest: (questName: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const questEntry = (playerData as any).QuestCompletionData?.savedData?.find((x: any) => x.Name === questName);
      return { unlocked: questEntry?.Data?.IsCompleted ?? false };
    },

    sceneData: ([sceneName, Id, inverse = false]: [string, string, boolean?]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sceneData = (saveData as any).sceneData || {};
      const allEntries = sceneData.persistentBools?.serializedList || [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const match = allEntries.find((x: any) => x.SceneName === sceneName && x.ID === Id);
      return { unlocked: inverse ? match?.Value === false : match?.Value === true };
    },

    sceneVisited: (sceneName: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { unlocked: !!(playerData as any)?.scenesVisited?.includes(sceneName) };
    },

    mementoDeposit: (mementoName: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mementos = (playerData as any)?.MementosDeposited?.savedData ?? [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const unlocked = mementos.some((entry: any) => entry.Name === mementoName && entry.Data?.IsDeposited);
      return { unlocked };
    },
  };
  // @ts-expect-error - Dynamic function call based on parsing type
  return typeHandlers[itemParsingInfo.type](itemParsingInfo.internalId);
}