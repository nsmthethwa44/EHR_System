import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import scopeImg from "../assets/img/scope.png";


const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${apiUrl}/login`, data, {
        withCredentials: true, // Enable cookies if your backend sets any
      });

      if (res.data.Status === "Success") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        const userRole = res.data.user.role;

        toast.success(res.data.message || "Login failed.", {
          position: "top-center",
        });

        setTimeout(() =>{
          // Redirect based on user role
          if (userRole === "Admin") {
            navigate("/admin");
          } else if (userRole === "Doctor") {
            navigate("/doctor");
          } else if (userRole === "Patient") {
            navigate("/patient");
          } else {
            toast.error("Unknown role. Access denied.", {
              position: "top-center",
            });
          }
        }, 3000)
      
      } else {
        toast.error(res.data.message || "Login failed.", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to login.", {
        position: "top-center",
      });
      console.error("Login error:", error);
    }
  };


  return (
    <div className="login-signup-container">
      <div className="login-box">
        <h2 className="login-title"><img src={scopeImg} alt="" className='scopeImg_'/>EHR System</h2>

        <form className="form" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={data.email}
            onChange={handleOnchange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleOnchange}
            required
          />
          <button type="submit">Log In</button>
        </form>

        <div className="login-footer">
          <span>Forgot your password?</span>
        </div>

        <div className="signup-text">
          <span>
            Don't have an account? <a href="/signup">Sign up</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
