import { useState } from "react";
import Sherma from "@/assets/Sherma.png";
import ShermaGif from "@/assets/Sherma.gif";
import { cn } from "@/utils";

type NoValidSaveVariant = "NO_SAVE_FILE" | "CORRUPTED_SAVE_DATA";

interface NoValidSaveProps {
  variant?: NoValidSaveVariant;
}

const VARIANT_CONFIG = {
  NO_SAVE_FILE: {
    defaultMessage: "No save file loaded.",
    hoverMessage: "🎵✨ Manifesting the save file...",
  },
  CORRUPTED_SAVE_DATA: {
    defaultMessage: "Corrupted save data.",
    hoverMessage: "🎵✨ Using the power of song...",
  },
} as const;

export function NoSaveDataAvailable({ variant = "NO_SAVE_FILE" }: NoValidSaveProps) {
  const [isHovered, setIsHovered] = useState(false);
  const config = VARIANT_CONFIG[variant];

  return (
    <div className="text-white text-center text-lg relative">
      {/* Invisible hover area */}
      <div
        className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-32 pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <img
        src={isHovered ? ShermaGif : Sherma}
        alt="Sherma"
        className={cn(
          "absolute left-1/2 top-1/2 object-contain opacity-60 drop-shadow-[0_0_60px_rgba(59,130,246,0.3)] pointer-events-none hover:opacity-80",
          !isHovered ? "-translate-y-12 -translate-x-56 w-24 h-24" : "-translate-y-17.25 -translate-x-60 w-32 h-32"
        )}
      />
      <span>{!isHovered ? config.defaultMessage : config.hoverMessage}</span>
    </div>
  );
}
