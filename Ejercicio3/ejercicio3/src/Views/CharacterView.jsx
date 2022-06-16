import { useState } from "react";

export function CharacterView({ character }) {
  const [edit, setEdit] = useState(false);
  const [newChar, setNewChar] = useState(character);

  return (
    <div>
      <button onClick={() => setEdit(true)}>Edit</button>
      {!edit ? (
        <div>
          <p>{character.name}</p>
          <p>{character.description}</p>
          {/* <p>{character.thumbnail}</p> */}
          <img src={character.thumbnail} alt="thumbnail" />
          <p>{character.modified}</p>
        </div>
      ) : (
        <>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setNewChar(newChar);
                setEdit(false);
                console.log(newChar);
              }}
            >
              <input
                type="text"
                placeholder={newChar.name}
                onChange={(e) =>
                  setNewChar(newChar, (newChar.name = e.target.value))
                }
              />
              <input
                type="text"
                placeholder={newChar.description}
                onChange={(e) =>
                  setNewChar(newChar, (newChar.description = e.target.value))
                }
              />
              <input
                type="url"
                placeholder={newChar.thumbnail}
                onChange={(e) =>
                  setNewChar(newChar, (newChar.thumbnail = e.target.value))
                }
              />
              <input
                type="text"
                placeholder={newChar.modified}
                onChange={(e) =>
                  setNewChar(newChar, (newChar.modified = e.target.value))
                }
              />
              <input type="submit" value="Confirmar" />
              {/* <input type="text" value={character.description} />
              <input type="url" value={character.thumbnail} />
              <input type="text" value={character.modified} /> */}
            </form>
          </div>
        </>
      )}
    </div>
  );
}
