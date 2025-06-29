import React from 'react'

const Stats = () => {
  return (
    <div className="stats">
    <div className="box">
        <div className="text">
            <p>Departments</p>
            <h3 className='count'>12+</h3>
        </div>
        <i className="fa-solid fa-house-chimney-medical"></i>
    </div>
    <div className="box">
        <div className="text">
            <p>Doctors</p>
            <h3 className='count'>10+</h3>
        </div>
        <i className="fa-solid fa-user-doctor"></i>
    </div>
    <div className="box">
        <div className="text">
            <p>Prescriptions</p>
            <h3 className='count'>30+</h3>
        </div>
        <i className="fa-solid fa-vial-circle-check"></i>
    </div>
    <div className="box">
        <div className="text">
            <p>Patients</p>
            <h3 className='count'>17+</h3>
        </div>
        <i className="fa-solid fa-hospital-user"></i>
    </div>
    <div className="box">
        <div className="text">
            <p>Patient Appointments</p>
            <h3 className='count'>12+</h3>
        </div>
        <i className="fa-regular fa-calendar-days"></i>
    </div>
    <div className="box">
        <div className="text">
            <p>Patient Case Studies</p>
            <h3 className='count'>61+</h3>
        </div>
        <i className="fa-solid fa-suitcase-medical"></i>
    </div>
    <div className="box">
        <div className="text">
            <p>Invoices</p>
            <h3 className='count'>26+</h3>
        </div>
        <i className="fa-solid fa-file-lines"></i>
    </div>
    <div className="box">
        <div className="text">
            <p>Payments</p>
            <h3 className='count'>67+</h3>
        </div>
        <i className="fa-solid fa-money-bill-1"></i>
    </div>
</div>
  )
}

export default Stats