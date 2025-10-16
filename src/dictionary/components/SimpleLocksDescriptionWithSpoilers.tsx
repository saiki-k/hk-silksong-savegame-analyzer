const SimpleLocksDescriptionWithSpoilers = () => (
  <p className="text-sm text-gray-300">
    They are used to open simple locks. Each key can only be used once. <br />
    <span className="blur-sm hover:blur-none transition duration-100">Four</span> Simple Locks can be found throughout
    Pharloom; in{" "}
    <button
      onClick={() =>
        window.open("https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478090", "_blank")
      }
      className="inline-flex items-center px-2 py-1 bg-[#24344d] text-white hover:bg-blue-600 rounded text-xs font-semibold transition-colors cursor-pointer border-0 blur-sm hover:blur-none transition duration-100"
    >
      Wormways
    </button>
    ,{" "}
    <button
      onClick={() =>
        window.open("https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=476922", "_blank")
      }
      className="inline-flex items-center px-2 py-1 bg-[#24344d] text-white hover:bg-blue-600 rounded text-xs font-semibold transition-colors cursor-pointer border-0 blur-sm hover:blur-none transition duration-100"
    >
      Deep Docks
    </button>
    ,{" "}
    <button
      onClick={() =>
        window.open("https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478342", "_blank")
      }
      className="inline-flex items-center px-2 py-1 bg-[#24344d] text-white hover:bg-blue-600 rounded text-xs font-semibold transition-colors cursor-pointer border-0 blur-sm hover:blur-none transition duration-100"
    >
      Sinner's Road
    </button>
    , and{" "}
    <button
      onClick={() =>
        window.open("https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478911", "_blank")
      }
      className="inline-flex items-center px-2 py-1 bg-[#24344d] text-white hover:bg-blue-600 rounded text-xs font-semibold transition-colors cursor-pointer border-0 blur-sm hover:blur-none transition duration-100"
    >
      High Halls
    </button>
    .
  </p>
);

export default SimpleLocksDescriptionWithSpoilers;
