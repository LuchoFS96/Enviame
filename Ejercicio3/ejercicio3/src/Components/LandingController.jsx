import { useEffect } from "react";
import { useState } from "react";
import { LandingView } from "../Views/LandingView";
import { NavController } from "./NavController";
const axios = require("axios").default;

export function LandingController() {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);

  const url = process.env.REACT_APP_URL;
  const ts = process.env.REACT_APP_TS;
  const hash = process.env.REACT_APP_HASH;
  const apikey = process.env.REACT_APP_PUBLIC_KEY;
  console.log(characters);

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

  function getCharacters(offset) {
    try {
      if (!offset) {
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
        <NavController />
      </div>
      <div> {characters ? <LandingView characters={characters} /> : <></>}</div>
    </div>
  );
}
