import { Button } from "@/components/ui";
import { cn } from "@/utils";
import { toggleButtonStyles } from "./styles";

interface ToggleButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface TextWithEmojiButtonProps extends Omit<ToggleButtonProps, "children"> {
  text: string;
  emoji: string;
  emojiPosition?: "left" | "right";
  emojiClassName?: string;
}

interface PillButtonProps extends ToggleButtonProps {
  selected?: boolean;
}

export function TextWithEmojiButton({
  text,
  emoji,
  onClick,
  disabled = false,
  emojiPosition = "right",
  emojiClassName,
}: TextWithEmojiButtonProps) {
  const baseClassName = cn(
    toggleButtonStyles.group,
    disabled ? toggleButtonStyles.disabled : toggleButtonStyles.interactive
  );

  const textClassName = cn(toggleButtonStyles.textUnderline, disabled && "no-underline");

  const content = (
    <>
      {emojiPosition === "left" && <span className={cn(toggleButtonStyles.emoji.base, emojiClassName)}>{emoji}</span>}
      <span className={textClassName}>{text}</span>
      {emojiPosition === "right" && <span className={cn(toggleButtonStyles.emoji.base, emojiClassName)}>{emoji}</span>}
    </>
  );

  return (
    <Button onClick={onClick} disabled={disabled} className={baseClassName} aria-label={text}>
      {content}
    </Button>
  );
}

export function PillButton({
  children,
  onClick,
  disabled = false,
  selected = false,
  className,
  ...props
}: PillButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  let pillStyle: string = toggleButtonStyles.pill.unselected;

  if (disabled) {
    pillStyle = toggleButtonStyles.pill.disabled;
  } else if (selected) {
    pillStyle = toggleButtonStyles.pill.selected;
  }

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(toggleButtonStyles.pill.base, pillStyle, className)}
      aria-pressed={selected}
      {...props}
    >
      {children}
    </Button>
  );
}
