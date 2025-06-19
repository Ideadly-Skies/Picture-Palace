export default function MovieCard({ title, poster, overview }) {
  return (
    <div className="card bg-base-100 w-full shadow-sm">
        {/* Make the whole figure a hoverable group */}
        <figure className="relative group">
            {/* Movie poster image */}
            <img
                src={poster}
                alt={`Poster for ${title}`}
                className="w-full h-auto transition duration-300 group-hover:brightness-50"
            />

            {/* Play icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                >
                <path d="M8 5v14l11-7z" />
                </svg>
            </div>
        </figure> 

      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{overview}</p>
        <div className="card-actions mt-4">
          <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition duration-200">
            ▶ Watch Now
          </button>
        </div>
      </div>
    </div>
  );
}
