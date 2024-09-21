import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { removeMovie } from '../redux/savedMoviesSlice';
import { PiTelevisionFill } from 'react-icons/pi';

const SavedShow = () => {
  const dispatch = useDispatch();
  const savedMovies = useSelector((state) => state.savedMovies.savedMovies);

  const slideLeft = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const deleteShow = (movieId) => {
    dispatch(removeMovie(movieId));
  };

  return (
    <>
      <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft
          onClick={slideLeft}
          className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
        <div
          id={'slider'}
          className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative custom-scrollbar-hide '
        >
          {savedMovies.map((item) => (
            <div
              key={item.id}
              className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'
            >
              <img
                className='w-full h-auto block'
                src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
                alt={item?.title}
              />
              <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                  {item?.title}
                </p>
                <p onClick={() => deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4'>
                  <AiOutlineClose />
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
        <MdChevronRight
          onClick={slideRight}
          className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
      </div>
    </>
  );
};

export default SavedShow;