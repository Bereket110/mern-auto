import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { data, useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContent";

import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      const url =
        state === "Sign Up"
          ? `${backendUrl}/api/auth/register`
          : `${backendUrl}/api/auth/login`;
      const payload =
        state === "Sign Up" ? { name, email, password } : { email, password };

      const { data } = await axios.post(url, payload);

      if (data.success) {
        alert(data.message);
        setIsLoggedin(true);
        getUserData();
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong", data.message);
    }
  };
  return (
    <div>
      <img onClick={() => navigate("/")} src={assets.logo} alt="" />
      <div>
        <h2>{state === "Sign Up" ? "Create Accoutn" : "Login"}</h2>
        <p>
          {state === "Sign Up"
            ? "Create your account to continue"
            : "Login to your account to continue"}
        </p>
        <form onSubmit={submitHandler}>
          {state === "Sign Up" && (
            <div>
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div>
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <p onClick={() => navigate("/reset-password")}>Forgot password</p>

          <button type="submit">{state}</button>
        </form>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <span onClick={() => setState("Sign Up")}>Sign Up here</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
