import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MovieCard from './components/MovieCard';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ignore, setIgnore] = useState(false);

  // fetching (non-blocking)
  async function fetchMovies(){
    setLoading(true);

    try {
      const response = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=6b3e018d07a42e39065208f94be35ed3")
      const result = await response.json()
      if (!ignore){
        setMovies(result.results);
      }
    } catch (error) {
      console.log(error)
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // fetch movies in here
    fetchMovies();

    // will not run before any re-render occur
    return () => {
      setIgnore(true)
    }

  }, [])

  return (
    <>
      <Navbar/>

      {/* fetch movies in here yeehaw */}
      <div className="px-6 py-10">
        {loading && <p>Loading...</p>}
        {error && <p>Error!</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-10">
          {!loading &&
            movies.map((el) => (
              <MovieCard key={el.id} title={el.title} poster={`https://image.tmdb.org/t/p/w500${el.poster_path}`} overview={el.overview}/>
            ))}
            {console.log(movies)}
        </div>
      </div> 

      <Footer/>
    </>
  )
}

export default App