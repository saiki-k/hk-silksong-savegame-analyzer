import type { TrackableCategory } from "../types";

export const ventricaStations: TrackableCategory = {
  name: "Ventrica Stations",
  description: "Underground pneumatic transport system that connects major locations within The Citadel.",
  sections: [
    {
      name: "Main",
      description: "",
      items: [
        {
          name: "Terminus",
          whichAct: 2,
          location: "Unlocks after opening any one of the Ventrica Stations.",
          parsingInfo: {
            type: "flagMulti",
            internalId: [
              "UnlockedArboriumTube",
              "UnlockedHangTube",
              "UnlockedSongTube",
              "UnlockedCityBellwayTube",
              "UnlockedUnderTube",
              "UnlockedEnclaveTube",
            ],
          },
          mapLink: "478426",
        },
        {
          name: "Memorium",
          whichAct: 2,
          location: "Unlocks after paying a toll of 80 Rosaries.",
          parsingInfo: { type: "flag", internalId: "UnlockedArboriumTube" },
          mapLink: "478425",
        },
        {
          name: "High Halls",
          whichAct: 2,
          location: "Unlocks after paying a toll of 80 Rosaries.",
          parsingInfo: { type: "flag", internalId: "UnlockedHangTube" },
          mapLink: "478445",
        },
        {
          name: "First Shrine",
          whichAct: 2,
          location: "Unlocks after paying a toll of 80 Rosaries.",
          parsingInfo: { type: "flag", internalId: "UnlockedEnclaveTube" },
          mapLink: "478427",
        },
        {
          name: "Choral Chambers",
          whichAct: 2,
          location: "Unlocks after paying a toll of 80 Rosaries.",
          parsingInfo: { type: "flag", internalId: "UnlockedSongTube" },
          mapLink: "478424",
        },
        {
          name: "Grand Bellway",
          whichAct: 2,
          location: "Unlocks after paying a toll of 80 Rosaries.",
          parsingInfo: { type: "flag", internalId: "UnlockedCityBellwayTube" },
          mapLink: "478376",
        },
        {
          name: "Underworks",
          whichAct: 2,
          location: "Unlocks after paying a toll of 80 Rosaries.",
          parsingInfo: { type: "flag", internalId: "UnlockedUnderTube" },
          mapLink: "478422",
        },
      ],
    },
  ],
};
