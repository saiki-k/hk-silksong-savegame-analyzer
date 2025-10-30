import type { TrackableCategory } from "../types";

export const devices: TrackableCategory = {
  name: "Devices",
  description:
    "Devices that track items / progress. They only get tracked once you install them in your Bellhome in Bellhart.",
  sections: [
    {
      items: [
        {
          name: "Materium",
          whichAct: 2,
          completionDetails: 'Memorium: Can be found in the upper part of the Memorium. The item must be constructed in the Bellhome in Bellhart before it can be used.',
          parsingInfo: { type: "flag", internalId: "ConstructedMaterium" },
          mapLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479119",
        },
        {
          name: "Farsight",
          whichAct: 3,
          completionDetails: 'Abyss: Found in the upper east passage of Weavenest Absolom. The item must be constructed in the Bellhome in Bellhart before it can be used.',
          parsingInfo: { type: "flag", internalId: "ConstructedFarsight" },
          mapLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479289",
        },
      ],
    },
  ],
};