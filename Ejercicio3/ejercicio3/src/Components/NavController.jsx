import { useState } from "react";

export function NavController() {
  const [search, setSearch] = useState("");

  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    alert(search);
    // dispatch(searchDog(search));
  }

  return (
    <>
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
              </form>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
