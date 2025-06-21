import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function MovieDetail({ setMovies, setMyList, myList }) {
  const { id } = useParams();
  const [showVideo, setShowVideo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [notification, setNotification] = useState(null);
  const videoRef = useRef(null);

  const defaultTrailerUrl = `/trailers/top_gun_maverick.mp4`;
  const trailerUrl = `/trailers/` + id + `_trailer.mp4`;
  const [currentTrailerUrl, setCurrentTrailerUrl] = useState(trailerUrl);
  const [movie, setMovie] = useState(null);

  // setMovies from local storage so when you press the
  // back button there's no error
  const storedMovies = localStorage.getItem("movies");
  if (storedMovies) {
    setMovies(JSON.parse(storedMovies));
  }
  
  useEffect(() => {
    async function fetchMovieDetail() {
      const API_KEY = '6b3e018d07a42e39065208f94be35ed3';
      const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

      try {
        const response = await fetch(URL);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie detail:", error);
      }
    }

    fetchMovieDetail();
  }, [id]);

  const isAlreadyInList = useMemo(() => {
    if (!movie) return false;
    return myList.some((m) => m.id === movie.id);
  }, [movie, myList]);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) playPromise.catch(() => {});
    }
    const timer = setTimeout(() => setShowVideo(true), 2500);
    return () => clearTimeout(timer);
  }, [showVideo]);

  function handleVideoError() {
    setCurrentTrailerUrl(defaultTrailerUrl);
  }

  function triggerNotification(message, type = "success") {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 2000);
  }

  function handleToggleList() {
    if (!movie) return;
    
    setMyList((prevList) => {
      const updatedList = isAlreadyInList
        ? prevList.filter((m) => m.id !== movie.id)
        : [...prevList, movie];

      localStorage.setItem("myList", JSON.stringify(updatedList));

      triggerNotification(
        isAlreadyInList ? "Removed from list ⚠️" : "Added to list ✅",
        isAlreadyInList ? "danger" : "success"
      );

      return updatedList;
    });
  }

  if (!movie) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-50"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen text-white">
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded shadow-lg z-50
            ${notification.type === "success" ? "bg-green-600" : "bg-red-600"} text-white`}
        >
          {notification.message}
        </motion.div>
      )}

      {!showVideo && !imageLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-50"></div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!showVideo ? (
          <motion.img
            key="thumbnail"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="Backdrop"
            onLoad={() => setImageLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover brightness-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        ) : (
          <motion.video
            key="video"
            ref={videoRef}
            src={currentTrailerUrl}
            autoPlay
            playsInline
            loop
            onError={handleVideoError}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/30 flex items-center pl-12 pr-6">
        <div className="max-w-xl space-y-6">
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <div className="text-sm text-gray-300 space-x-4">
            <span>{movie.release_date?.slice(0, 4)}</span>
            <span>{movie.vote_average.toFixed(1)} ★</span>
            <span>{movie.genres?.[0]?.name}</span>
          </div>
          <p className="text-gray-200">
            {movie.overview} <Link to="/" className="underline hover:text-white">[home]</Link>
          </p>

          <div className="flex space-x-4 mt-4">
            <Link
              to={`https://id2.idlixvip.asia/search/${encodeURIComponent(
                movie.title.replace(/\s+/g, "+")
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-300"
            >
              ▶ Play
            </Link>
            <button
              className={`px-6 py-2 rounded-md font-semibold transition duration-200 ${
                isAlreadyInList
                  ? "bg-blue-700 hover:bg-blue-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={handleToggleList}
            >
              {isAlreadyInList ? "✓ Added" : "+ My List"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
