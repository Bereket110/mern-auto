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

  const [isEmailSent, setIsEmailSent] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const { backendUrl } = useContext(AppContent);
  const submitEmailHandler = async (e) => {
    e.preventDefault();

    try {
      const url = `${backendUrl}/api/auth/send-reset-otp`;
      const { data } = await axios.post(url, { email });

      if (data?.success) {
        alert(data.message);
        alert("New check your email to OTP");
        // navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const OTPSubmitHandler = async (a) => {
    e.preventDefault();

    try {
      const url = `${backendUrl}/api/auth/verify-account`;
      const { data } = await axios.post(url, { otp });

      if (data?.success) {
        alert(data.message);
        alert("Now you can change your password");
        // navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const ChangePasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const url = `${backendUrl}/api/auth/reset-password`;
      const { data } = await axios.post(url, { email, otp, newPassword });

      if (data?.success) {
        alert(data.message);
        alert("Your password success fully changed");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <div>
        {!isEmailSent && (
          <div>
            <img onClick={() => navigate("/")} src={assets.logo} alt="" />

            <form onSubmit={submitEmailHandler}>
              <h1>Reset Your Password</h1>
              <p>Enter your registerd email</p>
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
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </div>
      <div>
        {isEmailSent && !isOtpSubmitted && (
          <div>
            <img onClick={() => navigate("/")} src={assets.logo} alt="" />

            <h1>Enter OTP Sent to Your email</h1>
            <form onSubmit={OTPSubmitHandler}>
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                type="text"
                placeholder="OTP"
                required
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </div>
      <div>
        {email && isOtpSubmitted && !newPassword && (
          <div>
            <img onClick={() => navigate("/")} src={assets.logo} alt="" />

            <h1>New password</h1>
            <form onSubmit={ChangePasswordHandler}>
              <img src={assets.lock_icon} alt="" />
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type="password"
                placeholder="New Password"
                required
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
