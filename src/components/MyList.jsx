import { Link } from "react-router-dom";
import { useState } from "react";

export default function MyList({ myList, query }) {
  const [page, setPage] = useState(1);
  const moviesPerPage = 12;

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

  // Pagination utility
  function getPaginationRange(currentPage, totalPages, siblingCount = 1) {
    const totalNumbers = siblingCount * 2 + 5;
    if (totalPages <= totalNumbers) {
      return [...Array(totalPages).keys()].map((n) => n + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPages
    );

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;

    const range = [1];

    if (showLeftEllipsis) range.push("…");

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) range.push(i);
    }

    if (showRightEllipsis) range.push("…");
    range.push(totalPages);

    return range;
  }

  const paginationRange = getPaginationRange(page, totalPages);

  return (
    <div className="bg-black min-h-screen text-white mt-5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
        </div>

        {/* Pagination */}
        {filteredList.length > moviesPerPage && (
          <div className="flex justify-center mt-8">
            <div className="join">
              {paginationRange.map((num, index) =>
                typeof num === "number" ? (
                  <button
                    key={index}
                    onClick={() => setPage(num)}
                    className={`join-item btn btn-square focus:outline-none focus:ring-0 ${
                      page === num
                        ? "bg-red-600 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {num}
                  </button>
                ) : (
                  <span
                    key={index}
                    className="join-item btn btn-square pointer-events-none opacity-50"
                  >
                    …
                  </span>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
