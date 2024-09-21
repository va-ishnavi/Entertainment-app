import React from 'react'
import { TMDB_IMG_URL } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { getId, setOpen } from '../redux/movieSlice';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { MdLocalMovies } from 'react-icons/md';
import { PiTelevisionFill } from 'react-icons/pi';
import { addMovie, removeMovie } from '../redux/savedMoviesSlice'; // Adjust your import path accordingly

const MovieCard = ({ posterPath, movieId, title, backdropPath, mediaType }) => {
  const dispatch = useDispatch();
  const savedMovies = useSelector((state) => state.savedMovies.savedMovies);

  if (posterPath === null && backdropPath === null) return null;

  const handleOpen = () => {
    dispatch(getId(movieId));
    dispatch(setOpen(true));
  }

  const saveShow = (movie) => {
    const isSaved = savedMovies.some((savedMovie) => savedMovie.id === movie.id);
    if (isSaved) {
      dispatch(removeMovie(movie.id));
    } else {
      dispatch(addMovie(movie));
    }
  };

  return (
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2' onClick={handleOpen}>
      {backdropPath ? (
        <img
          className='w-full h-40 object-cover block object-top'
          src={`${TMDB_IMG_URL}/${backdropPath}`}
          alt={title}
        />
      ) : (
        <img
          className='w-full h-40 block object-cover object-top'
          src={`${TMDB_IMG_URL}/${posterPath}`}
          alt={title}
        />
      )}
      <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
        <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
          {title}
        </p>
        <p onClick={(e) => { e.stopPropagation(); saveShow({ id: movieId, title, backdropPath, posterPath, mediaType }); }}>
          {savedMovies.some((savedMovie) => savedMovie.id === movieId) ? (
            <IoBookmark className='absolute top-4 left-4 text-gray-300' />
          ) : (
            <IoBookmarkOutline className='absolute top-4 left-4 text-gray-300' />
          )}
        </p>
      </div>
      <div className='flex items-center mt-2'>
        <ul className='text-white flex gap-4 mr-4'>
          <li>{title}</li>
        </ul>
        {mediaType === 'movie' ? (
          <div className='flex items-center'>
            <MdLocalMovies className='text-white' />
            <span className='text-white'>Movie</span>
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <PiTelevisionFill className='text-white' />
            <span className='text-white'>TV</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieCard;