import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Navbar({ setMovies, setLoading }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setSearchParams(newQuery ? { query: newQuery } : {});
  };

  const resetQuery = () => setSearchParams({});

  async function fetchMovie() {
    setLoading(true);
    const API_KEY = "6b3e018d07a42e39065208f94be35ed3";
    const URL = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&include_adult=false`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&include_adult=false`;

    try {
      const response = await fetch(URL);
      const { results } = await response.json();
      setMovies(results); 

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => fetchMovie(), 1000);
    return () => clearTimeout(handler);
  }, [query]);

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="container mx-auto px-6 flex justify-between items-center w-full h-16">
        <div className="flex items-center gap-3">
          <Link to="/" onClick={resetQuery} className="font-bold text-xl tracking-wide hover:text-red-500 transition-colors">
            <img
              src="https://img.icons8.com/ios-filled/50/ffffff/movie-projector.png"
              alt="Movie Icon"
              className="w-8 h-8"
            />
          </Link>
          <Link to="/" onClick={resetQuery} className="font-bold text-xl tracking-wide hover:text-red-500 transition-colors">
            Movie Palace
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/my-list"
            className="text-sm font-medium hover:text-red-500 transition-colors"
          >
            My List
          </Link>

          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleInputChange}
            className="bg-zinc-900 text-white placeholder-white/50 border border-zinc-700 rounded-md px-4 py-2 w-24 md:w-56 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <div className="dropdown dropdown-end relative">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-700">
                <img
                  alt="User avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-zinc-900 text-white rounded-box z-10 mt-3 w-52 p-2 shadow-xl border border-zinc-800"
            >
              <li>
                <a className="hover:bg-zinc-800 rounded-md flex justify-between">
                  Profile
                  <span className="badge bg-red-600 text-white">New</span>
                </a>
              </li>
              <li>
                <a className="hover:bg-zinc-800 rounded-md">Settings</a>
              </li>
              <li>
                <a className="hover:bg-zinc-800 rounded-md">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
