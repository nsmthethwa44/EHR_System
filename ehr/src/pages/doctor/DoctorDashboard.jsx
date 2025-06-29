import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import DoctorSidebar from './DoctorSidebar'
import DoctorHeader from './DoctorHeader'
import { GlobalProvider } from '../../components/GlobalContext';

const DoctorDashboard = () => {
  return (
    <>
    <GlobalProvider>
          {/* sidebar  */}
    <DoctorSidebar />

    {/* main content  */}
    <div className="main">

      {/* header  */}
      <DoctorHeader />

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

export default DoctorDashboard