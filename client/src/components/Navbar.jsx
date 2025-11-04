import React, { use, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContent";
import axios from "axios";
import { toast } from "react-toastify";
const Navbar = () => {
  axios.defaults.withCredentials = true;
  const {
    backendUrl,
    setUserName,
    setIsLoggedin,
    isLoggedin,
    userName,
    userData,
    getUserData,
    setUserData,
  } = useContext(AppContent);
  const navigate = useNavigate();

  // const { setIsLoggedin, isLoggedin, userName, userData } =
  // useContext(AppContent);

  const logOutHandler = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      if (data.success) {
        setIsLoggedin(false);
        setUserName("");
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error("error" + data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const AccoutnverifyHandler = async () => {
    axios.defaults.withCredentials = true;
    const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
    console.log(data);
    if (data.success) {
      alert(data.message);
      getUserData();
      navigate("/account-verify");
    } else {
      alert(data.message);
    }
  };
  console.log("User data" + userName.isAccountVerified);
  console.log("User data" + userName);
  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="logo" className="w-28 sm:w-32" />
      {isLoggedin ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
          {userName?.name?.slice(0, 1).toUpperCase() || "U"}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userName.isAccountVerified && (
                <li
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                  onClick={AccoutnverifyHandler}
                >
                  Verifay Email
                </li>
              )}
              <li
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
                onClick={logOutHandler}
              >
                Log Out
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex item-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-600 hover:bg-gray-100 transition-all"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
