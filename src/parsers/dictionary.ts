import type { ParsingInfo, ParsingInfoMulti, TrackableCategory } from './types';

import { stats } from './categories/stats';
import { maskShards } from './categories/maskShards';
import { spoolFragments } from './categories/spoolFragments';
import { upgrades } from './categories/upgrades';
import { tools } from './categories/tools';
import { crests } from './categories/crests';
import { ancestralArts } from './categories/ancestralArts';
import { relics } from './categories/relics';
import { fleas } from './categories/fleas';
import { memoryLockets } from './categories/memoryLockets';
import { craftmetals } from './categories/craftmetals';
import { bosses } from './categories/bosses';
import { keys } from './categories/keys';
import { quests } from './categories/quests';
import { huntersJournal } from './categories/huntersJournal';

export const CATEGORIES: TrackableCategory[] = [
  stats,
  maskShards,
  spoolFragments,
  upgrades,
  tools,
  crests,
  ancestralArts,
  relics,
  fleas,
  memoryLockets,
  craftmetals,
  bosses,
  keys,
  quests,
  huntersJournal
];

// Check if a category item is unlocked in the save data
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

  const playerData = saveData.playerData ?? {};

  const typeHandlers = {
    flag: (flagName: string) => {
      const val = !!playerData[flagName];
      return { unlocked: val };
    },

    flagMulti: (flagNames: string[]) => {
      let unlocked = false;
      for (const flagName of flagNames) {
        if (!!playerData[flagName]) {
          unlocked = true;
          break;
        }
      }
      return { unlocked };
    },

    flagInt: ([flagName, value]: [string, number]) => {
      const actual = playerData[flagName] ?? 0;
      return { unlocked: actual >= value };
    },

    flagReturn: (flagName: string) => {
      const val = !!playerData[flagName];
      return { unlocked: val, returnValue: playerData[flagName] };
    },

    tool: (toolNames: string[]) => {
      const tools = playerData?.Tools?.savedData || [];
      let unlocked = false;
      for (const name of toolNames) {
        const foundTool = tools.find((t: any) => t?.Name === name);
        if (foundTool && !!foundTool?.Data?.IsUnlocked) {
          unlocked = true;
          break;
        }
      }
      return { unlocked };
    },

    journal: ([entryName, _]: [string, number]) => {
      const journal = playerData?.EnemyJournalKillData?.list || [];
      let unlocked = false;
      let killsAchieved = 0;

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
      const crest = playerData?.ToolEquips?.savedData || [];
      const foundCrest = crest.find((t: any) => t?.Name === crestName);
      return { unlocked: !!foundCrest?.Data?.IsUnlocked };
    },

    collectable: (itemName: string) => {
      const collectableEntry = playerData.Collectables?.savedData?.find(
        (x: any) => x.Name === itemName
      );
      const amount = collectableEntry?.Data?.Amount ?? 0;
      return { unlocked: amount > 0 };
    },

    relict: (relicName: string) => {
      const relics = playerData?.Relics?.savedData || [];
      const foundRelict = relics.find((r: any) => r?.Name === relicName);
      return { unlocked: !!foundRelict?.Data?.IsCollected };
    },

    quest: (questName: string) => {
      const questEntry = playerData.QuestCompletionData?.savedData?.find((x: any) => x.Name === questName);
      return { unlocked: questEntry?.Data?.IsCompleted ?? false };
    },

    sceneData: ([sceneName, Id, inverse = false]: [string, string, boolean?]) => {
      const sceneData = saveData.sceneData || {};
      const allEntries = sceneData.persistentBools?.serializedList || [];
      const match = allEntries.find((x: any) => x.SceneName === sceneName && x.ID === Id);
      return { unlocked: inverse ? match?.Value === false : match?.Value === true };
    },

    sceneVisited: (sceneName: string) => {
      return { unlocked: !!playerData?.scenesVisited?.includes(sceneName) };
    },
  };
  // @ts-ignore
  return typeHandlers[itemParsingInfo.type](itemParsingInfo.internalId);
}