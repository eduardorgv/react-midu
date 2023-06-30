import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useCallback, useRef, useState } from "react";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies } = useMovies({ search, sort });
  const inputRef = useRef();

  const debouncedGetMovies = useCallback(
    debounce(({ search }) => {
      getMovies({ search });
    }, 500),
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetMovies({ search: newSearch });
  };

  return (
    <div className="page">
      <header>
        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={search}
            ref={inputRef}
            placeholder="The Avengers, Harry Potter, The Matrix..."
          />
          <button type="submit">Buscar</button>
          <label><input type="checkbox" onChange={handleSort} checked={sort} />Ordenar búsqueda alfabéticamente</label>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
