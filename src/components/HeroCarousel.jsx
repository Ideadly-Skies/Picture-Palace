import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; 

export default function HeroCarousel({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000); 

    return () => clearInterval(timer);
  }, [movies]);

  if (movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative w-full h-[60vh] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Link
            to={`/movie/${currentMovie.id}`}
            className="absolute inset-0 flex flex-col justify-center p-8 text-white bg-black/50"
          >
            <h1 className="text-3xl font-bold mb-4 drop-shadow-md">
              {currentMovie.title}
            </h1>
            <p className="max-w-xl text-sm drop-shadow-md">{currentMovie.overview}</p>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
