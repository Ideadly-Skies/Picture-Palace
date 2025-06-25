import MovieCard from "./MovieCard"
import { motion } from 'framer-motion';
import movieLogo from '/photos/movie-icon.webp';
import NoMovies from "./NoMovies";

export default function Home({movies, page, setPage, totalPages, loading, progress, error}){
    
    return (
        <>  
            <div className="relative w-full min-h-screen px-6 py-10 bg-black">
                {loading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black text-white"
                    >
                        <div className="flex flex-col items-center -translate-y-20 space-y-4">
                            <img src={movieLogo} className="w-24 mb-2" alt="Movie Logo" />
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 border-opacity-50"></div>
                            <div className="text-red-600 text-xl font-semibold mt-2">{progress}%</div>
                        </div>
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

                {!loading && !error && movies.length === 0 && (
                    <NoMovies message="No movies found. Please check back later or try a different search!" />
                )}

                {!loading && !error && (
                    <>
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

                        <div className="flex justify-center mt-8">
                            <div className="join shadow-md rounded-full overflow-hidden border border-zinc-800">
                                <button
                                className={`join-item btn bg-black text-white border-none px-4 py-2 
                                    ${page <= 1 ? "opacity-50 cursor-not-allowed" : "hover:outline hover:outline-2 hover:outline-red-500"} `}
                                disabled={page <= 1}
                                onClick={() => setPage(page - 1)}
                                >
                                <i className="fa-solid fa-chevron-left"></i> Prev
                                </button>

                                <button
                                className={`join-item btn border-none ${
                                    "bg-red-600 text-white font-medium pointer-events-none"
                                }`}
                                >
                                Page {page}
                                </button>

                                <button
                                    className={`join-item btn bg-black text-white border-none px-4 py-2 ${
                                        page >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:outline hover:outline-2 hover:outline-red-500"
                                    }`}
                                    disabled={page >= totalPages}
                                    onClick={() => setPage(page + 1)}
                                >
                                    Next <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}