import { createContext, useEffect, useState } from "react";

import axios from "axios";
export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);

  const [userData, setUserData] = useState(false);

  const [userName, setUserName] = useState("");

  const [token, setToken] = useState(null);

  const getUserData = async () => {
    try {
      // const token = localStorage.getItem("token");

      // if (token) {
      //   setToken(token);
      //   axios.defaults.headers.common["Authorization"] = `${token}`;
      // }
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      // console.log(data);
      if (data.success) {
        setUserData(true);
        setUserName(data.userData);
        // console.log(data.userData.name);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserAuthentication = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);

      if (data.success) {
        setIsLoggedin(true);
      }
    } catch (error) {
      alert(data.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    getUserData();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    getUserData,
    userName,
    setUserName,
    token,
    setToken,
    axios,
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
