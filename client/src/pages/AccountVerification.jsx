import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContent";
import axios from "axios";
import { toast } from "react-toastify";
const AccountVerification = () => {
  axios.defaults.withCredentials = true;
  const inputRefs = React.useRef([]);

  const { isLoggedin, userName } = useContext(AppContent);

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

    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");
      const { data } = await axios.post(
        `${backendUrl}/api/auth/verify-account`,
        {
          otp,
        }
      );

      // console.log(data);
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedin && userName && userName.isAccountVerified && navigate("/");
  }, [isLoggedin, userName]);
  return (
    <div className="flex  justify-center items-center  min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 w-28 sm:w-32 top-5 cursor-pointer"
      />
      <form
        onSubmit={otpSubmitHandler}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h2 className="text-white text-2xl font-semibold text-center mb-4">
          EmailVerify OTP
        </h2>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6-digit code sent to your email{" "}
        </p>
        <div onPaste={handlePast} className="flex justify-between mb-8">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                type="text"
                maxLength="1"
                key={index}
                required
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>

        <button
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full"
          type="submit"
        >
          Verify email
        </button>
      </form>
    </div>
  );
};

export default AccountVerification;
