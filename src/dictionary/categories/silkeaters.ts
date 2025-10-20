import type { TrackableCategory } from "../types";

export const silkeaters: TrackableCategory = {
  name: "Silkeaters",
  description:
    "These are the Silkeater cocoons found throughout Pharloom; breaking one lets you obtain a Silkeater. Consume them to retrieve lost valuables (cocoon corpse) after death. You can only obtain them before starting ACT 3, so be sure to find them all beforehand!",
  sections: [
    {
      name: "Main",
      description: "",
      hasGameModeSpecificItems: true,
      items: [
        {
          name: "Silkeater · Deep Docks",
          whichAct: 1,
          locationDetails:
            "Deep Docks: Partially hidden by a shelf at the eastern end of the room that's towards the south-east of the sauna bench.",
          parsingInfo: { type: "sceneData", internalId: ["Dock_14", "Silk Grub Large Cocoon"] },
          mapLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478833",
        },
        {
          name: "Silkeater · Greymoor",
          whichAct: 1,
          locationDetails: "Greymoor: An the top of the tower, west of Halfway Home.",
          parsingInfo: { type: "sceneData", internalId: ["Greymoor_04", "Silk Grub Large Cocoon"] },
          mapLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478283",
        },
        {
          name: "Silkeater · Blasted Steps",
          whichAct: 1,
          locationDetails: "Blasted Steps: In the eastern area, east of where Shakra appears.",
          parsingInfo: { type: "sceneData", internalId: ["Coral_37", "Silk Grub Large Cocoon"] },
          mapLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478505",
          onlyFoundInClassicMode: true,
        },
        {
          name: "Silkeater · Exhaust Organ",
          whichAct: 1,
          locationDetails: "Exhaust Organ (Inside)",
          parsingInfo: { type: "sceneData", internalId: ["Organ_01", "Silk Grub Large Cocoon"] },
          mapLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479657",
        },
        {
          name: "Silkeater · Choral Chambers (Near Grand Bellway)",
          whichAct: 2,
          locationDetails:
            "Choral Chambers: At the bottom of a spiky pit, guarded by two Snitchflies, found towards the west of Grand Bellway.",
          parsingInfo: { type: "sceneData", internalId: ["Song_24", "Silk Grub Large Cocoon"] },
          mapLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478595",
        },
        {
          name: "Silkeater · Choral Chambers (Near the Kitchen)",
          whichAct: 2,
          locationDetails:
            "Choral Chambers: In a secret room, reached by walking through the wall at the eastern edge of the dining room and climbing up through a few tunnels.",
          parsingInfo: { type: "sceneData", internalId: ["Song_09b", "Silk Grub Large Cocoon"] },
          mapLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478890",
        },
        {
          name: "Silkeater · Whispering Vaults",
          whichAct: 2,
          locationDetails:
            "Whispering Vaults: In a room directly above Vaultkeeper Cardinius' lair, top of a secret passage behind a breakable wall.",
          parsingInfo: { type: "sceneData", internalId: ["Library_14", "Silk Grub Large Cocoon"] },
          mapLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478657",
        },
        {
          name: "Silkeater · Whiteward",
          whichAct: 2,
          locationDetails: "Whiteward (Centre): On top of some ledges behind a breakable wall.",
          parsingInfo: { type: "sceneData", internalId: ["Ward_04", "Silk Grub Large Cocoon"] },
          mapLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478916",
        },
        {
          name: "Silkeater · The Cradle",
          whichAct: 2,
          locationDetails:
            "The Cradle: At the end of a tunnel beneath a breakable floor. Look for a lever, then follow the tunnel down towards the steam and continue to the left.",
          parsingInfo: { type: "sceneData", internalId: ["Tube_Hub", "Silk Grub Large Cocoon"] },
          mapLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479935",
        },
      ],
    },
  ],
};
