import './App.css'
import HeroCarousel from './components/HeroCarousel';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import MyList from './components/MyList';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [myList, setMyList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/movie/');
  const isCollectionPage = location.pathname.startsWith('/my-list');

  const [searchParams] = useSearchParams();
  const hasQuery = !!searchParams.get("query");

  // fetching (non-blocking)
  async function fetchMovies(page = 1) {
    setLoading(true);
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=6b3e018d07a42e39065208f94be35ed3&page=${page}&include_adult=false`);
      const result = await response.json();
      console.log(result)
      setMovies(result.results || [])
      setTotalPages(result.total_pages); 
    } 
    catch (error) {
      setError(true);
    } 
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    if (location.pathname === '/' || isDetailPage || isCollectionPage || movies.length == 0) {
      const handler = setTimeout(() => {
        fetchMovies(page);
      }, 1000) 
      return () => clearTimeout(handler); 
    }
  }, [location.pathname, movies.length, page]);
  
  // useEffect(() => {
  //   if (location.pathname === '/' || isDetailPage || isCollectionPage) {
  //     setLoading(true);
  //     const handler = setTimeout(() => {
  //       fetchMovies(page);
  //     }, 1000);
  //     return () => clearTimeout(handler);
  //   }
  // }, [location.pathname, page, isDetailPage, isCollectionPage]);

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
      {!isDetailPage && <Navbar setMovies={setMovies} setLoading={setLoading}/>}

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
                {!hasQuery && <HeroCarousel movies={movies} />}

                <div className="px-8 pt-16 pb-8 text-center bg-black from-black via-black/60 to-transparent">
                  <h2 className="text-4xl font-extrabold text-white tracking-[0.2em] uppercase drop-shadow-lg">
                    {hasQuery ? "Search Results" : "Now Playing"}
                  </h2>
                  <div className="w-24 h-1 mx-auto mt-2 mb-4 bg-red-600 opacity-80 rounded-full"></div>
                  <p className="text-white/70 mt-2 text-sm font-light max-w-md mx-auto tracking-wide drop-shadow-sm">
                    {hasQuery
                      ? `Results for “${searchParams.get("query")}”`
                      : "Browse our top movies currently in theaters — discover the best picks for your next cinematic experience."}
                  </p>
                </div>

                <Home movies={movies} page={page} setPage={setPage} totalPages={totalPages} loading={loading} progress={progress} error={error}/>
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
                <MyList myList={myList}/>
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