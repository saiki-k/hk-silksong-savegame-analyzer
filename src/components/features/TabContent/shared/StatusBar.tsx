interface StatusBarProps {
  statusText: string;
  hasMultipleSections: boolean;
  hasVisibleItems: boolean;
}

export function StatusBar({ statusText, hasMultipleSections, hasVisibleItems }: StatusBarProps) {
  return (
    <div className={hasMultipleSections && hasVisibleItems ? "mb-8" : "mb-0"}>
      <div
        className={`bg-gray-800/50 border-2 border-gray-600/30 px-4 py-2.5 border-t-0 ${
          hasMultipleSections && hasVisibleItems ? "rounded-b-lg" : ""
        }`}
      >
        <div className="italic text-xs text-gray-300">{statusText}</div>
      </div>
    </div>
  );
}
