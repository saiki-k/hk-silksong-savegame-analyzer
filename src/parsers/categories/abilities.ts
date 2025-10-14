import type { NormalisedTrackableCategory } from '../types';

export const abilities: NormalisedTrackableCategory = {
  name: 'Abilities',
  description: 'Each Ability (except Cloak Abilities) counts 1% towards completion.',
  sections: [
    {
      name: 'Silk Skills',
      description: 'Each Silk Skill counts 1% towards completion.',
      items: [
        { name: 'Silkspear', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Moss Grotto (Mosshome)', parsingInfo: { type: 'tool', internalId: ['Silk Spear'] }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477871' },
        { name: 'Thread Storm', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Greymoor (Craw Lake): At the top.', parsingInfo: { type: 'tool', internalId: ['Thread Sphere'] }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478061' },
        { name: 'Cross Stitch', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Bilewater (Exhaust Organ): Defeat Phantom.', parsingInfo: { type: 'tool', internalId: ['Parry'] }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478371' },
        { name: 'Sharpdart', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Wormways (Weavernest)', parsingInfo: { type: 'tool', internalId: ['Silk Charge'] }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479079' },
        { name: 'Rune Rage', whichAct: 1, completionPercent: 1, prereqs: [], location: 'The Slab: Defeat First Sinner.', parsingInfo: { type: 'tool', internalId: ['Silk Bomb'] }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479025' },
        { name: 'Pale Nails', whichAct: 3, completionPercent: 1, prereqs: ['Silk Soar'], location: 'The Cradle: At the top.', parsingInfo: { type: 'tool', internalId: ['Silk Boss Needle'] }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479606' },
      ]
    },
    {
      name: 'Silk Hearts',
      description: 'Each Silk Heart counts 1% towards completion.',
      items: [
        { name: 'Silk Heart #1', whichAct: 1, completionPercent: 1, prereqs: ['Silkspear'], location: 'The Marrow: Defeat Bell Beast.', parsingInfo: { type: 'sceneVisited', internalId: 'Memory_Silk_Heart_BellBeast' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477879' },
        { name: 'Silk Heart #2', whichAct: 2, completionPercent: 1, prereqs: [], location: 'Whiteward: Defeat The Unravelled (beneath a locked trapdoor, requires Surgeon\'s Key).', parsingInfo: { type: 'sceneVisited', internalId:'Memory_Silk_Heart_WardBoss' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479082' },
        { name: 'Silk Heart #3', whichAct: 2, completionPercent: 1, prereqs: [], location: 'The Cradle: Defeat Lace.', parsingInfo: { type: 'sceneVisited', internalId:'Memory_Silk_Heart_LaceTower' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479089' },
      ]
    },
    {
      name: 'Cloak Abilities',
      description: 'Cloak Abilities do not count any % towards completion.',
      items: [
        { name: 'Drifter\'s Cloak (Glide)', whichAct: 1, completionPercent: 0, prereqs: [], location: 'Far Fields: Complete Seamstress\' "Flexile Spines" wish.', parsingInfo: { type: 'flag', internalId: 'hasBrolly' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477971' },
        { name: 'Faydown Cloak (Double Jump)', whichAct: 2, completionPercent: 0, prereqs: ['Needolin','Clawline'], location: 'Mount Fay: At the summit.', parsingInfo: { type: 'flag', internalId: 'hasDoubleJump' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479103' },
      ]
    },
    {
      name: 'Ancestral Arts',
      description: 'Each Ancestral Art counts 1% towards completion.',
      items: [
        { name: 'Swift Step (Dash / Sprint)', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Deep Docks', parsingInfo: { type: 'flag', internalId: 'hasDash' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477915' },
        { name: 'Clawline (Needle Harpoon)', whichAct: 2, completionPercent: 1, prereqs: [], location: 'Underworks (The Cauldron)', parsingInfo: { type: 'flag', internalId: 'hasHarpoonDash' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478714' },
        { name: 'Cling Grip (Wall Jump)', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Shellwood', parsingInfo: { type: 'flag', internalId: 'hasWalljump' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478189' },
        { name: 'Needolin', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Bellhart: Deafeat Widow.', parsingInfo: { type: 'flag', internalId: 'hasNeedolin' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478199' },
        { name: 'Needle Strike', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Blasted Steps (Pinstress\' Home)', parsingInfo: { type: 'flag', internalId: 'hasChargeSlash' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478510' },
        { name: 'Silk Soar (Super Jump)', whichAct: 3, completionPercent: 1, prereqs: [], location: 'The Abyss', parsingInfo: { type: 'flag', internalId: 'hasSuperJump' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479288' },
        { name: 'Sylphsong', whichAct: 2, completionPercent: 1, prereqs: [], location: 'Weavnest Atla: Bind Eva after unlocking a total of 32 tool slots (excluding Hunter Crest slots) via Memory Lockets and acquiring new Crests.', parsingInfo: { type: 'flag', internalId: 'HasBoundCrestUpgrader' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479654' },
      ],
    },
    {
      name: 'Everbloom',
      description: 'Everbloom counts 1% towards completion.',
      items: [
        { name: 'Everbloom', whichAct: 3, completionPercent: 1, prereqs: [], location: 'Complete "The Old Hearts" wish.', parsingInfo: { type: 'collectable', internalId: 'White Flower' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479387' },
      ],
    },
  ],
};