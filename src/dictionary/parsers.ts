import type { ParsingInfo, ParsingInfoMulti } from "./types";

function isParsingInfoMulti(parsingInfo: ParsingInfo | ParsingInfoMulti): parsingInfo is ParsingInfoMulti {
  return Array.isArray(parsingInfo);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isItemUnlockedInPlayerSave(
  itemParsingInfo: ParsingInfo | ParsingInfoMulti,
  saveData: any
): { unlocked: boolean; returnValue?: number } {
  if (isParsingInfoMulti(itemParsingInfo)) {
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

  const playerData = (saveData as any).playerData ?? {};

  const typeHandlers = {
    flag: (flagName: string) => {
      const val = !!playerData[flagName];
      return { unlocked: val };
    },

    flagMulti: (flagNames: string[]) => {
      let unlocked = false;
      for (const flagName of flagNames) {
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
      const tools = (playerData as any)?.Tools?.savedData || [];
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

    journal: ([entryName]: [string, number]) => {
      const journal = (playerData as any)?.EnemyJournalKillData?.list || [];
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
      const crest = (playerData as any)?.ToolEquips?.savedData || [];
      const foundCrest = crest.find((t: any) => t?.Name === crestName);
      return { unlocked: !!foundCrest?.Data?.IsUnlocked };
    },

    collectable: (itemName: string) => {
      const collectableEntry = (playerData as any).Collectables?.savedData?.find((x: any) => x.Name === itemName);
      const amount = collectableEntry?.Data?.Amount ?? 0;
      return { unlocked: amount > 0 };
    },

    relict: (relicName: string) => {
      const relics = (playerData as any)?.Relics?.savedData || [];
      const foundRelict = relics.find((r: any) => r?.Name === relicName);
      return { unlocked: !!foundRelict?.Data?.IsCollected };
    },

    quest: (questName: string) => {
      const questEntry = (playerData as any).QuestCompletionData?.savedData?.find((x: any) => x.Name === questName);
      return { unlocked: questEntry?.Data?.IsCompleted ?? false };
    },

    sceneData: ([sceneName, id, inverse = false]: [string, string, boolean?]) => {
      const sceneData = (saveData as any).sceneData || {};
      const allEntries = sceneData.persistentBools?.serializedList || [];
      const match = allEntries.find((x: any) => x.SceneName === sceneName && x.ID === id);
      return { unlocked: inverse ? match?.Value === false : match?.Value === true };
    },

    sceneVisited: (sceneName: string) => {
      return { unlocked: !!(playerData as any)?.scenesVisited?.includes(sceneName) };
    },

    mementoDeposit: (mementoName: string) => {
      const mementos = (playerData as any)?.MementosDeposited?.savedData ?? [];
      const unlocked = mementos.some((entry: any) => entry.Name === mementoName && entry.Data?.IsDeposited);
      return { unlocked };
    },
  };
  // @ts-expect-error - Dynamic function call based on parsing type
  return typeHandlers[itemParsingInfo.type](itemParsingInfo.internalId);
}

export function isItemInCurrentGameMode(
  item: { onlyFoundInClassicMode?: boolean; onlyFoundInSteelSoulMode?: boolean },
  saveData: any
): boolean {
  const playerData = (saveData as any).playerData ?? {};
  const isCurrentModeClassic = playerData.permadeathMode === 0;

  const itemIsNotInCurrentGameMode =
    (item.onlyFoundInSteelSoulMode && isCurrentModeClassic) || (item.onlyFoundInClassicMode && !isCurrentModeClassic);

  return !itemIsNotInCurrentGameMode;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
