import type { TrackableCategory } from "../types";

export const devices: TrackableCategory = {
  name: "Devices",
  description:
    "Devices that track items, and progress, respectively. These are only tracked once they're installed in your Bellhome.",
  sections: [
    {
      items: [
        {
          name: "Materium",
          whichAct: 2,
          completionDetails:
            "Memorium: Found in the upper part of the Memorium. Assemble this device in your Bellhome, to track materials found in Pharloom.",
          parsingInfo: { type: "flag", internalId: "ConstructedMaterium" },
          mapLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479119",
        },
        {
          name: "Farsight",
          whichAct: 3,
          completionDetails:
            "Abyss (Weavenest Absolom): Found in the upper east passage of the Weavenest. Assemble this device in your Bellhome, to track your progress.",
          parsingInfo: { type: "flag", internalId: "ConstructedFarsight" },
          mapLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479289",
        },
      ],
    },
  ],
};
