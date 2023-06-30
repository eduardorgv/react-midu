import './App.css'
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';
import { useRef } from 'react';
import { useSearch } from './hooks/useSearch';

function App() {
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies } = useMovies({search});
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies()
  }

  const handleChange = (event) => {
    updateSearch(event.target.value);
  }

  return (
    <div className='page'>
      <header>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} ref={inputRef} placeholder='The Avengers, Harry Potter, The Matrix...' />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        {/* {
          loading 
            ? <p>Cargando...</p>
            : <Movies movies={movies}/>
        } */}
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App
