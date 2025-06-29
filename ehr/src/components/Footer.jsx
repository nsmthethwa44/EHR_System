import React from 'react'
import img1 from "../assets/img/cool_20px.png"

const Footer = () => {
  return (
    <div className="copyright footer">
        <div className="content">
            <h6>Created By: <span>Nkululeko Mthethwa</span><img src={img1} alt="" /> | &copy;2025 | All Rights Reserved</h6>
        </div>
    </div>
  )
}

export default Footer