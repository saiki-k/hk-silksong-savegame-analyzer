import { Button } from "@/components/ui/Button";
import { cn } from "@/utils";

interface PillButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  selected?: boolean;
  className?: string;
  children: React.ReactNode;
}

const pillButtonStyles = {
  base: "px-3 py-1 rounded text-xs font-semibold transition-all duration-200 border",
  selected: "bg-blue-500/20 text-blue-300 border-blue-400/40 shadow-sm shadow-blue-500/10 cursor-pointer",
  unselected:
    "bg-gray-700/30 text-gray-400 border-gray-600/30 hover:border-gray-500/50 hover:text-gray-300 cursor-pointer",
  disabled: "bg-gray-700/30 text-gray-600 border-gray-600/30 opacity-50 cursor-not-allowed",
} as const;

export function PillButton({
  children,
  onClick,
  disabled = false,
  selected = false,
  className,
  ...props
}: PillButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  let pillStyle: string = pillButtonStyles.unselected;

  if (disabled) {
    pillStyle = pillButtonStyles.disabled;
  } else if (selected) {
    pillStyle = pillButtonStyles.selected;
  }

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(pillButtonStyles.base, pillStyle, className)}
      aria-pressed={selected}
      {...props}
    >
      {children}
    </Button>
  );
}
