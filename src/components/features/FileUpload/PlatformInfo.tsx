import { useState } from "react";
import type { ReactNode } from "react";
import { Button } from "../../ui/Button";
import { cn } from "../../../utils/classNames";

type PlatformId = "Windows" | "macOS" | "Linux" | "GamePass" | "SteamDeck" | "Switch";

type PlatformOption = {
  id: PlatformId;
  label: string;
  icon: string;
  savefilePath: string;
  note?: ReactNode;
};

const PLATFORM_OPTIONS: PlatformOption[] = [
  {
    id: "Windows",
    label: "Windows",
    icon: "🪟",
    savefilePath: "%USERPROFILE%/AppData/LocalLow/Team Cherry/Hollow Knight Silksong/",
    note: (
      <>
        <span>
          For Steam, your savefiles (<span className="text-orange-400 font-mono">user_.dat</span>) will be in a
          sub-folder of your <span className="text-orange-400 font-mono">SteamID</span>. For non-Steam builds, savefiles
          will be in a <span className="text-orange-400 font-mono">default</span> sub-folder. You can also check your{" "}
          <a
            href="https://store.steampowered.com/account/remotestorageapp/?appid=1030300"
            className="text-blue-400 hover:text-blue-300 underline"
            target="_blank"
            rel="noreferrer"
          >
            Steam Cloud
          </a>{" "}
          saves.
        </span>
      </>
    ),
  },
  {
    id: "macOS",
    label: "macOS",
    icon: "🍎",
    savefilePath: "~/Library/Application Support/unity.Team-Cherry.Silksong/",
    note: (
      <>
        <span>
          For Steam, your savefiles (<span className="text-orange-400 font-mono">user_.dat</span>) will be in a
          sub-folder of your <span className="text-orange-400 font-mono">SteamID</span>. For non-Steam builds, savefiles
          will be in a <span className="text-orange-400 font-mono">default</span> sub-folder. You can also check your{" "}
          <a
            href="https://store.steampowered.com/account/remotestorageapp/?appid=1030300"
            className="text-blue-400 hover:text-blue-300 underline"
            target="_blank"
            rel="noreferrer"
          >
            Steam Cloud
          </a>{" "}
          saves.
        </span>
      </>
    ),
  },
  {
    id: "Linux",
    label: "Linux",
    icon: "🐧",
    savefilePath: "~/.config/unity3d/Team Cherry/Hollow Knight Silksong/",
    note: (
      <>
        <span>
          For Steam, your savefiles (<span className="text-orange-400 font-mono">user_.dat</span>) will be in a
          sub-folder of your <span className="text-orange-400 font-mono">SteamID</span>. For non-Steam builds, savefiles
          will be in a <span className="text-orange-400 font-mono">default</span> sub-folder. You can also check your{" "}
          <a
            href="https://store.steampowered.com/account/remotestorageapp/?appid=1030300"
            className="text-blue-400 hover:text-blue-300 underline"
            target="_blank"
            rel="noreferrer"
          >
            Steam Cloud
          </a>{" "}
          saves.
        </span>
      </>
    ),
  },
  {
    id: "GamePass",
    label: "Game Pass (Windows)",
    icon: "💻",
    savefilePath: "%LOCALAPPDATA%/Packages/TeamCherry.Silksong_y4jvztpgccj42/SystemAppData/wgs/",
    note: "Savegame file has a really long name and doesn't have a file extension.",
  },
  {
    id: "SteamDeck",
    label: "Steam Deck (Linux)",
    icon: "🎮",
    savefilePath: "~/.local/share/Team Cherry/Hollow Knight Silksong/",
    note: (
      <>
        <span>
          Your savefiles (<span className="text-orange-400 font-mono">user_.dat</span>) will be in a sub-folder of your{" "}
          <span className="text-orange-400 font-mono">SteamID</span>. You can also check your{" "}
          <a
            href="https://store.steampowered.com/account/remotestorageapp/?appid=1030300"
            className="text-blue-400 hover:text-blue-300 underline"
            target="_blank"
            rel="noreferrer"
          >
            Steam Cloud
          </a>{" "}
          saves.
        </span>
      </>
    ),
  },
  {
    id: "Switch",
    label: "Nintendo Switch",
    icon: "🍄",
    savefilePath: "sdmc:/atmosphere/contents/<title-id>/saves/hollow_knight_silksong/",
    note: (
      <>
        Not a simple process! This requires Homebrew and JKSV. Here's a{" "}
        <a
          className="text-blue-400 hover:text-blue-300 underline"
          href="https://www.reddit.com/r/HollowKnight/comments/1dacmy1/gamesave_from_switch_to_steam/"
          rel="noreferrer"
          target="_blank"
        >
          Reddit guide
        </a>
        .
      </>
    ),
  },
];

interface PlatformPathProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const platformPathStyles = {
  base: "block bg-gray-900/50 rounded px-3 py-2 text-xs text-blue-300 font-mono break-all cursor-pointer hover:bg-gray-800/50 transition-colors",
} as const;

function PlatformPath({ children, onClick, className, ...props }: PlatformPathProps) {
  return (
    <code onClick={onClick} className={cn(platformPathStyles.base, className)} {...props}>
      {children}
    </code>
  );
}

interface PlatformInfoProps {
  onCopyPath: (path: string) => void;
}

export function PlatformInfo({ onCopyPath }: PlatformInfoProps) {
  const [activePlatformId, setActivePlatformId] = useState<PlatformId>("Windows");
  const [copiedId, setCopiedId] = useState<PlatformId | null>(null);

  const activePlatform = PLATFORM_OPTIONS.find(platform => platform.id === activePlatformId) ?? PLATFORM_OPTIONS[0];

  const handleCopyPath = () => {
    onCopyPath(activePlatform.savefilePath);
    setCopiedId(activePlatform.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {PLATFORM_OPTIONS.map(platform => {
          const isActive = platform.id === activePlatform.id;

          return (
            <Button
              key={platform.id}
              type="button"
              onClick={() => setActivePlatformId(platform.id)}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1.5 rounded-md border font-medium text-xs transition-colors duration-200",
                isActive
                  ? "bg-blue-500/20 text-white border-blue-500/50"
                  : "bg-gray-800/40 text-gray-400 border-gray-700/50 hover:text-gray-300 hover:bg-gray-700/40"
              )}
              aria-pressed={isActive}
            >
              <span className="text-sm">{platform.icon}</span>
              <span className="flex-1 text-left text-xs">{platform.label}</span>
            </Button>
          );
        })}
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Savefile Location</h3>
            {copiedId === activePlatform.id && <span className="text-xs text-green-400">✓ Copied!</span>}
          </div>
          <PlatformPath onClick={handleCopyPath}>{activePlatform.savefilePath}</PlatformPath>
        </div>

        {activePlatform.note && <p className="text-xs text-gray-400 leading-relaxed">{activePlatform.note}</p>}
      </div>
    </div>
  );
}
