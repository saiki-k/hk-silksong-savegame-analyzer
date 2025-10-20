import type { ReactElement } from "react";
import { stats } from "../../../dictionary/categories/stats";
import { isItemUnlockedInPlayerSave } from "../../../dictionary/parsers";
import { formatSecondsToHMS } from "../../../utils";
import type { TabContentProps } from "./types";
import { CategoryHeader } from "./shared";

export function StatsContent({ saveFileObj }: TabContentProps): ReactElement {
  if (!saveFileObj) {
    return <div className="text-white">No savefile loaded.</div>;
  }

  const allItems = stats.sections.flatMap(section => section.items);

  const statsWithDisplayValues = allItems.map(item => {
    const { returnValue } = isItemUnlockedInPlayerSave(item.parsingInfo, saveFileObj.state.parsedJson);
    let displayValue = "";
    let fullTimeString = "";

    switch (item.name) {
      case "Game Mode":
        displayValue = returnValue === 1 ? "Steel Soul" : returnValue === 0 ? "Classic" : "";
        break;
      case "Playtime":
        if (typeof returnValue === "number") {
          const totalHours = Math.floor(returnValue / 3600);
          displayValue = `~${totalHours} hours`;
          const time = formatSecondsToHMS(returnValue);
          fullTimeString = time.replace(/(\d+):(\d+):(\d+)/, "$1h $2m $3s");
        }
        break;
      default:
        if (returnValue !== undefined) {
          displayValue = String(returnValue);
        }
        break;
    }

    return {
      ...item,
      displayValue,
      fullTimeString,
    };
  });

  return (
    <>
      <CategoryHeader title={stats.name} description={stats.description} />

      <div className="bg-gray-900/50 border border-gray-600 rounded-b-lg border-t-0 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsWithDisplayValues.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 border border-gray-600/50 rounded-xl p-6 hover:from-gray-700/60 hover:to-gray-700/40 hover:border-blue-500/30 transition-all duration-200 shadow-lg"
              title={item.fullTimeString || undefined}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-200 mb-3 tracking-tight">{item.displayValue || "—"}</div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
