import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ id, title, poster, overview }) {
    const navigate = useNavigate();
    
    const [hovered, setHovered] = useState(false);
    const hoverTimeout = useRef(null);

    const handleMouseEnter = () => {
        hoverTimeout.current = setTimeout(() => {
        setHovered(true);
        }, 2000); // wait 2 seconds before showing link overlay
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout.current);
        setHovered(false);
    };

    // Generate YouTube search URL based on title
    const searchUrl = `https://www.youtube.com/results?search_query=trailer+${encodeURIComponent(
        title
    )}`;

    return (
        <div className="card bg-base-100 w-full shadow-sm" onClick={() => navigate(`/movie/${id}`)}>
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
                className="h-16 w-16 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M8 5v14l11-7z" />
            </svg>
            </div>

            {/* Hover trailer link overlay */}
            {hovered && (
            <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-lg font-semibold transition-opacity duration-300"
            >
                🔗 Watch Trailer
            </a>
            )}
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
