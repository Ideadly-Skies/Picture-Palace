import './App.css'
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import MyList from './components/MyList';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [myList, setMyList] = useState([]);
  const [query, setQuery] = useState([]);

  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/movie/');
  const isCollectionPage = location.pathname.startsWith('/my-list');
  
  // fetching (non-blocking)
  async function fetchMovies() {
    setLoading(true);
    try {
      const response = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=6b3e018d07a42e39065208f94be35ed3");
      const result = await response.json();
      setMovies(result.results)
    } 
    catch (error) {
      setError(true);
    } 
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if ((location.pathname === '/' || isDetailPage || isCollectionPage ) && movies.length === 0) {
      fetchMovies();
    } 
  }, [location.pathname, movies.length]);

  useEffect(() => {
    const storedList = localStorage.getItem('myList');
    if (storedList) {
      setMyList(JSON.parse(storedList));
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      setProgress(100);
      return;
    }

    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 1 : prev));
    }, 30); 

    return () => clearInterval(timer);
  }, [loading]);

  return (
    <>
      {!isDetailPage && <Navbar setMovies={setMovies} query={query} setQuery={setQuery} setLoading={setLoading}/>}

      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route
            path="/"
            element={
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Home movies={movies} loading={loading} progress={progress} error={error}/>
              </motion.div>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MovieDetail setMyList={setMyList} myList={myList}/>
              </motion.div>
            }
          />
          <Route
            path="/my-list"
            element={
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <MyList myList={myList} query={query}/>
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>

      {!isDetailPage && !isCollectionPage && <Footer />}
    </>
  )
}

export default App