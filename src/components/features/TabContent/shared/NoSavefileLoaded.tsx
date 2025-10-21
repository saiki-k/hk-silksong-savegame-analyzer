import { useState } from "react";
import Sherma from "../../../../assets/Sherma.png";
import ShermaGif from "../../../../assets/Sherma.gif";
import { cn } from "../../../../utils/classNames";

export function NoSaveFileLoaded() {
  const [isHovered, setIsHovered] = useState(false);

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
      <span>{!isHovered ? `No save file loaded.` : `Manifesting the save file...`}</span>
    </div>
  );
}
