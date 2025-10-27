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
    ? `blur-sm ${onGroupHover ? "group-hover:blur-none group-hover:delay-350 group-hover:duration-350" : "hover:blur-none hover:delay-350 hover:duration-350"} transition-all duration-100 ease-in delay-0`
    : "";
}
