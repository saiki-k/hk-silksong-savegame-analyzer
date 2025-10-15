import { CATEGORIES, isItemUnlockedInPlayerSave } from "../../parsers/dictionary";
import type { TabRenderProps } from "./types";
import type { NormalisedTrackableCategory, CategorySection } from "../../parsers/types";

interface GenericTabProps extends TabRenderProps {
  tabLabel: string;
}

function GenericTableSection({
  section,
  sectionsLength,
  parsedJson,
}: {
  section: CategorySection;
  sectionsLength: number;
  parsedJson: unknown;
}) {
  if (section.items.length === 0) return null;
  
  const itemsWithUnlockStatus = section.items.map((item) => ({
    ...item,
    unlocked: isItemUnlockedInPlayerSave(item.parsingInfo, parsedJson).unlocked,
  }));

  return (
    <div className="mb-8">
      {sectionsLength > 1 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-blue-200">{section.name}</h2>
          {section.description && section.description.trim() && (
            <p className="text-sm text-gray-300 mb-2">{section.description}</p>
          )}
          {section.descriptionMarkup && <div className="text-sm text-gray-300 mb-2">{section.descriptionMarkup}</div>}
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <table className="w-full border-collapse divide-y divide-gray-600 table-fixed">
          <colgroup>
            <col style={{ width: "56px" }} />
            <col style={{ width: "56px" }} />
            <col style={{ width: "220px" }} />
            <col style={{ width: "260px" }} />
            <col style={{ width: "48px" }} />
            <col style={{ width: "64px" }} />
          </colgroup>
          <thead>
            <tr className="text-left">
              <th className="px-2 py-1" />
              <th className="px-2 py-1 text-center" />
              <th className="px-2 py-1">Name</th>
              <th className="px-2 py-1">Details</th>
              <th className="px-2 py-1">Act</th>
              <th className="px-2 py-1" />
            </tr>
          </thead>
          <tbody>
            {itemsWithUnlockStatus.map((item, index) => {
              return (
                <tr key={index} className="border-b border-gray-700 last:border-b-0 group">
                  <td className="px-2 py-1 text-center align-middle">
                    <span className={item.unlocked ? "text-green-400" : "text-red-400"}>{item.unlocked ? "[x]" : "[ ]"}</span>
                  </td>
                  <td className="px-2 py-1 text-center align-middle">
                    <span className="text-xs text-blue-200 mt-1 font-normal">
                      {item.completionPercent ? `+${item.completionPercent}%` : ""}
                    </span>
                  </td>
                  <td
                    className={`px-2 py-1 break-words whitespace-pre-line group-hover:blur-none transition duration-100 ${
                      !item.unlocked ? "blur-sm" : ""
                    }`}
                  >
                    {item.name}
                  </td>
                  <td
                    className={`px-2 py-1 relative min-w-[140px] max-w-[260px] break-words whitespace-pre-line group-hover:blur-none transition duration-100 ${
                      !item.unlocked ? "blur-sm" : ""
                    }`}
                  >
                    {item.location}
                  </td>
                  <td
                    className={`px-2 py-1 w-[48px] text-center ${!item.unlocked ? "blur-sm group-hover:blur-none transition duration-100" : ""}`}
                  >
                    {item.whichAct}
                  </td>
                  <td className="px-2 py-1 text-center">
                    <button
                      className={`flex-1 min-w-[48px] py-2 rounded font-semibold transition-colors text-xs ${
                        item.mapLink
                          ? "bg-[#24344d] text-white hover:bg-blue-600"
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

export function GenericTab({ parsedJson, decrypted, tabLabel }: GenericTabProps) {
  if (!decrypted || !parsedJson) {
    return <div className="text-white text-center">Load a savefile to view "{tabLabel}" data.</div>;
  }

  const categoryData = CATEGORIES.find(cat => cat.name === tabLabel) as NormalisedTrackableCategory;
  if (!categoryData) {
    return <div className="text-white text-center">Category "{tabLabel}" not found.</div>;
  }

  return (
    <div className="text-white">
      {categoryData.sections.length === 1 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-blue-200">{categoryData.name}</h2>
          {categoryData.description &&
            categoryData.description.trim() &&
            categoryData.description.trim() !== categoryData.name && (
              <div
                className="text-sm text-gray-300 mb-2"
                dangerouslySetInnerHTML={{ __html: categoryData.description }}
              />
            )}
        </div>
      )}
      {categoryData.sections.map((section, sectionIndex) => (
        <GenericTableSection
          key={section.name || sectionIndex}
          section={section}
          sectionsLength={categoryData.sections.length}
          parsedJson={parsedJson}
        />
      ))}
    </div>
  );
}
