import MovieCard from "./MovieCard"

export default function Home({movies, loading, error}){
    return (
        // fetch movies in here yeehaw
        <div className="px-6 py-10">
            {loading && <p>Loading...</p>}
            {error && <p>Error!</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-10">
            {!loading &&
                movies.map((el) => (
                <MovieCard key={el.id} id={el.id} title={el.title} poster={`https://image.tmdb.org/t/p/w500${el.poster_path}`} overview={el.overview}/>
                ))}
            </div>
        </div> 
    )
}