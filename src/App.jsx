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
  const [error, setError] = useState(false);
  const [myList, setMyList] = useState([]);

  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/movie/');
  const isCollectionPage = location.pathname.startsWith('/my-list');
  
  // fetching (non-blocking)
  async function fetchMovies() {
    setLoading(true);
    try {
      const response = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=6b3e018d07a42e39065208f94be35ed3");

      if (response.status === 429) {
        console.warn("Rate limit exceeded. Try again later.");
        return; 
      }

      const result = await response.json();

      if (Array.isArray(result.results) && result.results.length > 0) {
        setMovies(result.results);
        localStorage.setItem('cachedMovies', JSON.stringify(result.results));
      } else {
        console.warn("No movies found in response.");
        setMovies([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log("this is being called (myList)")

    // load list from local storage
    const storedList = localStorage.getItem('myList');
    if (storedList) {
      setMyList(JSON.parse(storedList));
    }
  }, []);

  useEffect(() => {
    console.log("this is being called as well (fetch movie)")

    if (location.pathname === '/') {
      // always refetch when the array is empty 
      if (movies.length === 0){
        const cached = localStorage.getItem('cachedMovies');
        if (cached) {
          setMovies(JSON.parse(cached));
        } else {
          fetchMovies()
        }
      } 
    }
  }, [location.pathname, movies.length]);

  useEffect(() => {
    console.log('Path changed:', location.pathname);
    console.log('Current movies:', movies);
  }, [location.pathname, movies]);

  return (
    <>
      {!isDetailPage && <Navbar setMovies={setMovies}/>}

      {/* pass movies in here yeehaw */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                key="home"
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
                <MovieDetail movies={movies} setMyList={setMyList} myList={myList}/>
              </motion.div>
            }
          />
        <Route
          path="/my-list"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <MyList myList={myList} />
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