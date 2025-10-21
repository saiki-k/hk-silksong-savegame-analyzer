import type { ReactNode } from "react";

interface CategoryHeaderProps {
  title: string;
  description?: string | ReactNode;
}

export function CategoryHeader({ title, description }: CategoryHeaderProps) {
  return (
    <div className="bg-gray-800/30 border-2 border-gray-600/30 rounded-t-lg px-4 py-3 mb-0">
      <h2 className="text-xl font-bold text-blue-200">{title}</h2>
      {description && description !== title && (
        <div className="text-sm text-gray-300 mt-1">
          {typeof description === "string" ? <p>{description}</p> : description}
        </div>
      )}
    </div>
  );
}
