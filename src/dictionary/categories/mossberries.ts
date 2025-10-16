import type { TrackableCategory } from "../types";

export const mossberries: TrackableCategory = {
  name: "Mossberries",
  description:
    "Sweet berries with poisonous seeds, that grow in moist environments. Initially gathered as a part of a wish, later used to trade for Rosaries (and a Tool upgrade).",
  sections: [
    {
      items: [
        {
          name: "Mossberry #1",
          whichAct: 1,
          location: "Moss Grotto",
          parsingInfo: { type: "sceneData", internalId: ["Tut_02", "moss_berry_fruit"] },
          mapLink: "476900",
        },
        {
          name: "Mossberry #2",
          whichAct: 1,
          location: "Moss Grotto: Pogo off of a nearby Mossmir to reach it.",
          parsingInfo: { type: "sceneData", internalId: ["Tut_01b", "moss_berry_fruit"] },
          mapLink: "476909",
        },
        {
          name: "Mossberry #3",
          whichAct: 1,
          location:
            "Moss Grotto (Bone Bottom): Held by a flying enemy high above the settlement. Moves into a room east of here in ACT 3.",
          parsingInfo: { type: "flag", internalId: "bonetownAspidBerryCollected" },
          mapLink: "478141",
        },
        {
          name: "Mossberry #4",
          whichAct: 1,
          location: "Moss Grotto (Mosshome): Held by a flying enemy.",
          parsingInfo: { type: "flag", internalId: "mosstownAspidBerryCollected" },
          mapLink: "477877",
        },
        {
          name: "Mossberry #5",
          whichAct: 1,
          location: "Moss Grotto (Bonegrave): Held by an enemy flying high above this area.",
          parsingInfo: { type: "flag", internalId: "bonegraveAspidBerryCollected" },
          mapLink: "478237",
        },
        {
          name: "Mossberry #6",
          whichAct: 1,
          location: "Weavenest Atla: Found growing from a ceiling.",
          parsingInfo: { type: "sceneData", internalId: ["Weave_03", "moss_berry_fruit"] },
          mapLink: "479069",
        },
        {
          name: "Mossberry #7",
          whichAct: 1,
          location: "Memorium",
          parsingInfo: { type: "sceneData", internalId: ["Arborium_04", "moss_berry_fruit"] },
          mapLink: "479108",
        },
      ],
    },
  ],
};
