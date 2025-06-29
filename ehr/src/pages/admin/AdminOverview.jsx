import React from 'react'
import { Link } from 'react-router-dom'
import Stats from '../../components/Stats'
import Graph from '../../components/Graph'
import placeholderImg from "../../assets/img/female_profile_50px.png"
import { useGlobal } from '../../components/GlobalContext'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminOverview = () => {
  const {doctors} = useGlobal()
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate();

    useEffect(() =>{
    const token = localStorage.getItem("token")
    console.log(token)

    const getAdmin = async() =>{
      if(!token){
        navigate("/")
      }

      try {
        const res = await axios.get(`${apiUrl}/admin`, {headers: {Authorization: `Bearer ${token}`}})
        console.log("Dashboard Response:",  res.data.message)
        if(res.data.Status = "success"){
         const role = res.data.role;
         console.log("logged In as", role);
         if(role !== "Admin" || role === ""){
          navigate("/");
         }
        }else if(res.data.error){
          navigate("/");
        }
      } catch (error) {
        console.log("Failed to get admin",error)
      }
    }

    getAdmin();
  }, [])

  const getAppointments = async () =>{
    try {
      const res = await axios.get(`${apiUrl}/allAppointments`)
      if(res.data && Array.isArray(res.data.Result)){
        setAppointments(res.data.Result)
      }else{
        throw new Error("Invalid data formate")
      }
    } catch (error) {
      console.log("Failed to fetch appointments data")
    }
  }

    const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(`en-GB`, options);
  };

  useEffect(() =>{
    getAppointments()
  })

  return (
    <div className="overview">
      <div className="content">
        <div className="page-title">
          <h3 className="count">Dashboard</h3>
          <div className="buttons">
            <button className="btn">
              <i className="fa-solid fa-file-import"></i>Import
            </button>
          </div>
        </div>

        <Stats />

        <div className="activity-success">
          <div className="box">
            <div className="graph-box">
              <h3>Activity</h3>

              <Graph />
            </div>
          </div>
          <div className="box">
            <div className="success-box">
              <h3>
                Success Stats <span className="view-all"> June 2025</span>
              </h3>
              <div className="success">
                <ul className="list">
                  <li>
                    Family
                    <span className="progress">
                      <span
                        className="sub-progress"
                        style={{ width: "80%" }}
                      ></span>
                    </span>{" "}
                    80%
                  </li>
                  <li>
                    Allergies
                    <span className="progress">
                      <span
                        className="sub-progress"
                        style={{ width: "50%" }}
                      ></span>
                    </span>{" "}
                    50%
                  </li>
                  <li>
                    Lorem
                    <span className="progress">
                      <span
                        className="sub-progress"
                        style={{ width: "90%" }}
                      ></span>
                    </span>{" "}
                    90%
                  </li>
                  <li>
                    Immunization
                    <span className="progress">
                      <span
                        className="sub-progress"
                        style={{ width: "40%" }}
                      ></span>
                    </span>{" "}
                    40%
                  </li>
                  <li>
                    {" "}
                    Lorem
                    <span className="progress">
                      <span
                        className="sub-progress"
                        style={{ width: "70%" }}
                      ></span>
                    </span>{" "}
                    70%
                  </li>
                  <li>
                    {" "}
                    Lorem
                    <span className="progress">
                      <span
                        className="sub-progress"
                        style={{ width: "95%" }}
                      ></span>
                    </span>{" "}
                    95%
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="appointments-doctors">
          <div className="box doctors">
            <h3>
              Doctor List
              <Link to={"doctors"} className="view-all">
                <i className="fa-solid fa-angle-right"></i>
              </Link>
            </h3>
            <div className="table-container">
              <div className="table">
                <table>
                  <tbody>
                    {doctors.slice(0, 6).map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="doctor-box">
                            <div className="info">
                              <img
                                src={item.photo ? `${apiUrl}/images/${item.photo}` : placeholderImg}
                                alt={item.name}
                                className="image"
                              />
                              <div className="text">
                                <h3>{item.name}</h3>
                                <p>{item.email}</p>
                              </div>
                            </div>
                            <i className="fa-solid fa-ellipsis"></i>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="box appointments">
            <h3>
              Appointments{" "}
              <Link to={"/"} className="view-all">
                View All <i className="fa-solid fa-angle-right"></i>
              </Link>
            </h3>
            <div className="table-container">
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Appointment_Date</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Procedure</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.slice(0, 5).map((item) => (
                      <tr key={item.appointment_id}>
                        <td><img src={`${apiUrl}/images/${item.photo}`} alt="" className='image' /></td>
                        <td>{item.name}</td>
                        <td>{formatDate(item.appointment_date)}</td>
                        <td>{item.department}</td>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOverview