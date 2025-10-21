export function EmptyState() {
  return (
    <div className="bg-gray-900/50 border border-gray-600 border-t-0 rounded-b-lg p-12 text-center">
      <div className="flex flex-col items-center gap-4 max-w-lg mx-auto">
        <div className="text-4xl text-yellow-400/80 mb-2">✨</div>

        <div className="space-y-2">
          <h3 className="mb-0 text-xl font-medium text-gray-200">Looks pretty complete!</h3>
          <p className="text-sm text-gray-400">Could it be you've found everything here already?</p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700/50 w-full">
          <p className="text-xs text-gray-500">
            Try adjusting the <span className="text-blue-300 font-medium">content filters</span> above to explore
            different views.
          </p>
        </div>
      </div>
    </div>
  );
}
