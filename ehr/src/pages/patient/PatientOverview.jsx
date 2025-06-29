import React, {useEffect, useState} from 'react';
import img1 from "../../assets/img/scope.png"
import placeholderImg from "../../assets/img/female_profile_50px.png"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import userPlaceholderImg from "../../assets/img/user-admin.jpg"
import img3 from "../../assets/img/help-img.png"
import { useGlobal } from './GlobalContext';
import CreateAppointment from "./CreateAppointment"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const healthData = [
  { date: 'May 1', value: 120 },
  { date: 'May 5', value: 122 },
  { date: 'May 10', value: 118 },
  { date: 'May 15', value: 121 },
];

const PatientOverview = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const {user, doctors} = useGlobal();
  const [createAppointment, setCreateAppointment] = useState(null);
  const navigate = useNavigate();

  const hideAppointmentForm = () => setCreateAppointment(false)
  const showAppointmentForm = () => setCreateAppointment(!createAppointment)

  useEffect(() =>{
    const token = localStorage.getItem("token")
    console.log(token)

    const getAdmin = async() =>{
      if(!token){
        navigate("/")
      }

      try {
        const res = await axios.get(`${apiUrl}/patient`, {headers: {Authorization: `Bearer ${token}`}})
        console.log("Dashboard Response:",  res.data.message)
        if(res.data.Status = "success"){
         const role = res.data.role;
         console.log("logged In as", role);
         if(role !== "Patient" || role === ""){
          navigate("/");
         }
        }else if(res.data.error){
          navigate("/");
        }
      } catch (error) {
        console.log("Failed to get patient",error)
      }
    }

    getAdmin();
  }, [])

    return (
      <>
        <div className="patient-overview">
          <div className="content">
            <div className="left">
              <div className="top">
                <div className="text">
                  <div className="box">
                    <h3 className="heading count">Welcome back, Zama 👋</h3>
                    <p className="subtext">
                      Here's your latest health overview.
                    </p>
                    <p className="margintop">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Explicabo, soluta molestias! Distinctio ipsum rerum magni
                      eligendi reiciendis molestiae quia mollitia.
                    </p>

                    <div className="buttons margintop">
                      <button className="btn" onClick={showAppointmentForm}>
                        <i className="fa-solid fa-plus"></i>New Appointment
                      </button>
                    </div>
                  </div>
                </div>
                <div className="box-img">
                  {" "}
                  <img src={img1} alt="" className="img-box" />
                </div>
              </div>
              <div className="bottom">
                <div className="doctors-info">
                  <div className="doctor-list box">
                    <h3>
                      Doctor List{" "}
                      <span className="view-all">
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                    </h3>
                    <div className="details-box">
                      {doctors.slice(0, 12).map((item) => (
                        <div className="doctor-box" key={item.id}>
                          <div className="details">
                            <img src={item?.photo ? `${apiUrl}/images/${item?.photo}` : placeholderImg} alt="" className="img-box" />
                            <div className="text-box">
                              <h3>Dr. {item.name || "Dr Lorem"}</h3>
                              <p>{item.email || "Lorem"}</p>
                            </div>
                          </div>
                          <div className="buttons">
                            <i className="fa-solid fa-ellipsis"></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="info">
                    <div className="info-stats">
                      <div className="box">
                        <h3 className="section-heading">
                          Upcoming Appointments
                        </h3>
                        <p className="section-text">
                          <span></span>Dr. Smith (Cardiologist) - May 20, 10:00
                          AM
                        </p>
                        <div className="buttons">
                          <button className="view-all">
                            Manage<i className="fa-solid fa-list-check"></i>
                          </button>
                        </div>
                      </div>
                      <div className="box">
                        <h3 className="section-heading">
                          Recent Prescriptions
                        </h3>
                        <p className="section-text">
                          <span></span>Magni eligendi reiciendis lorem
                        </p>
                        <div className="buttons">
                          <button className="view-all">
                            View All<i className="fa-solid fa-angle-right"></i>
                          </button>
                        </div>
                      </div>
                      <div className="box">
                        <h3 className="section-heading">Recent Lab Results</h3>
                        <p className="section-text">
                          <span></span>CBC - Normal (May 12){" "}
                        </p>
                        <div className="buttons">
                          <button className="view-all">
                            View Details<i className="fa-solid fa-angle-right"></i>
                          </button>
                        </div>
                      </div>
                      <div className="box">
                        <h3 className="section-heading">Profile & Settings</h3>
                        <p className="section-text">
                          <span></span>Language: English
                        </p>
                        <div className="buttons">
                          <button className="view-all">
                            View All<i className="fa-solid fa-angle-right"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="info-chart">
                      <div className="box">
                        <h3 className="section-heading">
                          Blood Pressure Trends
                        </h3>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={healthData}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#4f46e5"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="right">
              <div className="more-user-profile">
                <div className="user-profile">
                  <div className="box">
                    <h3>Profile</h3>

                    <div className="profile-box">
                      <div className="box-img">
                        <img
                          src={user?.photo ? `${apiUrl}/images/${user?.photo}` : userPlaceholderImg}
                          alt=""
                          className="img-box"
                        />
                      </div>
                      <div className="details">
                        <h3 className="count">Zama Xulu</h3>
                        <p>Lorem ipsum dolor sit amet.</p>
                      </div>
                      <div className="numbers">
                        <div className="text">
                          <p>Lorem, ipsum dolor.</p>
                          <h2>4.5</h2>
                        </div>
                        <div className="text">
                          <p>Lorem, ipsum dolor.</p>
                          <h2>109</h2>
                        </div>
                      </div>
                    </div>

                    <div className="med-history">
                      <h3 className="section-heading">Medical History</h3>
                      <ul className="list">
                        <li>Type 2 Diabetes</li>
                        <li>Hypertension</li>
                        <li>Allergy: Penicillin</li>
                      </ul>
                    </div>

                    <div className="more">
                      <img src={img3} alt="" className="img-box" />
                      <div className="more-info">
                        <div className="text">
                          <h3>
                            Need More <br /> help?
                          </h3>
                          <div className="buttons">
                            <button className="btn">
                              <i className="fa-solid fa-hand-holding-medical"></i>
                              More Info
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {createAppointment && <CreateAppointment  onClose={hideAppointmentForm}/>}
      </>
    );
}

export default PatientOverview