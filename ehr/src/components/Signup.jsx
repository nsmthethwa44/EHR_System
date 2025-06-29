import React, { useState } from "react";
import axios from "axios";
import scopeImg from "../assets/img/scope.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });
  const [role, setRole] = useState("Patient");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleImageFile = (e) => {
    setData({ ...data, photo: e.target.files[0] });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries({ ...data, role }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await axios.post(`${apiUrl}/register`, formData);

      if (res.data.Status === "Success") {
        toast.success(res.data.message, {
                  position: "top-center",
                });
       setTimeout(() =>{
        navigate("/")
       }, 3000)
      } else if (res.data.Status === "Exists") {
        toast.error(res.data.message, {
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Failed to register new user.", {
        position: "top-center",
      });
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="login-signup-container">
      <div className="login-box">
        <h2 className="login-title"><img src={scopeImg} alt="" className='scopeImg_'/>EHR System</h2>

        <form className="form" onSubmit={handleSignUp}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={data.name}
            onChange={handleOnchange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={data.email}
            onChange={handleOnchange}
            required
          />

          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Patient"
                checked={role === "Patient"}
                onChange={() => setRole("Patient")}
              />
              <span>Patient</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Doctor"
                checked={role === "Doctor"}
                onChange={() => setRole("Doctor")}
              />
              <span>Doctor</span>
            </label>
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleOnchange}
            required
          />
          <input
            type="file"
            name="photo"
            onChange={handleImageFile}
            className="textBox"
          />
          <button type="submit">Sign Up</button>
        </form>

        <div className="login-footer">
          <span>Forgot your password?</span>
        </div>

        <div className="signup-text">
          <span>
            Already have an account? <a href="/">Sign In</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
