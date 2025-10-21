import type { ReactElement } from "react";
import type { TabId } from "../TabBar/tabs";
import type { SaveFileObj } from "../../../hooks/useSaveFile";
import type { ActFilter } from "../FilterControls";

export interface TabContentProps {
  saveFileObj: SaveFileObj;
  activeTab: TabId;
  hasUploadedSaveFile: boolean;

  tabLabel?: string;
  showUnlocked?: boolean;
  customRenderer?: (props: TabContentProps) => ReactElement;
  showSpoilers?: boolean;
  inShowEverythingMode?: boolean;
  actFilter?: ActFilter;
}
