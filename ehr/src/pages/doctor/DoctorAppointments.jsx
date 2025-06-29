import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import placeholderImg from "../../assets/img/female_profile_50px.png";
import { useGlobal } from "../../components/GlobalContext";

const DoctorAppointments = () => {
  const [searchTeam, setSearchTeam] = useState("");
  const [appointments, setAppointments] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { user } = useGlobal();
  const id = user?.id;

  const getAppointments = async () => {
    if (!id) return;

    try {
      const res = await axios.get(`${apiUrl}/allDoctorAppointments/${id}`);
      if (res.data && Array.isArray(res.data.Result)) {
        setAppointments(res.data.Result);
        console.log(res.data.Result);
      } else {
        throw new Error("Invalid data formate");
      }
    } catch (error) {
      console.error("Failed to fetch all doctor appointments", error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, [id]);

  const SearchFilterData = appointments.filter((item) =>
    item.name.toLowerCase().includes(searchTeam.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(`en-GB`, options);
  };

  return (
    <div className="wrapper patients">
      <div className="content">
        <div className="page-title">
          <h3 className="count">Appointments</h3>
          {/* <div className="buttons">
            <Link className="btn">
              <i className="fa-solid fa-plus"></i>Add Patient
            </Link>
          </div> */}
        </div>

        <div className="container">
          <div className="search-title">
            <h3>All Appointments</h3>
            <div className="search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search patient..."
                value={searchTeam}
                onChange={(e) => setSearchTeam(e.target.value)}
              />
            </div>
          </div>

          <div className="table-container">
            <div className="table">
              {SearchFilterData.length === 0 ? (
                <p>No appointments scheduled.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Department</th>
                      <th>Procedure</th>
                      <th>Phone</th>
                      <th>Appointment_Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SearchFilterData.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={
                              `${apiUrl}/images/${item.photo}` || placeholderImg
                            }
                            alt={item.name}
                            className="image"
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item?.age  || "NULL"}</td>
                        <td>{item?.gender  || "NULL"}</td>
                        <td>{item.email}</td>
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
                        <td>{item.department}</td>
                        <td>{item.procedure}</td>
                        <td>{item?.phone || "NULL"}</td>
                        <td>{formatDate(item.appointment_date)}</td>
                        <td>
                          <div className="buttons">
                            <Link
                              to={`/doctor/appointments/appointment-details/${item.id}`}
                              className="btn read"
                            >
                              <i className="fa-solid fa-eye"></i>
                            </Link>
                            {/* <Link className="btn edit">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                      </Link> */}
                            <Link className="btn delete">
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
  );
};

export default DoctorAppointments;
