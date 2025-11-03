import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContent";
import axios from "axios";
const AccountVerification = () => {
  axios.defaults.withCredentials = true;

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePast = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.array.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const otpSubmitHandler = async (e) => {
    e.preventDefault();

    const otpArray = inputRefs.current.map((e) => e.value);
    const otp = otpArray.join("");
    const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, {
      otp,
    });

    console.log(data);
    if (data.success) {
      alert(data.message);
      navigate("/");
    } else {
      alert(data.message);
    }
  };
  return (
    <div>
      <img onClick={() => navigate("/")} src={assets.logo} alt="" />

      <form onSubmit={otpSubmitHandler}>
        <h2>Verify Email</h2>
        <p>Enter the 6-digit code sent to your email </p>
        <div onPaste={handlePast}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={handleKeyDown}
                onPaste={handlePast(e)}
              />
            ))}
        </div>

        <button type="submit">Verify email</button>
      </form>
    </div>
  );
};

export default AccountVerification;
