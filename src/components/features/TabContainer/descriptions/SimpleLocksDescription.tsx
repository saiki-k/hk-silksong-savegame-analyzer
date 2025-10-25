import { LocationButton } from "@/components/ui";
import { getHoverBlurClassNames } from "@/utils";

const simpleLockLocations = [
  {
    name: "Wormways",
    mapLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478090",
  },
  {
    name: "Deep Docks",
    mapLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=476922",
  },
  {
    name: "Sinner's Road",
    mapLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478342",
  },
  {
    name: "High Halls",
    mapLink: "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478911",
  },
];

interface SimpleLocksDescriptionProps {
  showSpoilers?: boolean;
}

export const SimpleLocksDescription = ({ showSpoilers = false }: SimpleLocksDescriptionProps) => {
  const blurClassNames = getHoverBlurClassNames({ shouldBlur: !showSpoilers, onGroupHover: false });
  return (
    <p className="text-sm text-gray-300">
      They are used to open simple locks. Each key can only be used once. <br />
      <span className={blurClassNames}>Four</span> Simple Locks can be found throughout Pharloom; in{" "}
      {simpleLockLocations.map((location, index) => (
        <span key={location.name}>
          <LocationButton url={location.mapLink} className={blurClassNames}>
            {location.name}
          </LocationButton>
          {index < simpleLockLocations.length - 1 && (index === simpleLockLocations.length - 2 ? ", and " : ", ")}
        </span>
      ))}
      .
    </p>
  );
};
