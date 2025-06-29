import React from 'react'
import { Link } from 'react-router-dom'
import appointments from "../assets/data/appointments.json"
import doctors from "../assets/data/doctors.json"

const Overview = () => {
  return (
   <div className="overview">
    <div className="content">

        <div className="page-title">
            <h3>Dashboard</h3>
            <span>Lorem ipsum dolor sit amet.</span>
        </div>

        <div className="stats">
            <div className="box">
                <div className="text">
                    <p>Departments</p>
                    <h3>6</h3>
                </div>
                <i className="fa-solid fa-house-chimney-medical"></i>
            </div>
            <div className="box">
                <div className="text">
                    <p>Doctors</p>
                    <h3>0</h3>
                </div>
                <i className="fa-solid fa-user-doctor"></i>
            </div>
            <div className="box">
                <div className="text">
                    <p>Prescriptions</p>
                    <h3>0</h3>
                </div>
                <i className="fa-solid fa-vial-circle-check"></i>
            </div>
            <div className="box">
                <div className="text">
                    <p>Patients</p>
                    <h3>0</h3>
                </div>
                <i className="fa-solid fa-hospital-user"></i>
            </div>
            <div className="box">
                <div className="text">
                    <p>Patient Appointments</p>
                    <h3>0</h3>
                </div>
                <i className="fa-regular fa-calendar-days"></i>
            </div>
            <div className="box">
                <div className="text">
                    <p>Patient Case Studies</p>
                    <h3>61</h3>
                </div>
                <i className="fa-solid fa-suitcase-medical"></i>
            </div>
            <div className="box">
                <div className="text">
                    <p>Invoices</p>
                    <h3>26</h3>
                </div>
                <i className="fa-solid fa-file-lines"></i>
            </div>
            <div className="box">
                <div className="text">
                    <p>Payments</p>
                    <h3>67</h3>
                </div>
                <i className="fa-solid fa-money-bill-1"></i>
            </div>
        </div>

        <div className="appointments-doctors">
            <div className="box appointments">
                <h3>Appointments <Link to={"/"} className='view-all'>View All <i className="fa-solid fa-angle-right"></i></Link></h3>
                <div className="table-container">
                    <div className="table">
                        <table>
                          <thead>
                            <tr>
                                <th>Patient_ID</th>
                                <th>Doctor_ID</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Reason</th>
                            </tr>
                          </thead>
                          <tbody>
                           { appointments.map((item) =>(
                            <tr key={item.id}>
                                <td>{item.patientId}</td>
                                <td>{item.doctorId}</td>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                                <td style={{color: item.status === "Cancelled" ? "#ef4444" : item.status === "Completed"? "#10b981" : item.status === "Scheduled" ? "#0095f6" : "",}}>{item.status}</td>
                                <td>{item.reason}</td>
                            </tr>
                           ))}
                          </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="box doctors">
                <h3>Doctors<Link to={"/"} className='view-all'>View All <i className="fa-solid fa-angle-right"></i></Link></h3>
                <div className="table-container">
                    <div className="table">
                        <table>
                          <thead>
                            <tr>
                                <th>Name</th>
                                <th>Specialization</th>
                                <th>Email</th>
                            </tr>
                          </thead>
                          <tbody>
                           {doctors.map((item) =>(
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.specialization}</td>
                                <td>{item.email}</td>
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
  )
}

export default Overview