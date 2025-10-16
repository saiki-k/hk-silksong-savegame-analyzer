import type { TrackableCategory } from "../types";

export const relics: TrackableCategory = {
  name: "Relics",
  description: "Ancient artifacts scattered across Pharloom.",
  sections: [
    {
      name: "Bone Scrolls",
      description:
        "Journals written by pilgrims, and other lower-class bugs of Pharloom. They can be sold to Relic Seeker Scrounge for 90 Rosaries.",
      items: [
        {
          name: "Bone Scroll #1",
          whichAct: 1,
          location: "Greymoor: Held by a corpse found after swimming all the way to the right in a secret room.",
          parsingInfo: { type: "relict", internalId: "Bone Record Greymoor_flooded_corridor" },
          mapLink: "478142",
        },
        {
          name: "Bone Scroll #2",
          whichAct: 1,
          prereqs: ["Drifter's Cloak"],
          location: "Far Fields: Found in a secret room, reachable with Drifter's Cloak.",
          parsingInfo: { type: "relict", internalId: "Bone Record Bone_East_14" },
          mapLink: "478213",
        },
        {
          name: "Bone Scroll #3",
          whichAct: 2,
          location: "Underworks (Left): Behind a breakable wall.",
          parsingInfo: { type: "relict", internalId: "Bone Record Understore_Map_Room" },
          mapLink: "478553",
        },
        {
          name: "Bone Scroll #4",
          whichAct: 2,
          location: "Wisp Thicket (Top): Platforming challenge.",
          parsingInfo: { type: "relict", internalId: "Bone Record Wisp Top" },
          mapLink: "479150",
        },
      ],
    },
    {
      name: "Weaver Effigies",
      description:
        "Effigies carved from bone that depict various Weaver figures, with prayers dedicated to the specific Weaver etched onto the body of the figure. They can be sold to Relic Seeker Scrounge for 150 Rosaries.",
      items: [
        {
          name: "Weaver Effigy #1",
          whichAct: 1,
          location:
            "Bone Bottom: In a secret room above Bone Bottom, easiest to reach with Drifter's Cloak and floating down from above.",
          parsingInfo: { type: "relict", internalId: "Weaver Totem Bonetown_upper_room" },
          mapLink: "478093",
        },
        {
          name: "Weaver Effigy #2",
          whichAct: 2,
          prereqs: ["Cling Grip"],
          location: "Shellwood: At the very top-right area inside the Chapel of the Witch.",
          parsingInfo: { type: "relict", internalId: "Weaver Totem Witch" },
          mapLink: "478794",
        },
        {
          name: "Weaver Effigy #3",
          whichAct: 1,
          location: "The Slab (Bottom-right): Held by a corpse.",
          parsingInfo: { type: "relict", internalId: "Weaver Totem Slab_Bottom" },
          mapLink: "479034",
        },
      ],
    },
    {
      name: "Choral Commandments",
      description:
        "They carry orders and decrees from The Citadel. They can be sold to Relic Seeker Scrounge for 180 Rosaries.",
      items: [
        {
          name: "Choral Commandment #1",
          whichAct: 1,
          location: "Bone Bottom: On a high-up ledge, left from Mosshome.",
          parsingInfo: { type: "relict", internalId: "Seal Chit Aspid_01" },
          mapLink: "477867",
        },
        {
          name: "Choral Commandment #2",
          whichAct: 2,
          location: "Whiteward: Top-left room.",
          parsingInfo: { type: "relict", internalId: "Seal Chit Ward Corpse" },
          mapLink: "478914",
        },
        {
          name: "Choral Commandment #3",
          whichAct: 2,
          location: "Whiteward: At the end of a room above the hidden passage, easiest to reach via Silk Soar.",
          parsingInfo: { type: "relict", internalId: "Seal Chit Silk Siphon" },
          mapLink: "478919",
        },
        {
          name: "Choral Commandment #4",
          whichAct: 2,
          location: 'Songclave: Sold by Jubilana for 210 Rosaries, after completing "The Lost Merchant" wish.',
          parsingInfo: { type: "relict", internalId: "Seal Chit City Merchant" },
          mapLink: "479251",
        },
      ],
    },
    {
      name: "Rune Harps",
      description:
        "Old recording instruments, strung with silk runes inscribed by the Weavers. They can be sold to Relic Seeker Scrounge for 210 Rosaries.",
      items: [
        {
          name: "Rune Harp #1",
          whichAct: 1,
          location: "Weavernest Atla: Found on a high-up ledge.",
          parsingInfo: { type: "relict", internalId: "Weaver Record Weave_08" },
          mapLink: "478231",
        },
        {
          name: "Rune Harp #2",
          whichAct: 1,
          location:
            "Far Fields (Weavernest): Use Silkspeed Anklets with Flea Brew, and run over all the pressure plates.",
          parsingInfo: { type: "relict", internalId: "Weaver Record Sprint_Challenge" },
          mapLink: "479057",
        },
        {
          name: "Rune Harp #3",
          whichAct: 3,
          location: "High Halls: Pick it up from Conductor Ballador's room, in ACT 3.",
          parsingInfo: { type: "relict", internalId: "Weaver Record Conductor" },
          mapLink: "479495",
        },
      ],
    },
    {
      name: "Psalm Cylinders",
      description:
        "Cylinders inscribed with recordings, which may be heard by bringing them to Vaultkeeper Cardinius. They can be sold to Vaultkeeper Cardinius for 200 Rosaries, or 320 Rosaries for the Sacred Cylinder",
      items: [
        {
          name: "Psalm Cylinder (Grindle)",
          whichAct: 1,
          location: "Blasted Steps: Sold by Grindle for 240 Rosaries.",
          parsingInfo: { type: "relict", internalId: "Psalm Cylinder Grindle" },
          mapLink: "478530",
        },
        {
          name: "Psalm Cylinder (Vaultkeeper Cardinius' Lair)",
          whichAct: 2,
          location: "Whispering Vaults: Vaultkeeper Cardinius' Lair.",
          parsingInfo: { type: "relict", internalId: "Psalm Cylinder Librarian" },
          mapLink: "478650",
        },
        {
          name: "Psalm Cylinder (Whispering Vaults)",
          whichAct: 2,
          prereqs: ["Clawline"],
          location: "Whispering Vaults (Top): At the end of a parkour challenge.",
          parsingInfo: { type: "relict", internalId: "Psalm Cylinder Library Roof" },
          mapLink: "478774",
        },
        {
          name: "Psalm Cylinder (High Halls)",
          whichAct: 2,
          prereqs: ["Clawline"],
          location: "High Halls: Behind a breakable wall.",
          parsingInfo: { type: "relict", internalId: "Psalm Cylinder Hang" },
          mapLink: "478908",
        },
        {
          name: "Psalm Cylinder (Underworks)",
          whichAct: 2,
          location: "Underworks (Top): At the end of a corridor behind a breakable wall.",
          parsingInfo: { type: "relict", internalId: "Psalm Cylinder Ward" },
          mapLink: "478929",
        },
        {
          name: "Sacred Cylinder",
          whichAct: 2,
          location: "Whispering Vaults: Part of the Vaultkeeper's Melody objective.",
          parsingInfo: { type: "relict", internalId: "Librarian Melody Cylinder" },
          mapLink: "479717",
        },
      ],
    },
    {
      name: "Arcane Egg",
      description:
        "Black stone egg formed before the birth of Pharloom. It can be sold to Relic Seeker Scrounge for 600 Rosaries.",
      items: [
        {
          name: "Arcane Egg",
          whichAct: 3,
          location: "The Abyss: Behind a platforming sequence.",
          parsingInfo: { type: "relict", internalId: "Ancient Egg Abyss Middle" },
          mapLink: "479281",
        },
      ],
    },
  ],
};
