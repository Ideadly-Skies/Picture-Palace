import MovieCard from "./MovieCard"
import { motion } from 'framer-motion';

export default function Home({movies, loading, error}){
    return (
        // fetch movies in here yeehaw
        <div className="relative w-full min-h-screen px-6 py-10">
            {loading && (
                <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-black text-white"
                >
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-50"></div>
                </motion.div>
            )}

            {error && (
                <motion.div
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-red-400 font-semibold"
                >
                Something went wrong fetching your movies.
                </motion.div>
            )}

            {!loading && !error && (
                <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-10"
                >
                {movies?.map((el) => (
                    <MovieCard
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    poster={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                    overview={el.overview}
                    />
                ))}
                </motion.div>
            )}
        </div>
    )
}