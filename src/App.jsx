import './App.css'
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState } from 'react';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ignore, setIgnore] = useState(false);

  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/movie/');

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
      {!isDetailPage && <Navbar/>}

      {/* pass movies in here yeehaw */}
      <Routes>
        <Route path="/" element={<Home movies={movies} loading={loading} error={error}/>} />
        <Route path="/movie/:id" element={<MovieDetail movies={movies} />} />
      </Routes>

      {!isDetailPage && <Footer />}
    </>
  )
}

export default App