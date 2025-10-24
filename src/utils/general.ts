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

export function getActFilterText(actFilter?: Set<1 | 2 | 3>, { returnEmpty = false }: { returnEmpty?: boolean } = {}): string {
  if (returnEmpty) return "";

  if (!actFilter || actFilter.size === 0) {
    return "from zero ⚠️ Acts";
  } else if (actFilter.size === 3) {
    return "from all Acts";
  } else {
    const acts = Array.from(actFilter)
      .sort()
      .map(act => `Act ${["I", "II", "III"][act - 1]}`);
    return `from ${acts.join(", ")}`;
  }
}

export function toggleActInFilter(actFilter: Set<1 | 2 | 3>, act: 1 | 2 | 3): Set<1 | 2 | 3> {
  // Prevent toggling an act if it's the only one selected
  const shouldNotToggleAct = actFilter.size === 1 && actFilter.has(act);
  if (shouldNotToggleAct) return actFilter;

  const newFilter = new Set(actFilter);
  if (newFilter.has(act)) {
    newFilter.delete(act);
  } else {
    newFilter.add(act);
  }
  return newFilter;
}
