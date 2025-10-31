import { createContext, useState } from "react";

import axios from "axios";
export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);

  const [userData, setUserData] = useState(false);

  const [userName, setUserName] = useState("");
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });
      console.log(data);
      if (data.success) {
        setUserData(true);
        setUserName(data.userData.name);
        console.log(data.userData.name);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    getUserData,
    userName,
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
