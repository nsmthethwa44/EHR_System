
import React, { createContext, useEffect, useState, useContext} from "react";
import { useNavigate} from 'react-router-dom';
import axios from 'axios'
import { toast } from "react-toastify";

// global context 
const GlobalContext = createContext(); 

export const GlobalProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([])
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [fadeOut, setFadeOut] = useState(false);
  const [loader, setLoading] = useState(true);
  const [appointmentForm, setAppointmentForm] = useState(true)
  const [labReports, setLabReports] = useState([])
  const [isSidBarActive, setIsSideBarActive] = useState(null);

  const showSideBar = () => setIsSideBarActive(!isSidBarActive);
  const hideSideBar =  () => setIsSideBarActive(false);

  const getLabReport = async() =>{
    try {
      const res = await axios.get(`${apiUrl}/labResults`)
      if (res.data && Array.isArray(res.data.Result)){
        setLabReports(res.data.Result)
      }else{
        throw new Error("Invalid data formate")
      }
    } catch (error) {
      console.log("Failed  to fetch lab results", error)
    }
  }

      const getDoctors = async () =>{
        try {
          const res = await axios.get(`${apiUrl}/doctors`) 
          if (res.data && Array.isArray(res.data.Result)){
            setDoctors(res.data.Result)
          }else{
            throw new error("Invalid data formate!")
          }
        } catch (error) {
          console.log("Failed to fetch doctors", error)
        }
      }

  const showAppointmentForm = () => setAppointmentForm(true);
  const hideAppointmentForm = () => setAppointmentForm(false);

  // getting user profile 
useEffect(() => {
  const storeUser = JSON.parse(localStorage.getItem('user'));
  if (storeUser) {
    setUser(storeUser);
  }

    setTimeout(() => setFadeOut(true), 3000);
    setTimeout(() => setLoading(false), 3500);

  getDoctors();
  getLabReport();
}, [apiUrl]);


  // logout user 
  const logout = () =>{
    setUser(null);
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");
    toast.success("Successfully logged out!", { position: "top-center" });
   setTimeout(() =>{
    navigate("/");
   }, 3000)
  };

  return (
    <GlobalContext.Provider value={{ user, appointmentForm, logout, fadeOut, doctors,
      showAppointmentForm, hideAppointmentForm, labReports, getLabReport, isSidBarActive, showSideBar, hideSideBar
     }}>
        {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    alert("useGlobal must be used within a GlobalProvider {Components}");
  }
  return context;
};


