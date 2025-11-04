import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="flex flex-col item-center max-h-screen bg-[url('/bg_img.png')] bg-cover bg-center">
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;
