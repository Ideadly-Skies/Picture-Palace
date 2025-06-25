import MovieCard from "./MovieCard"
import { motion } from 'framer-motion';
import movieLogo from '/photos/movie-icon.webp';

export default function Home({movies, page, setPage, totalPages, loading, progress, error}){
    
    function getPaginationRange(currentPage, totalPages, siblingCount = 1) {
        const totalNumbers = siblingCount * 2 + 5;
        
        if (totalPages <= totalNumbers) {
            return [...Array(totalPages).keys()].map((n) => n + 1);
        }

        const left = currentPage - siblingCount;
        const right = currentPage + siblingCount;

        const range = [];

        // First page
        range.push(1);

        // Left ellipsis
        if (left > 2) {
            range.push('…');
        }

        // Middle pages
        const start = Math.max(left, 2);
        const end = Math.min(right, totalPages - 1);
        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        // Right ellipsis
        if (right < totalPages - 1) {
            range.push('…');
        }

        // Last page
        range.push(totalPages);

        return range;
    }
    
    const paginationRange = getPaginationRange(page, totalPages);

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
                            <div className="join">
                                {paginationRange.map((num, index) => (
                                typeof num === 'number' ? (
                                    <button
                                    key={index}
                                    className={`join-item btn btn-square focus:outline-none focus:ring-0 ${
                                        page === num ? "bg-red-600 text-white" : "bg-white text-black"
                                    }`}
                                    onClick={() => setPage(num)}
                                    >
                                    {num}
                                    </button>
                                ) : (
                                    <span key={index} className="join-item btn btn-square pointer-events-none opacity-50">…</span>
                                )
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}