import type { NormalisedTrackableCategory } from '../types';

export const keys: NormalisedTrackableCategory = {
  name: 'Keys',
  description: 'Keys',
  sections: [
    {
      name: 'Main',
      description: '',
      items: [
        // TODO: Grindle sells this item later, if it is not purchased until ACT 3. The internalId would probably not change, because we see Grindle's mates looting this location. However, adding a note here to verify this later...
        { name: 'Simple Key 1', whichAct: 1, completionPercent: 0, prereqs: [], location: 'Bone Bottom / Blasted Steps: Sold by Pebb for 500 Rosaries. If you don\'t purchase this from Pebb, it is sold by Grindle in ACT 3 for 600 Rosaries.', parsingInfo: { type: 'flag', internalId: 'PurchasedBonebottomFaithToken' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477839' },
        { name: 'Simple Key 2', whichAct: 1, completionPercent: 0, prereqs: [], location: 'Sinner\'s Road (Top-right): Dropped by a (defeated) Roachkeeper.', parsingInfo: { type: 'flag', internalId: 'CollectedDustCageKey' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478280' },
        { name: 'Simple Key 3', whichAct: 2, completionPercent: 0, prereqs: [], location: 'Songclave: Sold by Jubilana for 650 Rosaries, after completing "The Wandering Merchant" wish.', parsingInfo: { type: 'flag', internalId: 'MerchantEnclaveSimpleKey' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478880' },
        { name: 'Simple Key 4', whichAct: 2, completionPercent: 0, prereqs: [], location: 'Sands of Karak (Far-right): Held by a corpse sitting on the right-most bench.', parsingInfo: { type: 'sceneData', internalId: ['Bellshrine_Coral', 'Collectable Item Pickup'] }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479215' },
        { name: 'Key of Indolent', whichAct: 1, completionPercent: 0, prereqs: [], location: 'The Slab: At the edge of a room entered from above.', parsingInfo: { type: 'flag', internalId: 'HasSlabKeyA' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478467' },
        { name: 'Key of Heretic', whichAct: 1, completionPercent: 0, prereqs: [], location: 'The Slab: Dropped by the final enemy in a room entered from above.', parsingInfo: { type: 'flag', internalId: 'HasSlabKeyB' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478474' },
        { name: 'Key of Apostate', whichAct: 2, completionPercent: 0, prereqs: [], location: 'Putrified Ducts (Bottom-left): Inside a cage, hit it a few times to get the key out.', parsingInfo: { type: 'flag', internalId: 'HasSlabKeyC' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478963' },
        { name: 'Architect\'s Key', whichAct: 2, completionPercent: 0, prereqs: ['Aquire 25 Tools'], location: 'Underworks: Sold by Twelfth Architect for 110 Rosaries. Unlocks the Chapel of the Architect.', parsingInfo: { type: 'flag', internalId: 'PurchasedArchitectKey' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478729' },
        { name: 'Diving Bell Key', whichAct: 3, completionPercent: 0, prereqs: [], location: 'Deep Docks', parsingInfo: { type: 'flag', internalId: 'BallowGivenKey' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479279' },
        { name: 'White Key', whichAct: 2, completionPercent: 0, prereqs: [], location: 'Songclave: On a corpse at the edge of the area. Sold by Jubilana for 220 Rosaries, if you don\'t pick it up before completing "The Wandering Merchant" wish. Unlocks the elevator in Whiteward.', parsingInfo: { type: 'flagMulti', internalId: ['collectedWardKey','MerchantEnclaveWardKey'] }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478599' },
        { name: 'Surgeon\'s Key', whichAct: 2, completionPercent: 0, prereqs: ['Clawline'], location: 'Whiteward (Top-right): Dangle from a metal ring for a few seconds, and a corpse will eventually fall holding this key. Unlocks the trapdoor in Whiteward.', parsingInfo: { type: 'flag', internalId: 'collectedWardBossKey' }, mapLink: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478923' },
      ],
    },
  ],
};