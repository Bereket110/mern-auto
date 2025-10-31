import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContent";

const Header = () => {
  const { isLoggedin, userData, userName } = useContext(AppContent);
  return (
    <div>
      <img src={assets.header_img} alt="" />
      <h1>Hey {isLoggedin ? `${userName}` : "Developer"} </h1>
      <img src={assets.hand_wave} alt="" />
      <h2>Welcome to our app</h2>
      <p>
        Let's start with a quick product tour and we will have you up and
        running in no time!
      </p>
      <button>Get Started</button>
    </div>
  );
};

export default Header;
