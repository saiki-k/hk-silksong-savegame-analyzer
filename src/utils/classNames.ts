export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getHoverBlurClassNames({
  shouldBlur,
  onGroupHover = true,
}: {
  shouldBlur: boolean;
  onGroupHover?: boolean;
}): string {
  return shouldBlur
    ? `blur-sm ${onGroupHover ? "group-hover:blur-none" : "hover:blur-none"} transition duration-100`
    : "";
}
