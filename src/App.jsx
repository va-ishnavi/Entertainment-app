import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./components/MovieDetail";
import Movieshow from "./components/Movieshow";
import requests from "./Requests";
import NavBar from "./components/NavBar";
import Tvshow from "./components/Tvshow";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults"; // Import the new SearchResults component
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import SavedShow from "./components/SavedShow" 

function App() {
    const location = useLocation();
    const isSignupPage = location.pathname === "/login";
    const isSearchPage = location.pathname.startsWith("/search"); // Check if the current path is the search page

    return (
        <>
            <Toaster />
            <div className="flex h-screen">
                {!isSignupPage && <NavBar />}
                <div className="flex-1 overflow-auto p-4">
                    {!isSignupPage && <SearchBar />}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/movie/:id" element={<MovieDetail />} />
                        <Route path="/saved-shows" element={<SavedShow />} />
                        
                        <Route path="/movieshow" element={<Movieshow title="Movies" fetchURL={requests.requestTopRated} />} />
                        <Route path="/tvshow" element={<Tvshow title="Explore TV Shows" fetchURL={requests.requestUpcoming} />} />
                        <Route path="/search/:query" element={<SearchResults />} /> {/* Add route for search results */}
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default App;