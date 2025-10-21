import { LocationButton } from "../../../ui/LocationButton";

const simpleLockLocations = [
  {
    name: "Wormways",
    mapGenieLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478090",
  },
  {
    name: "Deep Docks",
    mapGenieLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=476922",
  },
  {
    name: "Sinner's Road",
    mapGenieLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478342",
  },
  {
    name: "High Halls",
    mapGenieLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478911",
  },
];

interface SimpleLocksDescriptionProps {
  showSpoilers?: boolean;
}

export const SimpleLocksDescription = ({ showSpoilers = false }: SimpleLocksDescriptionProps) => (
  <p className="text-sm text-gray-300">
    They are used to open simple locks. Each key can only be used once. <br />
    <span className={!showSpoilers ? "blur-sm hover:blur-none transition duration-100" : ""}>Four</span> Simple Locks
    can be found throughout Pharloom; in{" "}
    {simpleLockLocations.map((location, index) => (
      <span key={location.name}>
        <LocationButton url={location.mapGenieLink} showSpoilers={showSpoilers}>
          {location.name}
        </LocationButton>
        {index < simpleLockLocations.length - 1 && (index === simpleLockLocations.length - 2 ? ", and " : ", ")}
      </span>
    ))}
    .
  </p>
);
