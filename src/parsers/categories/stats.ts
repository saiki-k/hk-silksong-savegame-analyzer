import type { CollectableCategory } from '../types';

export const stats: CollectableCategory = {
  name: 'Stats',
  description: 'Statistics tracked in the game.',
  items: [
    { name: 'Playtime', whichAct: 1, completionPercent: 0, prereqs: [], location: '', parsingInfo: { type: 'flagReturn', internalId: 'playTime' }, mapLink: '' },
    { name: 'Rosaries', whichAct: 1, completionPercent: 0, prereqs: [], location: '', parsingInfo: { type: 'flagReturn', internalId: 'geo' }, mapLink: '' },
    { name: 'Shell Shards', whichAct: 1, completionPercent: 0, prereqs: [], location: '', parsingInfo: { type: 'flagReturn', internalId: 'ShellShards' }, mapLink: '' },
    { name: 'Game Mode', whichAct: 1, completionPercent: 0, prereqs: [], location: '', parsingInfo: { type: 'flagReturn', internalId: 'permadeathMode' }, mapLink: '' },
  ],
};