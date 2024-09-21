import React from 'react';
import { SiWindows } from "react-icons/si";
import { MdMovieCreation, MdLocalMovies } from "react-icons/md";
import { PiTelevisionBold } from "react-icons/pi";
import { FaBookmark } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import axios from "axios";
import { API_END_POINT } from '../utils/constant';
import toast, { Toaster } from "react-hot-toast";


const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);

  const handleLogout = async() => {
    try {
      const res = await axios.get(`${API_END_POINT}/logout`);
      if(res.data.success){
          toast.success(res.data.message);
      }
      dispatch(setUser(null));
      navigate("/");
  } catch (error) {
      console.log(error);
  }
  };

  return (
    <div className="h-screen relative z-1000 w-16 flex flex-col items-center justify-between bg-gray-900 py-4 rounded-t-lg rounded-b-lg">
      {/* Top Icons */}
      <div className="flex flex-col items-center space-y-6">
        <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-red-600">
          <MdMovieCreation className="text-red-600" />
        </div>
        <div className="mt-4"></div>
        <div className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer" onClick={() => navigate('/')}>
          <SiWindows className="text-gray-500" size={25} />
        </div>
        <div className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer" onClick={() => navigate('/movieshow')}>
          <MdLocalMovies className="text-gray-500" size={25} />
        </div>
        <div className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer" onClick={() => navigate('/Tvshow')}>
          <PiTelevisionBold className="text-gray-500" size={25} />
        </div>
        <div className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer" onClick={() => navigate('/saved-shows')}>
          <FaBookmark className="text-gray-500" size={25} />
        </div>
      </div>
      {/* Bottom Icons */}
      <div className="flex flex-col items-center space-y-2">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 cursor-pointer" onClick={() => navigate('/login')}>
          <VscAccount className="text-gray-500" size={25} />
        </div>
        {user && (
          <>
            <p className="text-white text-sm">{user.fullName}</p>
            <button onClick={handleLogout} className="text-white text-sm mt-2 cursor-pointer">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;