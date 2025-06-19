export default function MovieCard({title, poster, overview}){
    return (
        <div className="card bg-base-100 w-full shadow-sm">
            <figure>
                <img
                    src={poster}
                    alt={`poster for ${title}`}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{overview}</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
}