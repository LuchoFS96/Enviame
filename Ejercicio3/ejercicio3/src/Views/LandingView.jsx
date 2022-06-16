import { CharacterView } from "./CharacterView";

export function LandingView({ characters }) {
  return (
    <div className="">
      <div className="container-fluid row justify-content-md-center">
        {characters.map((character, index) => (
          <CharacterView character={character} key={index} />
        ))}
      </div>
    </div>
  );
}
