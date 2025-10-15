const SimpleLocksSpoiler = () => (
  <details>
    <summary>
      <strong>Spoiler: Simple Lock Locations</strong>
    </summary>
    Four Simple Locks can be found throughout the game; they're in{" "}
    <button
      onClick={() =>
        window.open("https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478090", "_blank")
      }
      className="inline-flex items-center px-2 py-1 bg-[#24344d] text-white hover:bg-blue-600 rounded text-xs font-semibold transition-colors cursor-pointer border-0"
    >
      Wormways
    </button>
    ,{" "}
    <button
      onClick={() =>
        window.open("https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=476922", "_blank")
      }
      className="inline-flex items-center px-2 py-1 bg-[#24344d] text-white hover:bg-blue-600 rounded text-xs font-semibold transition-colors cursor-pointer border-0"
    >
      Deep Docks
    </button>
    ,{" "}
    <button
      onClick={() =>
        window.open("https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478342", "_blank")
      }
      className="inline-flex items-center px-2 py-1 bg-[#24344d] text-white hover:bg-blue-600 rounded text-xs font-semibold transition-colors cursor-pointer border-0"
    >
      Sinner's Road
    </button>
    , and{" "}
    <button
      onClick={() =>
        window.open("https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478911", "_blank")
      }
      className="inline-flex items-center px-2 py-1 bg-[#24344d] text-white hover:bg-blue-600 rounded text-xs font-semibold transition-colors cursor-pointer border-0"
    >
      High Halls
    </button>
    .
  </details>
);

export default SimpleLocksSpoiler;
