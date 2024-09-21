import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import searchSlice from "./searchSlice";
import savedMoviesReducer from './savedMoviesSlice';


const store = configureStore({
    reducer:{
        app:userReducer,
        movie:movieReducer,
        searchMovie:searchSlice,
        savedMovies: savedMoviesReducer,
    }
});
export default store;