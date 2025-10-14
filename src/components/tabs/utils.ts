import { CATEGORIES, isItemUnlockedInPlayerSave } from "../../parsers/dictionary";
import type { NormalisedTrackableCategory } from "../../parsers/types";

import type { ProgressData, HuntersJournalProgressData } from "./types";

export function formatPercent(value: number): string {
  return `${Number(value.toFixed(2))}%`;
}

export function formatSecondsToHMS(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h, m, s]
    .map(unit => String(unit).padStart(2, '0'))
    .join(':');
}

export function getGenericProgress({ 
  parsedJson, 
  decrypted, 
  tabLabel,
  isPercentProgress = true
}: { 
  parsedJson: unknown; 
  decrypted: boolean;
  tabLabel: string;
  isPercentProgress?: boolean;
}): ProgressData | null {
  if (!decrypted || !parsedJson) {
    return null;
  }

  const categoryData = CATEGORIES.find(cat => cat.name === tabLabel) as NormalisedTrackableCategory;
  if (!categoryData) {
    return null;
  }

  // Flatten all items from all sections
  const allItems = categoryData.sections.flatMap(section => section.items);

  if (allItems.length === 0) {
    return null;
  }

  if (isPercentProgress) {
    let currentPercent = 0;
    let maxPercent = 0;

    allItems.forEach(item => {
      const percent = item.completionPercent ?? 0;
      maxPercent += percent;
      const { unlocked } = isItemUnlockedInPlayerSave(item.parsingInfo, parsedJson);
      if (unlocked) {
        currentPercent += percent;
      }
    });

    return {
      type: 'percentage',
      current: currentPercent,
      total: maxPercent,
    };
  }

  // Count-based progress
  let unlockedCount = 0;
  
  allItems.forEach(item => {
    const { unlocked } = isItemUnlockedInPlayerSave(item.parsingInfo, parsedJson);
    if (unlocked) {
      unlockedCount += 1;
    }
  });

  return {
    type: 'count',
    current: unlockedCount,
    total: allItems.length
  };
}

export function getHuntersJournalProgress({ parsedJson, decrypted }: { parsedJson: unknown; decrypted: boolean }): HuntersJournalProgressData | null {
  if (!decrypted || !parsedJson) {
    return null;
  }

  const JOURNAL_CATEGORY_NAME = "Hunter's Journal";
  const journalCategory = CATEGORIES.find(cat => cat.name === JOURNAL_CATEGORY_NAME);
  const journalEntries = (journalCategory && 'items' in journalCategory) ? journalCategory.items : [];

  if (journalEntries.length === 0) {
    return null;
  }

  let completed = 0;
  let encountered = 0;

  journalEntries.forEach(entry => {
    const { returnValue: killsAchieved } = isItemUnlockedInPlayerSave(entry.parsingInfo, parsedJson);
    if (
      killsAchieved !== undefined &&
      entry.killsRequired !== undefined &&
      typeof killsAchieved === "number" &&
      killsAchieved > 0
    ) {
      encountered += 1;
      if (killsAchieved >= entry.killsRequired) {
        completed += 1;
      }
    }
  });

  return {
    completed,
    encountered,
    total: journalEntries.length
  };
}