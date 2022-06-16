import { CharacterView } from "./CharacterView";

export function LandingView({ characters }) {
  return (
    <div className="">
      {/* Mapeo el array de personajes para renderizar un componente distinto para cada uno de ellos. */}
      <div className="container-fluid row justify-content-md-center">
        {characters.map((character, index) => (
          <CharacterView character={character} key={index} />
        ))}
      </div>
    </div>
  );
}
