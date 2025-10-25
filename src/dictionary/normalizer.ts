import type {
  TrackableCategory,
  NormalisedDictMap,
  NormalizedCategory,
  NormalizedSection,
  NormalizedItem,
} from "./types";

export function normalizeDictionary(categories: TrackableCategory[]): NormalisedDictMap {
  const result: NormalisedDictMap = {};

  for (const category of categories) {
    const normalizedCategory: NormalizedCategory = {
      name: category.name,
      description: category.description,
      totalPercent: 0,
      totalCount: 0,
      sections: {},
    };

    for (const section of category.sections) {
      const normalizedSection: NormalizedSection = {
        name: section.name || "default",
        description: section.description,
        descriptionMarkup: section.descriptionMarkup,
        totalPercent: 0,
        totalCount: 0,
        act_0: {},
        act_1: {},
        act_2: {},
        act_3: {},
      };

      for (const item of section.items) {
        // Derive game mode flags from existing properties
        const normalizedItem: NormalizedItem = {
          ...item,
          isClassicModeItem: !item.onlyFoundInSteelSoulMode,
          isSteelSoulModeItem: !item.onlyFoundInClassicMode,
        };

        const actKey = `act_${item.whichAct}` as "act_0" | "act_1" | "act_2" | "act_3";
        normalizedSection[actKey][item.name] = normalizedItem;

        normalizedSection.totalCount++;
        normalizedSection.totalPercent += item.completionPercent ?? 0;
      }

      const sectionKey = section.name || "default";
      normalizedCategory.sections[sectionKey] = normalizedSection;
      normalizedCategory.totalCount += normalizedSection.totalCount;
      normalizedCategory.totalPercent += normalizedSection.totalPercent;
    }

    result[category.name] = normalizedCategory;
  }

  return result;
}
