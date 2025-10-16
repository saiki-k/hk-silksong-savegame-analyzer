import { stats } from "../../parsers/categories/stats";
import { isItemUnlockedInPlayerSave } from "../../parsers/dictionary";
import type { TabRenderProps } from "./types";
import { formatSecondsToHMS } from "./utils";

export function StatsTab({ parsedJson, decrypted }: TabRenderProps) {
  if (!decrypted || !parsedJson) {
    return <div className="text-white text-center">Load a savefile to view "Stats" data.</div>;
  }

  // Get all items from sections
  const allItems = stats.sections.flatMap(section => section.items);

  const statsWithDisplayValues = allItems.map(item => {
    const { returnValue } = isItemUnlockedInPlayerSave(item.parsingInfo, parsedJson);
    let displayValue = "";
    if (item.name === "Game Mode") {
      displayValue = returnValue === 1 ? "Steel Soul" : returnValue === 0 ? "Classic" : "";
    } else if (item.name.toLowerCase() === "playtime" && typeof returnValue === "number") {
      displayValue = formatSecondsToHMS(returnValue);
    } else if (returnValue !== undefined) {
      displayValue = String(returnValue);
    }
    return {
      ...item,
      displayValue,
    };
  });

  return (
    <div className="text-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center">
          <table className="table-auto border-collapse divide-y divide-gray-600" style={{ minWidth: 0 }}>
            <thead>
              <tr className="text-left">
                <th className="px-2 py-1 whitespace-nowrap"></th>
                <th className="px-2 py-1 w-[100px] text-center whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody>
              {statsWithDisplayValues.map((item, index) => {
                return (
                  <tr key={index} className="border-b border-gray-700 last:border-b-0">
                    <td className="px-2 py-1 whitespace-nowrap">{item.name}</td>
                    <td className="px-2 py-1 w-[100px] text-center whitespace-nowrap">{item.displayValue}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
