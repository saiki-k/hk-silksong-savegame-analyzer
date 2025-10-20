import type { ReactElement } from "react";
import type { TabId } from "../TabBar/tabs";
import type { SaveFileObj } from "../../../hooks/useSaveFile";
import type { ActFilter } from "../DisplayControls";

export interface TabContentProps {
  saveFileObj: SaveFileObj;
  activeTab: TabId;

  tabLabel?: string;
  showUnlocked?: boolean;
  customRenderer?: (props: TabContentProps) => ReactElement;
  showSpoilers?: boolean;
  inShowEverythingMode?: boolean;
  actFilter?: ActFilter;
}
