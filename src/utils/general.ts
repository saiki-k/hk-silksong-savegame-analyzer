export function formatPercent(value: number): string {
  return `${Number(value.toFixed(2))}%`;
}

export function formatSecondsToHMS(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h, m, s].map(unit => String(unit).padStart(2, "0")).join(":");
}

interface getCategoryDisplayStatusTextParams {
  inShowEverythingMode: boolean;
  showUnlocked: boolean;
  showSpoilers: boolean;
  actFilter?: Set<1 | 2 | 3>;
  itemTypeText?: "items" | "entries";
}

export function getCategoryDisplayStatusText({
  inShowEverythingMode,
  showUnlocked,
  showSpoilers,
  actFilter,
  itemTypeText = "items",
}: getCategoryDisplayStatusTextParams): string {
  let itemsText = "";
  if (inShowEverythingMode || showUnlocked) {
    itemsText = `all ${itemTypeText}`;
  } else {
    itemsText = itemTypeText === "entries" ? "incomplete entries" : "missing items";
  }

  const spoilersText = showSpoilers ? "spoilers shown" : "spoilers blurred (until you hover over them)";

  let actText = "";
  if (!actFilter || actFilter.size === 0) {
    actText = " from zero ⚠️ Acts";
  } else if (actFilter.size === 3) {
    actText = " from all Acts";
  } else {
    const acts = Array.from(actFilter)
      .sort()
      .map(act => `Act ${["I", "II", "III"][act - 1]}`);
    actText = ` from ${acts.join(", ")}`;
  }

  return `Showing ${itemsText}${actText}, with ${spoilersText}.`;
}
