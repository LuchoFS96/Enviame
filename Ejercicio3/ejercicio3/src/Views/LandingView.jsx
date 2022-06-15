import { CharacterView } from "./CharacterView";

export function LandingView({ characters }) {
  return (
    <div>
      {characters.map((character, index) => (
        <CharacterView character={character} key={index} />
      ))}
    </div>
  );
}
