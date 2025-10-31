import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../context/AppContent";
const EmailVerify = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, {
      email,
    });
    if (data?.success) {
      alert(data.message);
      navigate("/reset-password");
    } else {
      alert(data.message);
    }
  };
  return (
    <div>
      <h1>Email verify</h1>
      <form onSubmit={submitHandler}>
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

        <p onClick={() => navigate("/reset-password")}>Reset your password</p>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default EmailVerify;
