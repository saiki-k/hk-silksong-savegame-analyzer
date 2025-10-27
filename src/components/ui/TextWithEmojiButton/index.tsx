import { Button } from "@/components/ui";
import { cn } from "@/utils";

interface TextWithEmojiButtonProps {
  text: string;
  emoji: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  emojiPosition?: "left" | "right";
  emojiClassName?: string;
  className?: string;
}

const textWithEmojiButtonStyles = {
  interactive: "text-blue-300 hover:text-blue-200 transition-colors cursor-pointer",
  textUnderline:
    "font-medium leading-none underline decoration-dotted decoration-blue-400/30 hover:decoration-blue-300/60 transition-all whitespace-nowrap",
  group: "group flex items-center gap-2",
  emoji: {
    base: "text-lg leading-none opacity-60 group-hover:opacity-80 transition-opacity",
  },
  disabled: "text-gray-600 cursor-not-allowed opacity-50",
} as const;

export function TextWithEmojiButton({
  text,
  emoji,
  onClick,
  disabled = false,
  emojiPosition = "right",
  emojiClassName,
}: TextWithEmojiButtonProps) {
  const baseClassName = cn(
    textWithEmojiButtonStyles.group,
    disabled ? textWithEmojiButtonStyles.disabled : textWithEmojiButtonStyles.interactive
  );

  const textClassName = cn(textWithEmojiButtonStyles.textUnderline, disabled && "no-underline");

  const content = (
    <>
      {emojiPosition === "left" && (
        <span className={cn(textWithEmojiButtonStyles.emoji.base, emojiClassName)}>{emoji}</span>
      )}
      <span className={textClassName}>{text}</span>
      {emojiPosition === "right" && (
        <span className={cn(textWithEmojiButtonStyles.emoji.base, emojiClassName)}>{emoji}</span>
      )}
    </>
  );

  return (
    <Button onClick={onClick} disabled={disabled} className={baseClassName} aria-label={text}>
      {content}
    </Button>
  );
}
