export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getBlurClassNames({ shouldBlur }: { shouldBlur: boolean }): string {
  return shouldBlur ? "blur-sm group-hover:blur-none transition duration-100" : "";
}
