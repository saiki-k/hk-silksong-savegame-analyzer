export function Header() {
  return (
    <div className="flex flex-col items-center mt-6 mb-8 gap-2">
      <h1
        className="text-4xl font-extralight text-white uppercase tracking-[0.15em] relative"
        style={{
          textShadow:
            "0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2), 0 2px 4px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)",
          filter: "drop-shadow(0 0 10px rgba(96, 165, 250, 0.3))",
        }}
      >
        <span className="relative inline-block">
          <span
            className="select-none bg-gradient-to-b from-blue-100 via-white to-blue-200 bg-clip-text text-transparent"
            style={{
              WebkitTextStroke: "0.5px rgba(147, 197, 253, 0.3)",
            }}
          >
            Silksong Completionist
          </span>
        </span>
      </h1>
      <h2 className="text-xs select-none text-base font-thin text-gray-500 uppercase tracking-[0.2em] opacity-80">
        Track Your{" "}
        <span className="relative inline-block">
          <span
            className="select-none font-semibold bg-gradient-to-b from-blue-100 via-white to-blue-200 bg-clip-text text-transparent"
            style={{
              WebkitTextStroke: "0.5px rgba(147, 197, 253, 0.3)",
            }}
          >
            Hollow Knight: Silksong
            <span
              className="absolute font-semibold inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent bg-clip-text text-transparent pointer-events-none"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 2.5s ease-in-out infinite",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                mixBlendMode: "screen",
              }}
              aria-hidden="true"
            >
              Hollow Knight: Silksong
            </span>
          </span>
        </span>{" "}
        Progress
      </h2>
    </div>
  );
}
