import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGlobal } from './GlobalContext';
import axios from 'axios'
import placeholderImg from "../../assets/img/female_profile_50px.png"
import CreateAppointment from './CreateAppointment';

const MyAppointments = () => {
  const [myAppointments, setMyAppointments] = useState([])
  const { user } = useGlobal();
  const id = user?.id
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [createAppointment, setCreateAppointment] = useState(null);
  
  const hideAppointmentForm = () => setCreateAppointment(false)
  const showAppointmentForm = () => setCreateAppointment(!createAppointment)

  const formatDate = (dateString) =>{
    const options = {year: "numeric", month: "long", day: "numeric"};
    return new Date(dateString).toLocaleDateString(`en-GB`, options);
  }

  const getMyAppointments = async() =>{
    if (!id) return; 

  try {
      const res = await axios.get(`${apiUrl}/patientAppointments/${id}`)
      if(res.data && Array.isArray(res.data.Result)){
        setMyAppointments(res.data.Result)
      }else{
        throw new Error("Invalid data formate!")
      }
  } catch (error) {
    console.log("Failed to fetch appointments")
  }}

  useEffect(() =>{
    getMyAppointments();
  }, [id])

  return (
  <>
  <div className="wrapper appointments">
        <div className="content">

                 <div className="page-title">
                <h3 className="count">My Appointments</h3>
                <div className="buttons">
                    <Link className="btn" onClick={showAppointmentForm}>
                    <i className="fa-solid fa-plus"></i>Add Appointment
                    </Link>
                </div>
                </div>

                <div className="container">
                  <div className="search-title">
                      <h3>All Appointments</h3>
                      <div className="search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                          type="text"
                          placeholder="Search appointment..."
                        />
                      </div>
                    </div>
                     <div className="table-container">
                                <div className="table">
                                  {myAppointments.length === 0 ? (
                                    <p>No appointments found.</p>
                                  ) : (
                                     <table>
                                    <thead>
                                      <tr>
                                        <th>Photo</th>
                                        <th>Doctor Name</th>
                                        <th>Appointment Date</th>
                                        <th>Department</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                        <th>Procedure</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {myAppointments.map((item) =>(
                                          <tr key={item.id}>
                                            <td><img src={item.photo ? `${apiUrl}/images/${item.photo}` : placeholderImg} alt="" className='image' /></td>
                                            <td>Dr {item.name}</td>
                                            <td>{formatDate(item.appointment_date)}</td>
                                            <td>{item.department}</td>
                                            <td>NULL</td>
                                            <td>
                                               <span
                                                    style={{
                                                      color:
                                                        item.status === "Cancelled"
                                                          ? "#ef4444"
                                                          : item.status === "Completed"
                                                          ? "#10b981"
                                                          : item.status === "Scheduled"
                                                          ? "#0095f6"
                                                          : item.status === "Approved"
                                                          ? "#02b8b8"
                                                          : "",
                                                      background:
                                                        item.status === "Cancelled"
                                                          ? "#ef444463"
                                                          : item.status === "Completed"
                                                          ? "#10b98163"
                                                          : item.status === "Scheduled"
                                                          ? "#0095f663"
                                                          : item.status === "Approved"
                                                          ? "#02b8b863"
                                                          : "",
                                                      padding: "5px 10px",
                                                      borderRadius: "1px",
                                                      borderLeft: "2px solid ",
                                                    }}
                                                  >
                                                    {item.status}
                                                  </span>
                                            </td>
                                            <td>{item.procedure}</td>
                                            <td>{formatDate(item.date)}</td>
                                             <td>
                                                  <div className="buttons">
                                                     <Link className="btn read">
                                                      <i className="fa-solid fa-eye"></i>
                                                    </Link>
                                                     <Link className="btn delete">
                                                       {" "}
                                                       <i className="fa-solid fa-trash-can"></i>
                                                    </Link>
                                                   </div>
                                                </td>
                                          </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                  )}
                                 
                                </div>
                              </div>
                </div>

        </div>
    </div>
     {createAppointment && <CreateAppointment  onClose={hideAppointmentForm}/>}
  </>
    
  )
}

export default MyAppointments