import { useEffect } from "react";
import { useState } from "react";
import { LandingView } from "../Views/LandingView";
const axios = require("axios").default;

export function LandingController() {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  const url = process.env.REACT_APP_URL;
  const ts = process.env.REACT_APP_TS;
  const hash = process.env.REACT_APP_HASH;
  const apikey = process.env.REACT_APP_PUBLIC_KEY;

  function handleScroll(event) {
    if (
      window.innerHeight + event.target.documentElement.scrollTop ===
      event.target.documentElement.scrollHeight
    ) {
      console.log("please load more");
      setOffset(offset + 20);
    }
  }

  useEffect(() => {
    getCharacters(offset);
    window.addEventListener("scroll", handleScroll);
  }, [offset]);

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
    <div>
      <div>
        <nav>
          <ul>
            <li>
              <div>
                <form onSubmit={onSubmit}>
                  <input
                    type="text"
                    onChange={onInputChange}
                    value={search}
                    placeholder="Search Hero"
                  />
                  <input type="submit" value="Buscar" />
                  <button
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
            </li>
          </ul>
        </nav>
      </div>
      <div> {characters ? <LandingView characters={characters} /> : <></>}</div>
    </div>
  );
}

// Fix input search '';
