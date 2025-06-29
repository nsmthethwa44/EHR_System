import React from 'react'
import img1 from "../../assets/img/south_africa_20px.png"
import userPlaceholderImg from "../../assets/img/user-admin.jpg"
import { useGlobal } from '../../components/GlobalContext'

const AdminHeader = () => {
    const {showSideBar} = useGlobal();

  return (
      <header className="header">
            <div className="content">
                <div className="menu-site">
                    <div className="menu" onClick={showSideBar}><i className="fa-solid fa-bars"></i></div>
                    <div className="page"><span>Dashboard</span></div>
                </div>
    
                <ul className="list">
                    <li className='list-item'><i className="fa-solid fa-comments"></i>Chat With Us</li>
                    <li className='list-item'><span><i className="fa-solid fa-location-dot"></i></span>EHR</li>
                        <li className='user'>
                            <div className="text">
                                <p>Zama Xulu</p>
                                <h4>Admin</h4>
                            </div>
                            <img src={userPlaceholderImg} alt="" className="img-box" />
                        </li>
                    <li><img src={img1} alt="" />EN</li>
                </ul>
            </div>
        </header>
  )
}

export default AdminHeader