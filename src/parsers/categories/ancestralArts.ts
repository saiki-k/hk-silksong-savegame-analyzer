import type { NormalisedTrackableCategory } from '../types';

export const ancestralArts: NormalisedTrackableCategory = {
  name: 'Ancestral Arts',
  description: 'Each Ancestral Art counts 1% towards completion',
  sections: [
    {
      name: 'Main',
      description: '',
      items: [
        { name: 'Swift Step (Dash / Sprint)', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Deep Docks', parsingInfo: { type: 'flag', internalId: 'hasDash' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477915' },
        { name: 'Clawline (Needle Harpoon)', whichAct: 2, completionPercent: 1, prereqs: [], location: 'Underworks (The Cauldron)', parsingInfo: { type: 'flag', internalId: 'hasHarpoonDash' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478714' },
        { name: 'Cling Grip (Wall Jump)', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Shellwood', parsingInfo: { type: 'flag', internalId: 'hasWalljump' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478189' },
        { name: 'Needolin', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Bellhart: Deafeat Widow.', parsingInfo: { type: 'flag', internalId: 'hasNeedolin' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478199' },
        { name: 'Needle Strike', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Blasted Steps (Pinstress\' Home)', parsingInfo: { type: 'flag', internalId: 'hasChargeSlash' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478510' },
        { name: 'Silk Soar (Super Jump)', whichAct: 3, completionPercent: 1, prereqs: [], location: 'The Abyss', parsingInfo: { type: 'flag', internalId: 'hasSuperJump' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479288' },
        { name: 'Sylphsong', whichAct: 2, completionPercent: 1, prereqs: [], location: 'Weavnest Atla: Bind Eva after unlocking a total of 32 tool slots (excluding Hunter Crest slots) via Memory Lockets and acquiring new Crests.', parsingInfo: { type: 'flag', internalId: 'HasBoundCrestUpgrader' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479654' },
        { name: 'Everbloom', whichAct: 3, completionPercent: 1, prereqs: [], location: 'Complete "The Old Hearts" wish.', parsingInfo: { type: 'collectable', internalId: 'White Flower' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479387' },
      ],
    },
  ],
};