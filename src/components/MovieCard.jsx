import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ id, title, poster, overview }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => setHovered(true), 2000);
  };
  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    setHovered(false);
  };

  const searchUrl = `https://www.youtube.com/results?search_query=trailer+${encodeURIComponent(
    title
  )}`;

  return (
    <div
      className="bg-zinc-900 w-full rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer border border-zinc-800"
      onClick={() => navigate(`/movie/${id}`)}
    >
      <figure
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={poster}
          alt={`Poster for ${title}`}
          className="w-full h-auto transition duration-300 group-hover:brightness-50"
        />

        {/* Overlay play icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-white drop-shadow-md"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        {/* Hover trailer link */}
        {hovered && (
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-black text-white text-lg font-semibold opacity-100 transition-opacity duration-300"
          >
            🔗 Watch Trailer
          </a>
        )}
      </figure>

      <div className="p-4 text-white space-y-2">
        <h2 className="text-xl font-bold truncate">{title}</h2>
        <p className="text-white/70 text-sm line-clamp-3">{overview}</p>
        <div className="pt-2">
          <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition duration-200 shadow-md">
            ▶ Watch Now
          </button>
        </div>
      </div>
    </div>
  );
}
