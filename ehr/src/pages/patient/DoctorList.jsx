import React from 'react'
import { Link } from 'react-router-dom'
import placeholderImg from "../../assets/img/doctor-img.jpg"
import { useGlobal } from './GlobalContext';

const DoctorList = () => {
      const {doctors} = useGlobal();
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

  return (
   <div className="wrapper doctors">
      <div className="content">
        <div className="page-title">
          <h3 className="count">Doctors</h3>
          <div className="buttons">
            <Link className="btn">
              <i className="fa-solid fa-plus"></i>Add Doctor
            </Link>
          </div>
        </div>

        <div className="container-box">
          {doctors.map((item) => (
            <div className="box" key={item.id}>
              <span
                className="ribbon"
                style={{
                  background:
                    item.workingHours === "Full Time"
                      ? "#ef4444"
                      : item.workingHours === "Part Time"
                      ? "#0095f6"
                      : "",
                }}
              >
                {item.workingHours}
              </span>
              <div className="box-img">
                <img src={`${apiUrl}/images/${item.photo}` ||  placeholderImg} alt="" className="img-box" />
              </div>
              <div className="text-box">
                <div className="text">
                  <h3>{item.name}</h3>
                  <p>{item.role}</p>
                </div>
                <Link className="view-all">
                  <i className="fa-solid fa-angle-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorList