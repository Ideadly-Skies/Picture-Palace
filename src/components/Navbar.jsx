import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Navbar({setMovies, query, setQuery, setLoading}) {
  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  // reset query when pressing the home button
  const resetQuery = () => {
    setQuery('')
  }

  async function fetchMovie(){
    setLoading(true)
    const API_KEY = '6b3e018d07a42e39065208f94be35ed3';
    const URL = query 
    ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

    const response = await fetch(URL)
    const {results} = await response.json()
    
    try {
      query.length > 2 ? setMovies(results.slice(0,3)) : setMovies(results)
    } catch (error){
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    setLoading(true)

    const handler = setTimeout(() => {
      fetchMovie() 
    }, 1000)

    return () => {
      clearTimeout(handler)
    }

  }, [query])

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="container mx-auto px-6 flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/movie-projector.png"
            alt="Movie Icon"
            className="w-8 h-8"
          />
          <Link to="/" onClick={resetQuery} className="font-bold text-xl">
            Movie Palace
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/my-list"
            className="text-sm font-medium"
          >
            My List
          </Link>

          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleInputChange}
            className="input input-bordered w-24 md:w-56"
          />

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}