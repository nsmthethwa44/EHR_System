import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import PatientSidebar from './PatientSidebar'
import PatientHeader from './PatientHeader' 
import { GlobalProvider } from './GlobalContext';

const PatientDashboard = () => {
  return (
    <>
    <GlobalProvider>
       {/* sidebar  */}
    <PatientSidebar />

    {/* main content  */}
    <div className="main">

      {/* header  */}
      <PatientHeader />

      {/* content  */}
      <div className="main-content">
        <Outlet />
      </div>

      {/* footer  */}
      <Footer />

    </div>
    </GlobalProvider>
  </>
  )
}

export default PatientDashboard