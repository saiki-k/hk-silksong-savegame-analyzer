import type { TrackableCategory } from "../types";

export const stats: TrackableCategory = {
  name: "Stats",
  description: "Statistics tracked in the game.",
  items: [
    {
      name: "Playtime",
      whichAct: 0,
      location: "",
      parsingInfo: { type: "flagReturn", internalId: "playTime" },
      mapLink: "",
    },
    {
      name: "Rosaries",
      whichAct: 0,
      location: "",
      parsingInfo: { type: "flagReturn", internalId: "geo" },
      mapLink: "",
    },
    {
      name: "Shell Shards",
      whichAct: 0,
      location: "",
      parsingInfo: { type: "flagReturn", internalId: "ShellShards" },
      mapLink: "",
    },
    {
      name: "Game Mode",
      whichAct: 0,
      location: "",
      parsingInfo: { type: "flagReturn", internalId: "permadeathMode" },
      mapLink: "",
    },
  ],
};
