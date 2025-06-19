import './App.css'
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState } from 'react';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

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
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Home movies={movies} loading={loading} error={error} />
              </motion.div>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MovieDetail movies={movies} />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>

      {!isDetailPage && <Footer />}
    </>
  )
}

export default App