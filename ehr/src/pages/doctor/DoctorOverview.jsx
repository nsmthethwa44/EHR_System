import React, { useEffect, useState } from 'react'
import Stats from '../../components/Stats'
import placeholderImg from "../../assets/img/female_profile_50px.png"
import { Link } from 'react-router-dom'
import Graph from '../../components/Graph'
import Chart from '../../components/Chart'
import { useGlobal } from '../../components/GlobalContext'
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const DoctorOverview = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const {user} = useGlobal();
    const id = user?.id;
    const [patient, setPatient] = useState([])
    const navigate = useNavigate();

    const getAppointments = async() =>{
        if(!id) return

        try {
            const res = await axios.get(`${apiUrl}/doctorAppointments/${id}`)
            if(res.data && Array.isArray(res.data.Result)){
                setPatient(res.data.Result)
                console.log(res.data.Result)
            }else{
                throw new Error("Invalid data formate")
            }
        } catch (error) {
            console.error("Failed to fetch all doctor appointments", error)
        }
    }

      const handleApprove = async (id) => {
    try {
      const res = await axios.put(`${apiUrl}/updateAppointmentStatus/${id}`, {
        status: "Approved",
      });

      if (res.data.success) {
        toast.success("Appointment approved successfully.", {
          position: "top-center",
        });
         getAppointments()
      }
    } catch (error) {
      console.error("Error approving appointment:", error);
      toast.error("Failed to approved appointment", { position: "top-center" });
    }
  };

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!confirmCancel) return;

    try {
      const res = await axios.put(`${apiUrl}/updateAppointmentStatus/${id}`, {
        status: "Cancelled",
      });

      if (res.data.success) {
        toast.success("Appointment cancelled successfully.", {
          position: "top-center",
        });
         getAppointments()
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment.", { position: "top-center" });
    }
  };

    useEffect(() =>{
        getAppointments()
    }, [id])

    useEffect(() =>{
    const token = localStorage.getItem("token")
    console.log(token)

    const getAdmin = async() =>{
      if(!token){
        navigate("/")
      }

      try {
        const res = await axios.get(`${apiUrl}/doctor`, {headers: {Authorization: `Bearer ${token}`}})
        console.log("Dashboard Response:",  res.data.message)
        if(res.data.Status = "success"){
         const role = res.data.role;
         console.log("logged In as", role);
         if(role !== "Doctor" || role === ""){
          navigate("/");
         }
        }else if(res.data.error){
          navigate("/");
        }
      } catch (error) {
        console.log("Failed to get doctor",error)
      }
    }

    getAdmin();
  }, [])

  return (
    <div className="overview">
    <div className="content">

        <div className="page-title">
            <h3 className='count'>Dashboard</h3>
           <div className="buttons">
            <button className="btn"><i className="fa-solid fa-file-import"></i>Import</button>
           </div>
        </div>

        <Stats />

        <div className="patients-overview">
            <div className="box">

            <div className="top-title">
                <h3>Patients Overview</h3>

                <div className="dates">
                    <span className='view-all'>November<i className="fa-regular fa-calendar-days"></i></span>
                    <div className="buttons">
                        <button className="btn"><i className="fa-solid fa-plus"></i>Add New</button>
                    </div>
                </div>
            </div>

            <div className="stats-box">
                <div className="stats-number">
                    <div className="text">
                        <p>In Lorem</p>
                        <h3 className="count">34</h3>
                    </div>
                    <p className='muted'><span>53%</span>In This Week</p>
                </div>
                <div className="stats-number">
                    <div className="text">
                        <p>New Patients</p>
                        <h3 className="count">3</h3>
                    </div>
                   <p className='muted'><span>5%</span>In This Week</p>
                </div>
                <div className="stats-number">
                    <div className="text">
                        <p>Appointments</p>
                        <h3 className="count">6</h3>
                    </div>
                    <p className='muted'><span>75%</span>In This Week</p>
                </div>
                <div className="stats-number">
                    <div className="text">
                        <p>Regular</p>
                        <h3 className="count">4</h3>
                    </div>
                    <p className='muted'><span>15%</span>In This Week</p>
                </div>
            </div>

            <div className="top-title">
                <h3>New <span>In Waiting</span></h3>
            </div>

            <div className="new-patients">
                {patient.length === 0 ? (
                    <p>No appointment scheduled</p>
                ) : (
                   <>
                    {patient.map((item) =>(
                         <div className="box" key={item?.id}>
                <div className="box-img">
                    <div className="image"><img src={`${apiUrl}/images/${item?.photo}` || placeholderImg} alt="" className="img-box" /></div>
                    <div className="text">
                        <h3>{item?.name}</h3>
                        <span>{item?.email}</span>
                        <span>Patient</span>
                    </div>
                </div>
                <div className="info">
                    <ul>
                        <li>D.O.B
                            <span>23 February 2023</span>
                        </li>
                        <li>Gender
                            <span>Female</span>
                        </li>
                        <li>Weight
                            <span>56kg</span>
                        </li>
                        <li>Height
                            <span>172cm</span>
                        </li>
                        <li>Last Appointment
                            <span>6 June 2025</span>
                        </li>
                        <li>Registered Date
                            <span>19 March 2025</span>
                        </li>
                    </ul>
                </div>
                <div className="status">
                    <span>{item?.department}</span>
                    <span>{item?.procedure}</span>
                    <span>{item?.status}</span>
                </div>
                <div className="buttons">
                    <button className="btn"><i class="fa-solid fa-phone"></i>012 454 5675</button>
                    <button className="btn approve" onClick={() => handleApprove(item?.id)}><i class="fa-solid fa-check"></i>Approve</button>
                    <button className="btn cancel" onClick={() => handleCancel(item?.id)}><i class="fa-solid fa-xmark"></i>Cancel</button>
                </div>
               </div>
                    ))}
                   </>
                )}
              
            </div>

            </div>
           
        </div>

        <div className="overview-charts">
            <div className="box">
              <div className="graph-chart">
                <h3>Overview</h3>
                <Graph />
              </div>
            </div>
            <div className="box">
            <div className="graph-chart">
                <h3>Patients Stats</h3>
                <Chart />
              </div>
            </div>
        </div>
        

    </div>
   </div>
  )
}

export default DoctorOverview