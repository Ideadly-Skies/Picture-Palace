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
      <div>
          {loading && <p>Loading...</p>}
          <ul>
            {error && <p>Error!</p>}
            {!loading && movies.map(el => (
              // console.log("current el: ", el) 
              <MovieCard key={el.id} title={el.title}/>
            ))}
          </ul>  
      </div> 

      <Footer/>
    </>
  )
}

export default App