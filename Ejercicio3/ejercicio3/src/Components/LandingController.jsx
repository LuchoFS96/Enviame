import { useEffect } from "react";
import { useState } from "react";
import { LandingView } from "../Views/LandingView";
const axios = require("axios").default;

export function LandingController() {
  //Creo estados que me ayudaran a realizar distintas tareas.
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [create, setCreate] = useState(false);
  const [newChar, setNewChar] = useState({
    name: "",
    description: "",
    thumbnail: "",
    modified: "",
  });
  console.log(offset)
  //Importo variables de entorno.
  const url = process.env.REACT_APP_URL;
  const ts = process.env.REACT_APP_TS;
  const hash = process.env.REACT_APP_HASH;
  const apikey = process.env.REACT_APP_PUBLIC_KEY;
  //Me ayuda a detectar cuando llego al final de la pagina, modifico un estado para que llame a cargar mas personajes.
  function handleScroll(event) {
    if (
      window.innerHeight + event.target.documentElement.scrollTop + 1 >=
      event.target.documentElement.scrollHeight
    ) {
      wait();
      setOffset(offset + 20);
      wait();
    }
  }
  //Funcion que espera 1 segundo (la utilizo para que se haga una sola llamada a cargar personajes cuando llego al final de la pagina.)
  async function wait() {
    await new Promise((r) => setTimeout(r, 1000));
  }
  //OnMount() me carga mi array de personajes inicial y un evento que me indica en que parte de la pagina estoy.
  useEffect(() => {
    getCharacters(offset);
    window.addEventListener("scroll", handleScroll);
  }, [offset]);
  //Funciones para buscar personajes.
  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    // if (search === "") {
    //   getCharacters(0, "", true);
    // } else {
    getCharacters(offset, search);
    // }
  }
  //Funcion principal en la que busco personajes de la API, y los modifico acorde con los datos que los necesito.
  function getCharacters(offset, name = "") {
    try {
      if (name) {
        axios
          .get(
            `${url}/v1/public/characters?ts=${ts}&apikey=${apikey}&hash=${hash}&name=${name}`
          )
          .then((character) => {
            let aux = {
              name: character.data.data.results[0].name,
              description: character.data.data.results[0].description
                ? character.data.data.results[0].description
                : `${character.data.data.results[0].name} doesn't have an available description.`,
              thumbnail: `${character.data.data.results[0].thumbnail.path}/portrait_xlarge.${character.data.data.results[0].thumbnail.extension}`,
              modified: character.data.data.results[0].modified
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-"),
            };
            setCharacters([aux]);
          });
        return;
      }
      if (!offset) {
        // if (aux) {
        //   setCharacters([]);
        //   console.log("entre");
        // }
        axios
          .get(
            `${url}/v1/public/characters?ts=${ts}&apikey=${apikey}&hash=${hash}`
          )
          .then((r) => {
            let aux = r.data.data.results.map((character) => {
              return {
                name: character.name,
                description: character.description
                  ? character.description
                  : `${character.name} doesn't have an available description.`,
                thumbnail: `${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`,
                modified: character.modified
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join("-"),
              };
            });

            setCharacters([...characters, ...aux]);
            // console.log(Array.from(new Set([...characters, ...aux])));
            // r.data.data.results
          });
      } else {
        axios
          .get(
            `${url}/v1/public/characters?ts=${ts}&apikey=${apikey}&hash=${hash}&offset=${offset}`
          )
          .then((r) => {
            // setCharacters([...characters, ...r.data.data.results])
            let aux = r.data.data.results.map((character) => {
              return {
                name: character.name,
                description: character.description
                  ? character.description
                  : `${character.name} doesn't have an available description.`,
                thumbnail: `${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`,
                modified: character.modified
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join("-"),
              };
            });
            setCharacters([...characters, ...aux]);
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      {/* 'SearchBar' con algunos botones para mejorar su funcionamiento y experiencia del user. */}
      <div className="container-fluid row">
        <form
          onSubmit={onSubmit}
          className="container-fluid row justify-content-md-center m-2"
        >
          <input
            type="text"
            onChange={onInputChange}
            value={search}
            placeholder="Search Hero"
            className="form-control  m-1 col-sm"
          />
          <input
            type="submit"
            value="Buscar"
            className="btn btn-primary  btn-sm  m-1 col-sm"
          />
          <button
            className="btn btn-secondary btn-sm  m-1 col-sm"
            onClick={() => {
              setOffset(0);
              setCharacters([]);
              setSearch("");
              getCharacters();
            }}
          >
            Clear
          </button>
        </form>
      </div>
      {/* Boton que habilita la creacion de un nuevo personaje. */}
      <div className="container mb-2">
        {!create ? (
          <button
            className="btn btn-primary  btn-sm"
            onClick={(e) => setCreate(true)}
          >
            Create new character
          </button>
        ) : (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setNewChar(newChar);
                setCreate(false);
                setCharacters([newChar, ...characters]);
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
            </form>
          </div>
        )}
      </div>
      {/* Llamada al componente LandingView que es el encargado de renderizar los distintos personajes a partir del array proporcionado. */}
      <div className="container-fluid">
        {" "}
        {characters ? <LandingView characters={characters} /> : <></>}
      </div>
    </div>
  );
}

// Fix input search '';
