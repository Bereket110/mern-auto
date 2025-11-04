import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContent } from "../context/AppContent";
import { toast } from "react-toastify";
const ResetPassword = () => {
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

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isEmailSent, setIsEmailSent] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [isPasswrordChanged, setIsPasswordChanged] = useState(false);

  const { backendUrl } = useContext(AppContent);

  const otpSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      setOtp(otp);

      setIsOtpSubmitted(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const submitEmailHandler = async (e) => {
    e.preventDefault();

    try {
      const url = `${backendUrl}/api/auth/send-reset-otp`;
      const { data } = await axios.post(url, { email });

      if (data?.success) {
        toast.success(data.message);
        setIsEmailSent(true);
        // navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const url = `${backendUrl}/api/auth/reset-password`;
      const { data } = await axios.post(url, { email, otp, newPassword });

      if (data?.success) {
        toast.success(data.message);
        // alert("Your password success fully changed");
        navigate("/login");
      } else {
        toast.error(data.message);
        setIsOtpSubmitted(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex  justify-center items-center  min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 w-28 sm:w-32 top-5 cursor-pointer"
      />

      {!isEmailSent && (
        <form
          onSubmit={submitEmailHandler}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h2 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Your Password
          </h2>
          <p className="text-center mb-6 text-indigo-300">
            Enter your registerd email{" "}
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              className="bg-transparent outline-none"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <button
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium courser-pointer"
            type="submit"
          >
            Send
          </button>
        </form>
      )}

      {isEmailSent && !isOtpSubmitted && (
        <form
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
          onSubmit={otpSubmitHandler}
        >
          <h2 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Your Password
          </h2>
          <p className="text-center mb-6 text-indigo-300">
            Enter OTP Sent to Your email
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
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full"
          >
            Send
          </button>
        </form>
      )}

      {isEmailSent && isOtpSubmitted && !isPasswrordChanged && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h2 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Your Password
          </h2>
          <p className="text-center mb-6 text-indigo-300">
            Enter New password below
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              className="bg-transparent outline-none"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              type="password"
              placeholder="New Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
