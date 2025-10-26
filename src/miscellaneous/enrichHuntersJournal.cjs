const fs = require('fs');
const path = require('path');

const metadata = require('./extractedMetadata.cjs');
const { enemyMetadata, completionVariantsMetadata } = metadata;

const journalModule = require('../dictionary/categories/huntersJournal.ts');
const huntersJournal = journalModule.huntersJournal;

const OUTPUT_FILENAME = 'huntersJournalEnriched.ts';
const OUTPUT_PATH = path.join(__dirname, '../dictionary/categories', OUTPUT_FILENAME);

function collectJournalNames(journal) {
  const names = [];
  journal.sections.forEach(section => {
    section.items.forEach(item => {
      names.push(item.name);
    });
  });
  return names;
}

function analyzeHpDamageMatches(journalNames, metadata) {
  const matched = [];
  const notInMetadata = [];
  
  journalNames.forEach(name => {
    if (metadata[name] && metadata[name].values) {
      matched.push({ name, valuesCount: metadata[name].values.length });
    } else {
      notInMetadata.push(name);
    }
  });
  
  const notInJournal = Object.keys(metadata).filter(key => !journalNames.includes(key));
  
  return { matched, notInMetadata, notInJournal };
}

function analyzeCompletionVariants(journalNames, variants) {
  const bossesToMinions = {};
  const minionsToBosses = {};
  const bossesNotInJournal = [];
  const minionsNotInJournal = [];
  
  Object.entries(variants).forEach(([boss, minions]) => {
    if (journalNames.includes(boss)) {
      bossesToMinions[boss] = minions;
      
      minions.forEach(minion => {
        if (journalNames.includes(minion)) {
          if (!minionsToBosses[minion]) {
            minionsToBosses[minion] = [];
          }
          minionsToBosses[minion].push(boss);
        } else {
          if (!minionsNotInJournal.includes(minion)) {
            minionsNotInJournal.push(minion);
          }
        }
      });
    } else {
      bossesNotInJournal.push(boss);
    }
  });
  
  return { bossesToMinions, minionsToBosses, bossesNotInJournal, minionsNotInJournal };
}

function addHpDamageInfo(journal, metadata) {
  let count = 0;
  
  journal.sections.forEach(section => {
    section.items.forEach(item => {
      const meta = metadata[item.name];
      if (meta && meta.values) {
        if (!item.additionalMeta) {
          item.additionalMeta = {};
        }
        item.additionalMeta.hpAndDamageInfo = meta.values;
        count++;
      }
    });
  });
  
  return count;
}

function addCompletionVariants(journal, bossesToMinions, minionsToBosses) {
  let bossCount = 0;
  let minionCount = 0;
  
  journal.sections.forEach(section => {
    section.items.forEach(item => {
      if (bossesToMinions[item.name]) {
        if (!item.additionalMeta) {
          item.additionalMeta = {};
        }
        item.additionalMeta.completesEntries = bossesToMinions[item.name];
        bossCount++;
      }
      
      if (minionsToBosses[item.name]) {
        if (!item.additionalMeta) {
          item.additionalMeta = {};
        }
        item.additionalMeta.completedBy = minionsToBosses[item.name];
        minionCount++;
      }
    });
  });
  
  return { bossCount, minionCount };
}

function writeTransformedJournal(journal, outputPath) {
  const outputContent = `import type { TrackableCategory } from "../types";

export const huntersJournal: TrackableCategory = ${JSON.stringify(journal, null, 2)};
`;

  fs.writeFileSync(outputPath, outputContent, 'utf-8');
  return outputPath;
}

function runAnalysis(huntersJournal, enemyMetadata, completionVariantsMetadata) {
  const journalNames = collectJournalNames(huntersJournal);
  console.log(`Total journal entries: ${journalNames.length}\n`);

  console.log('=== HP AND DAMAGE INFO ANALYSIS ===');
  const hpAnalysis = analyzeHpDamageMatches(journalNames, enemyMetadata);
  console.log(`✅ Matched entries: ${hpAnalysis.matched.length}`);
  console.log(`❌ Not in metadata: ${hpAnalysis.notInMetadata.length}`);
  console.log(`⚠️  Metadata not in journal: ${hpAnalysis.notInJournal.length}\n`);

  console.log('=== COMPLETION VARIANTS ANALYSIS ===');
  const variantsAnalysis = analyzeCompletionVariants(journalNames, completionVariantsMetadata);
  console.log(`✅ Bosses with completion variants: ${Object.keys(variantsAnalysis.bossesToMinions).length}`);
  console.log(`✅ Minions completed by bosses: ${Object.keys(variantsAnalysis.minionsToBosses).length}`);
  console.log(`❌ Bosses not in journal: ${variantsAnalysis.bossesNotInJournal.length}`);
  console.log(`❌ Minions not in journal: ${variantsAnalysis.minionsNotInJournal.length}\n`);

  if (variantsAnalysis.bossesNotInJournal.length > 0) {
    console.log('Bosses not in journal:');
    variantsAnalysis.bossesNotInJournal.forEach(boss => console.log(`  - "${boss}"`));
    console.log('');
  }

  if (variantsAnalysis.minionsNotInJournal.length > 0) {
    console.log('Minions not in journal:');
    variantsAnalysis.minionsNotInJournal.forEach(minion => console.log(`  - "${minion}"`));
    console.log('');
  }

  return { hpAnalysis, variantsAnalysis };
}

function runTransformation(huntersJournal, enemyMetadata, variantsAnalysis, outputPath = OUTPUT_PATH) {
  console.log('=== STARTING TRANSFORMATION ===\n');

  console.log('Step 1: Adding HP and damage info...');
  const hpCount = addHpDamageInfo(huntersJournal, enemyMetadata);
  console.log(`✓ Added to ${hpCount} entries\n`);

  console.log('Step 2: Adding completion variants...');
  const completionCounts = addCompletionVariants(
    huntersJournal,
    variantsAnalysis.bossesToMinions,
    variantsAnalysis.minionsToBosses
  );
  console.log(`✓ Added completesEntries to ${completionCounts.bossCount} bosses`);
  console.log(`✓ Added completedBy to ${completionCounts.minionCount} minions\n`);

  writeTransformedJournal(huntersJournal, outputPath);

  console.log('=== TRANSFORMATION COMPLETE ===');
  console.log(`New file created: ${outputPath}`);
}

function run() {
  console.log('=== HUNTERS JOURNAL METADATA ENRICHMENT ===\n');
  const { hpAnalysis, variantsAnalysis } = runAnalysis(huntersJournal, enemyMetadata, completionVariantsMetadata);
  runTransformation(huntersJournal, enemyMetadata, variantsAnalysis);
}

run();
