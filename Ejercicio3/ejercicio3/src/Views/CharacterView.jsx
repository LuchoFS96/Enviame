export function CharacterView({ character }) {
  return (
    <div>
      <p>{character.name}</p>
      <p>{character.description}</p>
      {/* <p>{character.thumbnail}</p> */}
      <img src={character.thumbnail} alt="thumbnail" />
      <p>{character.modified}</p>
    </div>
  );
}
