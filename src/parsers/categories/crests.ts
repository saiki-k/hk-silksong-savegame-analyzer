import type { NormalisedTrackableCategory } from '../types';

export const crests: NormalisedTrackableCategory = {
  name: 'Crests',
  description: 'Each of these (except Hunter Crest(s), and Vesticrest(s)) count 1% towards completion.',
  sections: [
    {
      name: 'Main',
      description: '',
      items: [
        { name: 'Hunter Crest', whichAct: 1, completionPercent: 0, prereqs: [], location: 'Default Crest, already equipped at the beginning.', parsingInfo: { type: 'crest', internalId: 'Hunter' }, mapLink: '' },
        { name: 'Hunter Crest Upgrade', whichAct: 1, completionPercent: 0, prereqs: [], location: 'Weavnest Atla: Talk to Eva.', parsingInfo: { type: 'crest', internalId: 'Hunter_v2' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478228' },
        { name: 'Second Hunter Crest Upgrade', whichAct: 2, completionPercent: 0, prereqs: [], location: 'Weavnest Atla: Talk to Eva after unlocking a total of 27 tool slots (excluding Hunter Crest slots) via Memory Lockets and acquiring new Crests.', parsingInfo: { type: 'crest', internalId: 'Hunter_v3' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479653' },
        { name: 'Vesticrest (Extra Yellow Slot)', whichAct: 1, completionPercent: 0, prereqs: [], location: 'Weavnest Atla: Talk to Eva after unlocking a total of 12 tool slots (excluding Hunter Crest slots) via Memory Lockets and acquiring new Crests. Unlocks a permanent Yellow (Exploration) Tool Slot.', parsingInfo: { type: 'flag', internalId: 'UnlockedExtraYellowSlot' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479145' },
        { name: 'Vesticrest (Extra Blue Slot)', whichAct: 1, completionPercent: 0, prereqs: [], location: 'Weavnest Atla: Talk to Eva after unlocking a total of 20 tool slots (excluding Hunter Crest slots) via Memory Lockets and acquiring new Crests. Unlocks a permanent Blue (Defense) Tool Slot.', parsingInfo: { type: 'flag', internalId: 'UnlockedExtraBlueSlot' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479434' },
        { name: 'Reaper Crest', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Greymoor:  Chapel of the Reaper.', parsingInfo: { type: 'crest', internalId: 'Reaper' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478156' },
        { name: 'Wanderer Crest', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Moss Grotto (Bonegrave): Chapel of the Wanderer.', parsingInfo: { type: 'crest', internalId: 'Wanderer' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478240' },
        { name: 'Beast Crest', whichAct: 1, completionPercent: 1, prereqs: [], location: 'Hunter\'s March: Chapel of the Beast.', parsingInfo: { type: 'crest', internalId: 'Warrior' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478020' },
        { name: 'Witch Crest', whichAct: 2, completionPercent: 1, prereqs: [], location: 'Bellhart: Take Twisted Bud to Greyroot, Complete "Rite of Rebirth" wish, Complete "Infestation Operation" wish.', parsingInfo: { type: 'crest', internalId: 'Witch' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478815' },
        { name: 'Architect Crest', whichAct: 2, completionPercent: 1, prereqs: [], location: 'Underworks: Chapel of the Architect.', parsingInfo: { type: 'crest', internalId: 'Toolmaster' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478745' },
        { name: 'Shaman Crest', whichAct: 3, completionPercent: 1, prereqs: [], location: 'Moss Grotto (Ruined Chapel): In a tunnel above the first lore tablet, requires Silk Soar.', parsingInfo: { type: 'crest', internalId: 'Spell' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479384' },
      ],
    },
  ],
};