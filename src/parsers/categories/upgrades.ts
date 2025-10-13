import type { NormalisedTrackableCategory } from '../types';

export const upgrades: NormalisedTrackableCategory = {
  name: 'Upgrades',
  description: 'Each Upgrade (except for the Cloak Upgrades) counts 1% towards completion.',
  sections: [
    {
      name: 'Cloak Upgrades',
      description: '',
      items: [
        { name: 'Drifter\'s Cloak (Glide)', whichAct: 1, completionPercent: 0, prereqs: [], location: 'Far Fields: Complete Seamstress\' "Flexile Spines" wish.', parsingInfo: { type: 'flag', internalId: 'hasBrolly' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477971' },
        { name: 'Faydown Cloak (Double Jump)', whichAct: 2, completionPercent: 0, prereqs: ['Needolin','Clawline'], location: 'Mount Fay: At the summit.', parsingInfo: { type: 'flag', internalId: 'hasDoubleJump' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479103' },
      ]
    },
    {
      name: 'Needle Upgrades',
      description: '',
      items: [
        { name: 'Needle Upgrade 1 (Sharpened Needle)', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Bellhart: Speak to Plinney after defeating Widow.', parsingInfo: { type: 'flagInt', internalId: ['nailUpgrades', 1] }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478210' },
        { name: 'Needle Upgrade 2 (Shining Needle)', whichAct: 2, completionPercent: 1, prereqs: [], location: 'Bellhart: Speak to Plinney after acquiring 1 Pale Oil.', parsingInfo: { type: 'flagInt', internalId: ['nailUpgrades', 2] }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478211' },
        { name: 'Needle Upgrade 3 (Hivesteel Needle)', whichAct: 2, completionPercent: 1, prereqs: [], location: 'Bellhart: Complete "Great Taste of Pharloom" wish. Speak to Plinney and give him 450 Rosaries, and 1 Pale Oil.', parsingInfo: { type: 'flagInt', internalId: ['nailUpgrades', 3] }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478889' },
        { name: 'Needle Upgrade 4 (Pale Steel Needle)', whichAct: 3, completionPercent: 1, prereqs: [], location: 'Bellhart: Complete "Ecstasy of the End" wish (Appears on the Bellhart Wishwall in ACT 3 after finding every Lost Flea). Speak to Plinney and give him 680 Rosaries, and 1 Pale Oil.', parsingInfo: { type: 'flagInt', internalId: ['nailUpgrades', 4] }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479444' },
      ]
    },
    {
      name: 'Tool Pouch Upgrades',
      description: '',
      items: [
        { name: 'Tool Pouch Upgrade 1', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Far Fields (Pilgrim\'s Rest) / Blasted Steps: Sold by Mort for 220 Rosaries. If you don\'t purchase this from Mort, it is sold by Grindle in ACT 3 for 220 Rosaries.', parsingInfo: { type: 'flag', internalId: 'PurchasedPilgrimsRestToolPouch' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477946' },
        { name: 'Tool Pouch Upgrade 2', whichAct: 1, completionPercent: 1, prereqs: [], location: 'The Marrow: Complete Loddie\'s first pin challenge by hitting the target 15 times, or pick it up from this location in ACT 3.', parsingInfo: [{ type: 'flagInt', internalId: ['pinGalleriesCompleted', 1] }, { type: 'sceneData', internalId: ['Bone_12', 'Ladybug Craft Pickup'] }], mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478252' },
        { name: 'Tool Pouch Upgrade 3', whichAct: 2, completionPercent: 1, prereqs: [], location: 'Greymoor (Halfway Home): Complete "Bugs of Pharloom" wish.', parsingInfo: { type: 'quest', internalId: 'Journal' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479167' },
        { name: 'Tool Pouch Upgrade 4', whichAct: 2, completionPercent: 1, prereqs: [], location: 'Putrified Ducts (Fleatopia): Find 20 Lost Fleas in Pharloom.', parsingInfo: { type: 'sceneData', internalId: ['Aqueduct_05', 'Caravan Troupe Leader Fleatopia NPC'] }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479436' },
      ]
    },
    {
      name: 'Crafting Kit Upgrades',
      description: '',
      items: [
        { name: 'Crafting Kit Upgrade 1', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Deep Docks: Sold by Forge Daughter for 180 Rosaries.', parsingInfo: { type: 'flag', internalId: 'PurchasedForgeToolKit' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477919' },
        { name: 'Crafting Kit Upgrade 2', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Bellhart: Complete "Crawbug Clearing" wish.', parsingInfo: { type: 'quest', internalId: 'Crow Feathers' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478348' },
        { name: 'Crafting Kit Upgrade 3', whichAct: 2, completionPercent: 1, prereqs: [], location: 'Blasted Steps: Sold by Grindle for 700 Rosaries.', parsingInfo: { type: 'flag', internalId: 'purchasedGrindleToolKit' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478533' },
        { name: 'Crafting Kit Upgrade 4', whichAct: 2, completionPercent: 1, prereqs: [], location: 'Underworks: Sold by Twelfth Architect for 450 Rosaries.', parsingInfo: { type: 'flag', internalId: 'PurchasedArchitectToolKit' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478728' },
      ]
    },
    {
      name: 'Silk Hearts',
      description: '',
      items: [
        { name: 'Silk Heart 1', whichAct: 1, completionPercent: 1, prereqs: ['Silkspear'], location: 'The Marrow: Defeat Bell Beast.', parsingInfo: { type: 'sceneVisited', internalId: 'Memory_Silk_Heart_BellBeast' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477879' },
        { name: 'Silk Heart 2', whichAct: 2, completionPercent: 1, prereqs: [], location: 'Whiteward: Defeat The Unravelled (beneath a locked trapdoor, requires Surgeon\'s Key).', parsingInfo: { type: 'sceneVisited', internalId:'Memory_Silk_Heart_WardBoss' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479082' },
        { name: 'Silk Heart 3', whichAct: 2, completionPercent: 1, prereqs: [], location: 'The Cradle: Defeat Lace.', parsingInfo: { type: 'sceneVisited', internalId:'Memory_Silk_Heart_LaceTower' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479089' },
      ]
    }
  ],
};