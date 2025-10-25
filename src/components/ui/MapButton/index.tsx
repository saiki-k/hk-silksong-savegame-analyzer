import { Button } from "@/components/ui";
import { cn } from "@/utils";

interface MapButtonProps {
  mapLink?: string;
  disabled?: boolean;
}

const mapButtonStyles = {
  base: "flex-1 min-w-[48px] py-2 rounded font-semibold transition-all duration-200 text-xs border",
  enabled:
    "bg-gray-700/30 text-gray-400 border-gray-600/30 hover:border-gray-500/50 hover:text-gray-300 cursor-pointer",
  disabled: "bg-gray-700/30 text-gray-600 border-gray-600/30 opacity-50 cursor-not-allowed",
} as const;

export function MapButton({ mapLink, disabled }: MapButtonProps) {
  const handleClick = () => {
    if (mapLink) {
      window.open(mapLink, "_blank", "noopener,noreferrer");
    }
  };

  const isEnabled = mapLink && !disabled;

  return (
    <Button
      className={cn(mapButtonStyles.base, isEnabled ? mapButtonStyles.enabled : mapButtonStyles.disabled)}
      onClick={handleClick}
      disabled={!isEnabled}
      tabIndex={isEnabled ? 0 : -1}
      aria-label={isEnabled ? "Open map location" : "Map location not available"}
    >
      Map
    </Button>
  );
}
