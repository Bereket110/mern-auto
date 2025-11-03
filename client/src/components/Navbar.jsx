import React, { use, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContent";
import axios from "axios";
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
  } = useContext(AppContent);
  const navigate = useNavigate();

  // const { setIsLoggedin, isLoggedin, userName, userData } =
  // useContext(AppContent);

  const logOutHandler = async () => {
    const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
    if (data.success) {
      setIsLoggedin(false);
      setUserName("");
      alert(data.message);
      navigate("/");
    } else {
      alert("error" + data.message);
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
    <div>
      <img src={assets.logo} alt="logo" />
      {isLoggedin ? (
        <div>
          {userName?.name?.slice(0, 1).toUpperCase() || "U"}
          <div>
            <ul>
              {!userName.isAccountVerified && (
                <li onClick={AccoutnverifyHandler}>Verifay Email</li>
              )}
              <li onClick={logOutHandler}>Log Out</li>
            </ul>
          </div>
        </div>
      ) : (
        <button onClick={() => navigate("/login")}>
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
