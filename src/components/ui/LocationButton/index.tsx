import { Button } from "@/components/ui";
import { cn } from "@/utils";

interface LocationButtonProps {
  url: string;
  children: React.ReactNode;
  className?: string;
}

const locationButtonStyles = {
  base: "inline-flex items-center px-2 py-1 bg-gray-700/30 text-gray-400 border border-gray-600/30 hover:border-gray-500/50 hover:text-gray-300 rounded text-xs font-semibold transition-all duration-200 cursor-pointer",
} as const;

export function LocationButton({ url, children, className }: LocationButtonProps) {
  return (
    <Button
      onClick={() => window.open(url, "_blank")}
      className={cn(locationButtonStyles.base, className)}
      aria-label={`Open map location for ${children}`}
    >
      {children}
    </Button>
  );
}
