import type { TabId } from "./tabs";
import { TAB_CONFIG } from "./tabs";
import { TabButton } from "./TabButton";
import type { SaveFileObj } from "../../../hooks/useSaveFile";

interface TabBarProps {
  activeTab: TabId;
  onSelect: (tab: TabId) => void;
  saveFileObj: SaveFileObj;
  inShowEverythingMode?: boolean;
}

export function TabBar({ activeTab, onSelect, saveFileObj, inShowEverythingMode }: TabBarProps) {
  return (
    <div className="flex justify-between mt-4 mb-2 flex-wrap gap-2">
      {TAB_CONFIG.filter(tab => !tab.hideButton).map(tab => (
        <TabButton
          key={tab.tabId}
          tab={tab}
          isActive={tab.tabId === activeTab}
          onSelect={onSelect}
          saveFileObj={saveFileObj}
          inShowEverythingMode={inShowEverythingMode}
        />
      ))}
    </div>
  );
}
