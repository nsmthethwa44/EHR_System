import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import prescriptions from "../../assets/data/prescriptions.json"

const Prescriptions = () => {
  const [searchTeam, setSearchTeam] = useState("");

  const SearchFilterData = prescriptions.filter((item) =>(
    item.medication.toLowerCase().includes(searchTeam.toLowerCase())
  ))

  return (
    <>
      <div className="wrapper lab-reports">
        <div className="content">
          <div className="page-title">
            <h3 className="count">Prescriptions</h3>
            <div className="buttons">
              <Link className="btn">
                <i className="fa-solid fa-plus"></i>Add Prescription
              </Link>
            </div>
          </div>

          <div className="container">
            <div className="search-title">
              <h3>All Prescription</h3>
              <div className="search">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Search doctor..."
                  value={searchTeam}
                  onChange={(e) => setSearchTeam(e.target.value)}
                />
              </div>
            </div>

            <div className="table-container">
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>Patient_ID</th>
                      <th>DoctorId</th>
                      <th>Medication</th>
                      <th>Instruction</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SearchFilterData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.doctorId}</td>
                        <td>{item.medication}</td>
                        <td>{item.instructions}</td>
                        <td>{item.date}</td>
                        <td>
                          <div className="buttons">
                            <Link className="btn read">
                              <i className="fa-solid fa-eye"></i>
                            </Link>
                            <Link className="btn edit">
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Link>
                            <Link className="btn delete">
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

    </>
  );
}

export default Prescriptions