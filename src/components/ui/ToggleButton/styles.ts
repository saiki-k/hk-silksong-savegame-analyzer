export const toggleButtonStyles = {
  interactive: "text-blue-300 hover:text-blue-200 transition-colors cursor-pointer",

  textUnderline:
    "font-medium leading-none underline decoration-dotted decoration-blue-400/30 hover:decoration-blue-300/60 transition-all whitespace-nowrap",

  pill: {
    base: "px-3 py-1 rounded text-xs font-semibold transition-all duration-200 border",
    selected: "bg-blue-500/20 text-blue-300 border-blue-400/40 shadow-sm shadow-blue-500/10 cursor-pointer",
    unselected:
      "bg-gray-700/30 text-gray-400 border-gray-600/30 hover:border-gray-500/50 hover:text-gray-300 cursor-pointer",
    disabled: "bg-gray-700/30 text-gray-600 border-gray-600/30 opacity-50 cursor-not-allowed",
  },

  group: "group flex items-center gap-2",

  emoji: {
    base: "text-lg leading-none opacity-60 group-hover:opacity-80 transition-opacity",
  },

  disabled: "text-gray-600 cursor-not-allowed opacity-50",
} as const;
