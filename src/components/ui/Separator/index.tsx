interface SeparatorProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Separator({ className = "", orientation = "horizontal" }: SeparatorProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={`h-6 w-px bg-gradient-to-b from-transparent via-gray-500/40 to-transparent flex-shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent ${className || "mt-8 mb-8"}`}
      style={{
        boxShadow: "0 0 8px rgba(59, 130, 246, 0.2)",
      }}
    />
  );
}
