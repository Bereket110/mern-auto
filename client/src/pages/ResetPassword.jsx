import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContent } from "../context/AppContent";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { backendUrl } = useContext(AppContent);
  const submitHandler = async (e) => {
    e.preventDefault();

    const url = `${backendUrl}/api/auth/reset-password`;
    const { data } = await axios.post(url, { email, otp, newPassword });

    if (data?.success) {
      alert(data.message);
      alert("You can now login with your new password");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };
  return (
    <div>
      <h1>ResetPassword</h1>
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
        <div>
          <img src={assets.person_icon} alt="" />
          <input
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            type="text"
            placeholder="OTP"
            required
          />
        </div>

        <div>
          <img src={assets.lock_icon} alt="" />
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            type="password"
            placeholder="New Password"
            required
          />
        </div>

        <p onClick={() => navigate("/email-verify")}>Get otp</p>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ResetPassword;
