import React from 'react'
import { NavLink } from 'react-router-dom'
import img1 from "../../assets/img/user-admin.jpg"
import { useGlobal } from '../../components/GlobalContext'

const AdminSidebar = () => {
  const {logout, isSidBarActive, hideSideBar } = useGlobal();

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
            <img src={img1} alt="" className="user-img" />
            <span>Super Admin</span>
          </div>
          
          <div className="divider"></div>
        </div>

        <div className="navbar">
          <ul className="nav">
            <li>
              <NavLink to={"/admin"} className={"nav-link"} end>
                <i className="fa-solid  fa-layer-group"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"doctors"} className={"nav-link"}>
                <i className="fa-solid fa-user-doctor"></i>
                <span>Doctors</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"patients"} className={"nav-link"}>
                <i className="fa-solid fa-hospital-user"></i>
                <span>Patients</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"upcoming-appointments"} className={"nav-link"}>
                <i className="fa-solid fa-clock"></i>
                <span>Appointments</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"lab-report"} className={"nav-link"}>
                <i className="fa-solid  fa-layer-group"></i>
                <span>Lab Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"prescriptions"} className={"nav-link"}>
                <i className="fa-solid fa-pills"></i>
                <span>Prescriptions</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"billings"} className={"nav-link"}>
                <i className="fa-solid fa-money-bill"></i>
                <span>Billing</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"help"} className={"nav-link"}>
                <i className="fa-solid fa-circle-question"></i>
                <span>Help</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"settings"} className={"nav-link"}>
                <i className="fa-solid fa-gear"></i>
                <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink  className={"log-out"} onClick={logout }>
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

export default AdminSidebar