import React from 'react'
import { NavLink } from 'react-router-dom'
import placeholderImg from "../../assets/img/user-admin.jpg"
import { useGlobal } from './GlobalContext'

const PatientSidebar = () => {
    const {user, logout,  isSidBarActive, hideSideBar } = useGlobal();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

  return (
    <div className={isSidBarActive ? "sidebar active"  : "sidebar"}>
    <div className="content">

      <div className="top">
        <div className="logo"><i className="fa-solid fa-heart-pulse"></i><h2 className='logo-text'>E-Health<span>Records</span></h2></div>
          <div className="divider"></div>
            <div className="user">
              <img src={user?.photo ? `${apiUrl}/images/${user.photo}` : placeholderImg} alt="" className="user-img" />
              <span>Super {user?.role}</span>
            </div>
            <div className="close-sidebar" onClick={hideSideBar}><i class="fa-solid fa-angle-left"></i></div>

          <div className="divider"></div>
      </div>

      <div className="navbar">
        <ul className="nav">
          <li><NavLink to={"/patient"} className={"nav-link"}  end  onClick={hideSideBar}><i className="fa-solid  fa-layer-group"></i><span>Dashboard</span></NavLink></li>
          <li><NavLink to={"doctors"} className={"nav-link"}  onClick={hideSideBar}><i className="fa-solid fa-user-doctor"></i><span>Doctors</span></NavLink></li>
          <li><NavLink to={"appointments"} className={"nav-link"}  onClick={hideSideBar}><i className="fa-solid fa-calendar-check"></i><span>My Appointments</span></NavLink></li>
          <li><NavLink to={"my-lab-results"} className={"nav-link"}  onClick={hideSideBar}><i className="fa-solid  fa-layer-group"></i><span>My Lab Results</span></NavLink></li>
          <li><NavLink to={"my-prescriptions"} className={"nav-link"}  onClick={hideSideBar}><i className="fa-solid fa-pills"></i><span>My Prescriptions</span></NavLink></li>
          <li><NavLink to={"my-medication-records"} className={"nav-link"}  onClick={hideSideBar}><i className="fa-solid fa-money-bill"></i><span>My Medication Records</span></NavLink></li>
          <li><NavLink to={"my-profile"} className={"nav-link"}  onClick={hideSideBar}><i className="fa-solid fa-circle-question"></i><span>My Profile</span></NavLink></li>
          <li><NavLink to={"settings"} className={"nav-link"}  onClick={hideSideBar}><i className="fa-solid fa-gear"></i><span>Settings</span></NavLink></li>
          <li><NavLink to={"/"} className={"nav-link"} onClick={logout}><i className="fa-solid fa-right-to-bracket"></i><span>Log Out</span></NavLink></li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default PatientSidebar