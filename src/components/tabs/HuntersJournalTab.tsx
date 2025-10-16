import type { TabRenderProps } from "./types";
import { huntersJournal } from "../../dictionary/categories/huntersJournal";
import { isItemUnlockedInPlayerSave, isItemInCurrentGameMode } from "../../dictionary/parsers";

export function HuntersJournalTab({ parsedJson, decrypted }: TabRenderProps) {
  if (!decrypted || !parsedJson) {
    return <div className="text-white text-center">Load a savefile to view "Hunter's Journal" data.</div>;
  }

  const journalEntries = huntersJournal.sections.flatMap(section => {
    return section.hasGameModeSpecificItems
      ? section.items.filter(item => isItemInCurrentGameMode(item, parsedJson))
      : section.items;
  });

  const journalEntriesWithUnlockStatus = journalEntries.map(item => {
    const { unlocked, returnValue: killsAchieved } = isItemUnlockedInPlayerSave(item.parsingInfo, parsedJson);
    return {
      ...item,
      unlocked,
      killsAchieved,
    };
  });

  return (
    <div className="text-white">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2 text-blue-200">{huntersJournal.name}</h2>
        <p className="text-sm text-gray-300 mb-2">{huntersJournal.description}</p>
      </div>
      <div className="max-w-3xl mx-auto">
        <table className="w-full table-auto border-collapse divide-y divide-gray-600">
          <thead>
            <tr className="text-left">
              <th className="px-2 py-1 w-[56px]" />
              <th className="px-2 py-1 w-[56px] text-center" />
              <th className="px-2 py-1 min-w-[120px] max-w-[220px]">Name</th>
              <th className="px-2 py-1  w-[130px] text-center">Kills Achieved</th>
              <th className="px-2 py-1  w-[130px] text-center">Kills Required</th>
              <th className="px-2 py-1 w-[64px]" />
            </tr>
          </thead>
          <tbody>
            {journalEntriesWithUnlockStatus.map((item, index) => {
              return (
                <tr key={index} className="border-b border-gray-700 last:border-b-0 group">
                  <td className="px-2 py-1 text-center w-[56px] align-middle">
                    <span
                      className={getHuntersJournalStatusColor(item.unlocked, item.killsAchieved, item.killsRequired)}
                    >
                      {item.unlocked && (item.killsAchieved ?? 0) >= (item.killsRequired ?? 0) ? "[x]" : "[ ]"}
                    </span>
                  </td>
                  <td className="px-2 py-1 text-center w-[56px] align-middle">
                    <span className="text-xs text-blue-200 mt-1 font-normal" />
                  </td>
                  <td
                    className={`px-2 py-1 min-w-[120px] max-w-[220px] truncate group-hover:blur-none transition duration-100 ${
                      !item.unlocked ? "blur-sm" : ""
                    }`}
                  >
                    {item.name}
                  </td>
                  <td
                    className={`px-2 py-1 min-w-[100px] max-w-[150px] text-center group-hover:blur-none transition duration-100 ${
                      !item.unlocked ? "blur-sm" : ""
                    }`}
                  >
                    {item.killsAchieved}
                  </td>
                  <td
                    className={`px-2 py-1 min-w-[100px] max-w-[150px] text-center group-hover:blur-none transition duration-100 ${
                      !item.unlocked ? "blur-sm" : ""
                    }`}
                  >
                    {item.killsRequired ?? "N/A"}
                  </td>
                  <td className="px-2 py-1 w-[64px] text-center">
                    <button
                      className={`flex-1 min-w-[48px] py-2 rounded font-semibold transition-colors text-xs ${
                        item.mapLink
                          ? "bg-[#24344d] text-white hover:bg-blue-600 cursor-pointer"
                          : "bg-[#24344d] text-blue-200 opacity-50 cursor-not-allowed"
                      }`}
                      onClick={() => {
                        if (item.mapLink) window.open(item.mapLink, "_blank", "noopener");
                      }}
                      disabled={!item.mapLink}
                      tabIndex={item.mapLink ? 0 : -1}
                    >
                      Map
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getHuntersJournalStatusColor(
  unlocked: boolean,
  killsAchieved: number | undefined,
  killsRequired: number | undefined
): string {
  if (!unlocked) {
    return "text-red-400";
  }

  if (killsAchieved !== undefined && killsRequired !== undefined) {
    return killsAchieved >= killsRequired ? "text-green-400" : "text-yellow-400";
  }

  return "";
}
