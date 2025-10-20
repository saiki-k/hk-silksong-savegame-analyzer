import type { TrackableCategory } from "../types";

export const bellways: TrackableCategory = {
  name: "Bellways",
  description:
    "Fast travel stations throughout Pharloom that allow quick movement between discovered (and unlocked) Bellway stations.",
  sections: [
    {
      items: [
        {
          name: "Bone Bottom",
          whichAct: 1,
          locationDetails: "Unlocks after defeating the Bell Beast.",
          parsingInfo: { type: "flag", internalId: "UnlockedFastTravel" },
          mapLink: "477883",
        },
        {
          name: "The Marrow",
          whichAct: 1,
          locationDetails: "Unlocks after defeating the Bell Beast.",
          parsingInfo: { type: "flag", internalId: "UnlockedFastTravel" },
          mapLink: "477882",
        },
        {
          name: "Deep Docks",
          whichAct: 1,
          locationDetails: "Unlocks after paying a toll of 40 Rosaries.",
          parsingInfo: { type: "flag", internalId: "UnlockedDocksStation" },
          mapLink: "477905",
        },
        {
          name: "Far Fields",
          whichAct: 1,
          locationDetails: "Unlocks after paying a toll of 50 Rosaries.",
          parsingInfo: { type: "flag", internalId: "UnlockedBoneforestEastStation" },
          mapLink: "477933",
        },
        {
          name: "Greymoor",
          whichAct: 1,
          locationDetails: "Unlocks after paying a toll of 60 Rosaries.",
          parsingInfo: { type: "flag", internalId: "UnlockedGreymoorStation" },
          mapLink: "478037",
        },
        {
          name: "Bellhart",
          whichAct: 1,
          locationDetails: "Unlocks after paying a toll of 60 Rosaries.",
          parsingInfo: { type: "flag", internalId: "UnlockedBelltownStation" },
          mapLink: "478029",
        },
        {
          name: "Shellwood",
          whichAct: 1,
          locationDetails: "Unlocks after paying a toll of 40 Rosaries.",
          parsingInfo: { type: "flag", internalId: "UnlockedShellwoodStation" },
          mapLink: "478178",
        },
        {
          name: "Blasted Steps",
          whichAct: 1,
          locationDetails: "Unlocks after paying a toll of 60 Rosaries.",
          parsingInfo: { type: "flag", internalId: "UnlockedCoralTowerStation" },
          mapLink: "478308",
        },
        {
          name: "The Slab",
          whichAct: 1,
          locationDetails: "Unlocks after paying a toll of 40 Rosaries.",
          parsingInfo: { type: "flag", internalId: "UnlockedPeakStation" },
          mapLink: "478390",
        },
        {
          name: "Bilewater",
          whichAct: 1,
          locationDetails: "Unlocks after paying a toll of 80 Rosaries.",
          parsingInfo: { type: "flag", internalId: "UnlockedShadowStation" },
          mapLink: "478447",
        },
        {
          name: "Grand Bellway",
          whichAct: 2,
          locationDetails: "Unlocks after paying a toll of 80 Rosaries.",
          parsingInfo: { type: "flag", internalId: "UnlockedCityStation" },
          mapLink: "478374",
        },
        {
          name: "Putrified Ducts",
          whichAct: 2,
          locationDetails: "Unlocks after paying a toll of 80 Rosaries.",
          parsingInfo: { type: "flag", internalId: "UnlockedAqueductStation" },
          mapLink: "478411",
        },
      ],
    },
  ],
};
