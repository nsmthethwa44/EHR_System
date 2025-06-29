import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import placeholderImg from "../../assets/img/user-admin.jpg";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AppointmentDetails = () => {
  const [myAppointments, setMyAppointments] = useState([]);
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [appointmentDetails, setAppointmentDetails] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(`en-GB`, options);
  };
  const getAppointmentDetails = async () => {
    if (!id) return;

    try {
      const res = await axios.get(`${apiUrl}/appointmentDetails/${id}`);
      if (res.data && Array.isArray(res.data.Result)) {
        setAppointmentDetails(res.data.Result[0]);
        console.log(res.data.Result);
      } else {
        throw new Error("Invalid data formate!");
      }
    } catch (error) {
      console.log("Failed to fetch appointments details");
    }
  };

  const getMyAppointments = async () => {
    if (!appointmentDetails?.patient_id) return;

    try {
      const res = await axios.get(
        `${apiUrl}/patientAppointments/${appointmentDetails?.patient_id}`
      );
      if (res.data && Array.isArray(res.data.Result)) {
        setMyAppointments(res.data.Result);
        console.log(res.data.Result);
      } else {
        throw new Error("Invalid data formate!");
      }
    } catch (error) {
      console.log("Failed to fetch appointments");
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await axios.put(`${apiUrl}/updateAppointmentStatus/${id}`, {
        status: "Approved",
      });

      if (res.data.success) {
        toast.success("Appointment approved successfully.", {
          position: "top-center",
        });
        getAppointmentDetails();
        getMyAppointments();
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
        getAppointmentDetails();
        getMyAppointments();
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment.", { position: "top-center" });
    }
  };

  useEffect(() => {
    getAppointmentDetails();
  }, [id]);

  useEffect(() => {
    if (appointmentDetails?.patient_id) {
      getMyAppointments();
    }
  }, [appointmentDetails?.patient_id]);

  return (
    <div className="appointment-details">
      <div className="content">
        <div className="page-title">
          <h3 className="count">Appointment Details</h3>
        </div>

        <div className="container-box">
          <div className="box">
            <div className="info">
              <div className="box-img">
                <img
                  src={
                    appointmentDetails?.photo
                      ? `${apiUrl}/images/${appointmentDetails.photo}`
                      : placeholderImg
                  }
                  alt=""
                  className="img-box"
                />
              </div>
              <div className="text">
                <h3 className="count">{appointmentDetails?.name}</h3>
                <p>{appointmentDetails?.email}</p>
              </div>
              <div className="status">
                <span>{appointmentDetails?.department}</span>
                <span>{appointmentDetails?.procedure}</span>
                <span>{appointmentDetails?.status}</span>
              </div>
              <div className="buttons">
                <Link to={""} className="btn">
                  <i class="fa-solid fa-phone"></i>
                  {appointmentDetails?.phone || "012 345 6765"}
                </Link>
                <Link
                  to={""}
                  className="btn approve"
                  onClick={() => handleApprove(appointmentDetails?.id)}
                >
                  <i class="fa-solid fa-check"></i>{" "}
                  {appointmentDetails?.status === "Approved"
                    ? "Approved"
                    : "Approve"}
                </Link>
                <Link
                  to={""}
                  className="btn delete"
                  onClick={() => handleCancel(appointmentDetails?.id)}
                >
                  <i class="fa-solid fa-xmark"></i>
                  {appointmentDetails?.status === "Cancelled"
                    ? "Cancelled"
                    : "Cancel"}
                </Link>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="details">
              <ul>
                <li>
                  Appointment Date
                  <span>
                    {formatDate(appointmentDetails?.appointment_date)}
                  </span>
                </li>
                <li>
                  Gender
                  <span>Female</span>
                </li>
                <li>
                  Weight
                  <span>56kg</span>
                </li>
                <li>
                  Height
                  <span>172cm</span>
                </li>
              </ul>
              <ul>
                <li>
                  D.O.B
                  <span>23 February 2023</span>
                </li>
                <li>
                  Gender
                  <span>Female</span>
                </li>
                <li>
                  Weight
                  <span>56kg</span>
                </li>
                <li>
                  Height
                  <span>172cm</span>
                </li>
              </ul>
              <ul>
                <li>
                  D.O.B
                  <span>23 February 2023</span>
                </li>
                <li>
                  Gender
                  <span>Female</span>
                </li>
                <li>
                  Weight
                  <span>56kg</span>
                </li>
                <li>
                  Height
                  <span>172cm</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="stats-numbers">
          <h3>Patient Stats</h3>
          <div className="stats-box">
            <div className="stats-number">
              <div className="text">
                <p>In Lorem</p>
                <h3 className="count">34</h3>
              </div>
              <p className="muted">
                <span>53%</span>In This Week
              </p>
            </div>
            <div className="stats-number">
              <div className="text">
                <p>New Patients</p>
                <h3 className="count">3</h3>
              </div>
              <p className="muted">
                <span>5%</span>In This Week
              </p>
            </div>
            <div className="stats-number">
              <div className="text">
                <p>Appointments</p>
                <h3 className="count">6</h3>
              </div>
              <p className="muted">
                <span>75%</span>In This Week
              </p>
            </div>
            <div className="stats-number">
              <div className="text">
                <p>Regular</p>
                <h3 className="count">4</h3>
              </div>
              <p className="muted">
                <span>15%</span>In This Week
              </p>
            </div>
          </div>
        </div>

        <div className="patient-appointment-history">
          <h3>Patient Appointment History</h3>

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
                    {myAppointments.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={
                              item.photo
                                ? `${apiUrl}/images/${item.photo}`
                                : placeholderImg
                            }
                            alt=""
                            className="image"
                          />
                        </td>
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
  );
};

export default AppointmentDetails;
