import type { NormalisedTrackableCategory } from '../types';

export const relics: NormalisedTrackableCategory = {
  name: 'Relics',
  description: 'Relics',
  sections: [
    {
      name: 'Bone Scrolls',
      description: '',
      items: [
        { name: 'Bone Scroll 1', whichAct: 1, completionPercent: 0, prereqs: [], location: 'Greymoor: Held by a corpse found after swimming all the way to the right in the corresponding secret room.', parsingInfo: { type: 'relict', internalId: 'Bone Record Greymoor_flooded_corridor' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478142' },
        { name: 'Bone Scroll 2', whichAct: 1, completionPercent: 0, prereqs: ['Drifter\'s Cloak'], location: 'Far Fields: Found in a secret room, reachable with Drifter\'s Cloak.', parsingInfo: { type: 'relict', internalId: 'Bone Record Bone_East_14' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478213' },
        { name: 'Bone Scroll 3', whichAct: 2, completionPercent: 0, prereqs: [], location: 'Underworks (Left): Behind a breakable wall.', parsingInfo: { type: 'relict', internalId: 'Bone Record Understore_Map_Room' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478553' },
        { name: 'Bone Scroll 4', whichAct: 2, completionPercent: 0, prereqs: [], location: 'Wisp Thicket (Top): Platforming challenge.', parsingInfo: { type: 'relict', internalId: 'Bone Record Wisp Top' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479150' },
      ]
    },
    {
      name: 'Choral Commandments',
      description: '',
      items: [
        { name: 'Choral Commandment 1', whichAct: 1, completionPercent: 0, prereqs: [], location: 'Bone Bottom: On a high-up ledge, left from Mosshome.', parsingInfo: { type: 'relict', internalId: 'Seal Chit Aspid_01' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477867' },
        { name: 'Choral Commandment 2', whichAct: 2, completionPercent: 0, prereqs: [], location: 'Whiteward: Top-left room.', parsingInfo: { type: 'relict', internalId: 'Seal Chit Ward Corpse' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478914' },
        { name: 'Choral Commandment 3', whichAct: 2, completionPercent: 0, prereqs: [], location: 'Whiteward: At the end of a room above the hidden passage, easiest to reach via Silk Soar.', parsingInfo: { type: 'relict', internalId: 'Seal Chit Silk Siphon' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478919' },
        { name: 'Choral Commandment 4', whichAct: 2, completionPercent: 0, prereqs: [], location: 'Songclave: Sold by Jubilana for 210 Rosaries, after completing "The Lost Merchant" wish.', parsingInfo: { type: 'relict', internalId: 'Seal Chit City Merchant' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479251' },
      ]
    },
    {
      name: 'Weaver Effigies',
      description: '',
      items: [
        { name: 'Weaver Effigy 1', whichAct: 1, completionPercent: 0, prereqs: [], location: 'Bone Bottom: In a secret room above Bone Bottom, easiest to reach with Drifter\'s Cloak and floating down from above.', parsingInfo: { type: 'relict', internalId: 'Weaver Totem Bonetown_upper_room' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478093' },
        { name: 'Weaver Effigy 2', whichAct: 2, completionPercent: 0, prereqs: ['Cling Grip'], location: 'Shellwood: At the very top-right area inside the Chapel of the Witch.', parsingInfo: { type: 'relict', internalId: 'Weaver Totem Witch' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478794' },
        { name: 'Weaver Effigy 3', whichAct: 1, completionPercent: 0, prereqs: [], location: 'The Slab (Bottom-right): Held by a corpse.', parsingInfo: { type: 'relict', internalId: 'Weaver Totem Slab_Bottom' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479034' },
      ]
    },
    {
      name: 'Rune Harps',
      description: '',
      items: [
        { name: 'Rune Harp 1', whichAct: 1, completionPercent: 0, prereqs: [], location: 'Weavernest Atla: Found on a high-up ledge.', parsingInfo: { type: 'relict', internalId: 'Weaver Record Weave_08' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478231' },
        { name: 'Rune Harp 2', whichAct: 1, completionPercent: 0, prereqs: [], location: 'Far Fields (Weavernest): Use Silkspeed Anklets with Flea Brew, and run over all the pressure plates.', parsingInfo: { type: 'relict', internalId: 'Weaver Record Sprint_Challenge' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479057' },
        { name: 'Rune Harp 3', whichAct: 3, completionPercent: 0, prereqs: [], location: 'High Halls: Pick it up from Conductor Ballador\'s room, in ACT 3.', parsingInfo: { type: 'relict', internalId: 'Weaver Record Conductor' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479495' },
      ]
    },
    {
      name: 'Psalm Cylinders',
      description: '',
      items: [
        { name: 'Psalm Cylinder (Grindle)', whichAct: 1, completionPercent: 0, prereqs: [], location: 'Blasted Steps: Sold by Grindle for 240 Rosaries.', parsingInfo: { type: 'relict', internalId: 'Psalm Cylinder Grindle' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478530' },
        { name: 'Psalm Cylinder (Vaultkeeper Cardinius\' Lair)', whichAct: 2, completionPercent: 0, prereqs: [], location: 'Whispering Vaults: Vaultkeeper Cardinius\' Lair.', parsingInfo: { type: 'relict', internalId: 'Psalm Cylinder Librarian' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478650' },
        { name: 'Psalm Cylinder (Whispering Vaults)', whichAct: 2, completionPercent: 0, prereqs: ['Clawline'], location: 'Whispering Vaults (Top): At the end of a parkour challenge.', parsingInfo: { type: 'relict', internalId: 'Psalm Cylinder Library Roof' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478774' },
        { name: 'Psalm Cylinder (High Halls)', whichAct: 2, completionPercent: 0, prereqs: ['Clawline'], location: 'High Halls: Behind a breakable wall.', parsingInfo: { type: 'relict', internalId: 'Psalm Cylinder Hang' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478908' },
        { name: 'Psalm Cylinder (Underworks)', whichAct: 2, completionPercent: 0, prereqs: [], location: 'Underworks (Top): At the end of a corridor behind a breakable wall.', parsingInfo: { type: 'relict', internalId: 'Psalm Cylinder Ward' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478929' },
        { name: 'Sacred Cylinder', whichAct: 2, completionPercent: 0, prereqs: [], location: 'Whispering Vaults: Part of the Vaultkeeper\'s Melody objective.', parsingInfo: { type: 'relict', internalId: 'Librarian Melody Cylinder' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479717' },
        { name: 'Arcane Egg', whichAct: 3, completionPercent: 0, prereqs: [], location: 'The Abyss: Behind a platforming sequence.', parsingInfo: { type: 'relict', internalId: 'Ancient Egg Abyss Middle' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479281' },
      ]
    }
  ],
};