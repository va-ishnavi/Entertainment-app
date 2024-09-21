import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaLink } from "react-icons/fa6";
import StarRating from "./StarRating"; // Import the StarRating component

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Fetch movie details
        const movieResponse = await axios.get(
        `  https://api.themoviedb.org/3/movie/${id}?api_key=521a20c5bce3412f60de5507e048c525`
        );
        setMovie(movieResponse.data);

        // Fetch movie credits
        const creditsResponse = await axios.get(
`          https://api.themoviedb.org/3/movie/${id}/credits?api_key=521a20c5bce3412f60de5507e048c525
`        );
        setCredits(creditsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details or credits:", error);
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Error loading movie details.</div>;
  }

  return (
    <div className="p-8 bg-[#10141E] text-white flex flex-col md:flex-row items-start gap-8">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        className="w-full mr-10 rounded-md md:w-1/3 lg:w-1/4 h-auto object-cover "
      />
      <div className="flex flex-col gap-4 w-full md:w-2/3 lg:w-3/4">
        <h1 className="text-4xl font-medium ">{movie.title}</h1>
        <p className="text-lg italic text-gray-500 ">{movie.tagline}</p>
        <div>
          <h2 className="font-bold">Ratings</h2>
          <div className="flex items-center">
            <span className="text-2xl mr-2">
              {movie.vote_average.toFixed(1)}
            </span>
            <StarRating rating={movie.vote_average / 2} />{" "}
            {/* Divide by 2 to fit the 5-star scale */}
          </div>
          <p>{movie.vote_count} votes</p>
        </div>
        <div className="flex gap-4">
          <div>
            <h2 className="font-medium text-gray-500 mr-10">Language</h2>
            <p>{movie.original_language}</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-500 mr-10">First Air</h2>
            <p>{movie.release_date}</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-500 mr-10">Last Air</h2>
            <p>{movie.last_air_date || "N/A"}</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-500 mr-10">Status</h2>
            <p>{movie.status}</p>
          </div>
        </div>
        <div>
          <h2 className="font-bold mt-4">Genres</h2>
          <div className="flex gap-2 mt-2 ">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-white text-black font-medium rounded-md px-2 py-1 text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-medium my-4 ">Synopsis</h2>
          <p className="text-gray-400">{movie.overview}</p>
        </div>
        <div>
          <h2 className="font-medium">Casts</h2>
          <div className="flex gap-2">
            {credits &&
              credits.cast.slice(0, 5).map((castMember) => (
                <span
                  key={castMember.cast_id}
                  className=" bg-[#10141E] border border-white rounded-md px-2 py-1 my-2 text-sm"
                >
                  {castMember.name}
                </span>
              ))}
          </div>
        </div>
        <div className="flex">
          <a
            href={movie.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-40 inline-block bg-[#5A6B90] text-white px-4 py-2 rounded flex items-center justify-center"
          >
            Website <FaLink className="ml-2" />
          </a>
        </div>      </div>
    </div>
  );
}

export default MovieDetail;
