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
    ? `blur-sm ${onGroupHover ? "group-hover:blur-none group-hover:delay-500 group-hover:duration-800" : "hover:blur-none hover:delay-500 hover:duration-500"} transition-all duration-100 ease-in delay-0`
    : "";
}
