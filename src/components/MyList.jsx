import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MyList({ myList }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const query = searchParams.get("query") || ""; 
  const moviesPerPage = 12;

  const updatePage = (newPage) => {
    const params = {};
    if (query) params.query = query;
    params.page = newPage;
    setSearchParams(params);
  };

  // Filter list based on query
  const filteredList =
    query.length > 0
      ? myList.filter((movie) =>
          movie.title?.toLowerCase().includes(query.toLowerCase())
        )
      : myList;

  const totalPages = Math.ceil(filteredList.length / moviesPerPage);

  const displayedMovies = filteredList.slice(
    (page - 1) * moviesPerPage,
    page * moviesPerPage
  );

  return (
    <div className="bg-black min-h-screen text-white mt-5">
      <div className="container mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={page} // very important for triggering re-renders
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {displayedMovies.length > 0 ? (
              displayedMovies.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="relative group transform hover:scale-105 transition"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg shadow-md border border-transparent group-hover:border-red-500 group-hover:ring-2 group-hover:ring-red-500"
                  />
                </Link>
              ))
            ) : (
              <p className="text-white/70 col-span-full">Your list is empty.</p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {filteredList.length > moviesPerPage && (
        <div className="flex justify-center mt-8">
            <div className="join shadow-md rounded-full overflow-hidden border border-zinc-800">
            {/* Previous */}
            <button
                className={`join-item btn bg-black text-white border-none ${
                page <= 1 ? "opacity-50 cursor-not-allowed" : "hover:outline hover:outline-2 hover:outline-red-500"
                }`}
                disabled={page <= 1}
                onClick={() => updatePage(page - 1)}
            >
                <i className="fa-solid fa-chevron-left"></i> Prev
            </button>

            {/* Active page */}
            <button className="join-item btn bg-red-600 text-white border-none pointer-events-none">
                Page {page}
            </button>

            {/* Next */}
            <button
                className={`join-item btn bg-black text-white border-none ${
                page >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:outline hover:outline-2 hover:outline-red-500"
                }`}
                disabled={page >= totalPages}
                onClick={() => updatePage(page + 1)}
            >
                Next <i className="fa-solid fa-chevron-right"></i>
            </button>
            </div>
        </div>
        )}
      </div>
    </div>
  );
}
