import React from 'react'
import { NavLink } from 'react-router-dom'
import placeholderImg from "../../assets/img/user-admin.jpg"
import { useGlobal } from '../../components/GlobalContext'

const DoctorSidebar = () => {
  const {user, logout, isSidBarActive, hideSideBar } = useGlobal();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  return (
    <div className={isSidBarActive ? "sidebar active"  : "sidebar"}>
      <div className="content">
        <div className="top">
          <div className="logo">
            <i className="fa-solid fa-heart-pulse"></i>
            <h2 className="logo-text">
              E-Health<span>Records</span>
            </h2>
          </div>

            <div className="close-sidebar" onClick={hideSideBar}><i class="fa-solid fa-angle-left"></i></div>

          <div className="divider"></div>
          <div className="user">
            <img src={user?.photo ? `${apiUrl}/images/${user.photo}` : placeholderImg} alt="" className="user-img" />
            <span>Super {user?.role}</span>
          </div>
          <div className="divider"></div>
        </div>

        <div className="navbar">
          <ul className="nav">
            <li>
              <NavLink to={"/doctor"} className={"nav-link"} end onClick={hideSideBar}>
                <i className="fa-solid  fa-layer-group"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"doctors"} className={"nav-link"} onClick={hideSideBar}>
                <i className="fa-solid fa-user-doctor"></i>
                <span>Doctors</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"patients"} className={"nav-link"} onClick={hideSideBar}>
                <i className="fa-solid fa-hospital-user"></i>
                <span>Patients</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"upcoming-appointments"} className={"nav-link"} onClick={hideSideBar}>
                <i class="fa-regular fa-calendar-days"></i>
                <span>Upcoming Appointments</span>
              </NavLink>
            </li>
              <li>
              <NavLink to={"appointments"} className={"nav-link"} onClick={hideSideBar}>
                <i className="fa-solid fa-clock"></i>
                <span>Doctor Appointments</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"lab-report"} className={"nav-link"} onClick={hideSideBar}>
                <i className="fa-solid  fa-layer-group"></i>
                <span>Lab Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"prescriptions"} className={"nav-link"} onClick={hideSideBar}>
                <i className="fa-solid fa-pills"></i>
                <span>Prescriptions</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"billings"} className={"nav-link"} onClick={hideSideBar}>
                <i className="fa-solid fa-money-bill"></i>
                <span>Billing</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"help"} className={"nav-link"} onClick={hideSideBar}>
                <i className="fa-solid fa-circle-question"></i>
                <span>Help</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"settings"} className={"nav-link"} onClick={hideSideBar}>
                <i className="fa-solid fa-gear"></i>
                <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/"} className={"nav-link"} onClick={logout}>
                <i className="fa-solid fa-right-to-bracket"></i>
                <span>Log Out</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DoctorSidebar