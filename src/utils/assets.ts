const assetModules = import.meta.glob("/src/assets/**/*.{png,jpg,jpeg,gif,webp}", {
  eager: false,
  query: "?url",
  import: "default",
});

const cache = new Map<string, string>();

export async function getAssetUrl(path: string): Promise<string> {
  const fullPath = `/src/assets/${path}`;

  if (cache.has(fullPath)) {
    return cache.get(fullPath)!;
  }

  const importFn = assetModules[fullPath];
  if (!importFn) return "";

  const url = (await importFn()) as string;
  cache.set(fullPath, url);
  return url;
}
