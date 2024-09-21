import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { LuSearch } from 'react-icons/lu';
import { SEARCH_MOVIE_URL, options } from '../utils/constant';
import { setSearchMovieDetails } from '../redux/searchSlice';
import { setLoading } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchMovie, setSearchMovie] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer YOUR_API_KEY_OR_TOKEN`, // Replace with your actual API key or token
                    ...options.headers, // Merge any other existing headers from options
                }
            };
    
            const res = await axios.get(`${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`, config);
            const movies = res?.data?.results;
    
            dispatch(setSearchMovieDetails({ searchMovie, movies }));
            navigate(`/search/${searchMovie}`);
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
        setSearchMovie('');
    };
    

    return (
        <div className="flex justify-center w-full">
            <form
                onSubmit={submitHandler}
                className="w-full ml-4 mt-4 h-14 bg-[#161D2F] z-50 flex gap-3 justify-center items-center font-light text-HeadingXS lg:justify-evenly lg:text-HeadingM px-2 lg:py-5 lg:gap-0 rounded-lg"
            >
                <LuSearch className="text-xl lg:text-3xl" />
                <input
                    value={searchMovie}
                    onChange={(e) => setSearchMovie(e.target.value)}
                    type="text"
                    placeholder="Search Movies..."
                    className="w-[95%] text-2xl bg-[#161D2F] text-gray-500 h-fit caret-darkRed focus:outline-none border-b-2 border-transparent focus:border-waikawaGrey lg:w-[94%] placeholder-text-wrap"
                />
            </form>
        </div>
    );
};

export default SearchBar;
