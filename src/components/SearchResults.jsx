import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const SearchResults = () => {
    const { movieName, searchedMovie } = useSelector((store) => store.searchMovie);
    const isLoading = useSelector((store) => store.app.isLoading);

    return (
        <div>
            {isLoading ? (
                <div className="flex justify-center mt-4 text-lg">Loading...</div>
            ) : searchedMovie && searchedMovie.length > 0 ? (
                <MovieList title={movieName} searchMovie={true} movies={searchedMovie} />
            ) : (
                <div className="flex justify-center mt-4 text-lg">Movie Not Found!!</div>
            )}
        </div>
    );
};

export default SearchResults;