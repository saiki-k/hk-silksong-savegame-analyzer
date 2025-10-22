import { type ReactNode } from "react";

export type PlatformId = "Windows" | "macOS" | "Linux" | "GamePass" | "SteamDeck" | "Switch";

export type PlatformOption = {
  id: PlatformId;
  label: string;
  icon: string;
  saveFilePath: string;
  note?: ReactNode;
};

const genericNote = (
  <>
    <span>
      For Steam, your save files (<span className="text-orange-400 font-mono">user_.dat</span>) will be in a sub-folder
      of your <span className="text-orange-400 font-mono">SteamID</span>. For non-Steam builds, save files will be in a{" "}
      <span className="text-orange-400 font-mono">default</span> sub-folder. You can also check your{" "}
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
);

export const PLATFORM_OPTIONS: PlatformOption[] = [
  {
    id: "Windows",
    label: "Windows",
    icon: "🪟",
    saveFilePath: "%USERPROFILE%/AppData/LocalLow/Team Cherry/Hollow Knight Silksong/",
    note: genericNote,
  },
  {
    id: "macOS",
    label: "macOS",
    icon: "🍎",
    saveFilePath: "~/Library/Application Support/unity.Team-Cherry.Silksong/",
    note: genericNote,
  },
  {
    id: "Linux",
    label: "Linux",
    icon: "🐧",
    saveFilePath: "~/.config/unity3d/Team Cherry/Hollow Knight Silksong/",
    note: genericNote,
  },
  {
    id: "GamePass",
    label: "Game Pass (Windows)",
    icon: "💻",
    saveFilePath: "%LOCALAPPDATA%/Packages/TeamCherry.Silksong_y4jvztpgccj42/SystemAppData/wgs/",
    note: "Savegame file has a really long name and doesn't have a file extension.",
  },
  {
    id: "SteamDeck",
    label: "Steam Deck (Linux)",
    icon: "🎮",
    saveFilePath: "~/.local/share/Team Cherry/Hollow Knight Silksong/",
    note: genericNote,
  },
  {
    id: "Switch",
    label: "Nintendo Switch",
    icon: "🍄",
    saveFilePath: "sdmc:/atmosphere/contents/<title-id>/saves/hollow_knight_silksong/",
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
