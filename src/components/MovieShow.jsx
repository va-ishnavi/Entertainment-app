import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdLocalMovies } from 'react-icons/md';
import { PiTelevisionFill } from 'react-icons/pi';
import { IoBookmarkOutline,IoBookmark  } from "react-icons/io5";
import { addMovie, removeMovie } from '../redux/savedMoviesSlice';

function Movie({ title, fetchURL }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedMovies = useSelector((state) => state.savedMovies.savedMovies);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const saveMovie = (movie) => {
    const isSaved = savedMovies.some((savedMovie) => savedMovie.id === movie.id);
    if (isSaved) {
      dispatch(removeMovie(movie.id));
    } else {
      dispatch(addMovie(movie));
    }
  };

  return (
    <>
      <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
      <div className='relative flex items-center'>
        <div id='slider'>
          {movies.map((item) => (
            <div
              key={item.id}
              className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'
              onClick={() => handleClick(item.id)}
            >
              {item.backdrop_path ? (
                <img
                  className='w-full h-40 object-cover block object-top'
                  src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                  alt={item.title}
                />
              ) : (
                <img
                  className='w-full h-40 block object-cover object-top'
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt={item.title}
                />
              )}
              <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                  {item?.title}
                </p>
                <p onClick={(e) => { e.stopPropagation(); saveMovie(item); }}>
                  {savedMovies.some((savedMovie) => savedMovie.id === item.id) ? (
                    <IoBookmark className='absolute top-4 left-4 text-gray-300' />
                  ) : (
                    <IoBookmarkOutline className='absolute top-4 left-4 text-gray-300' />
                  )}
                </p>
              </div>
              <div className='flex items-center mt-2'>
                <ul className='text-white flex gap-4 mr-4'>
                  <li>{item?.title || item?.name}</li>
                </ul>
                {item.media_type === 'movie' ? (
                  <div className='flex items-center'>
                    <MdLocalMovies className='text-white ' />
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
          ))}
        </div>
      </div>
    </>
  );
}

export default Movie;