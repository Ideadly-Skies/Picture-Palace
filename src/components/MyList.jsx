import { Link } from "react-router-dom";

export default function MyList({ myList, query }) {
    const filteredList = query.length > 0
    ? myList.filter(movie =>
        movie.title?.toLowerCase().includes(query.toLowerCase())
      )
    : myList;

    return (
        <div className="bg-white min-h-screen text-white mt-10">
            <div className="container mx-auto px-6">
                <h1 className="text-black text-3xl font-bold mb-8">My List</h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredList.length > 0 ? (
                    filteredList.map((movie) => (
                    <Link
                        key={movie.id}
                        to={`/movie/${movie.id}`}
                        className="transition transform hover:scale-105"
                    >
                        <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-lg shadow-md"
                        />
                    </Link>
                    ))
                ) : (
                    <p className="text-gray-400 col-span-full">Your list is empty.</p>
                )}
                </div>
            </div>
        </div>
    );
}
