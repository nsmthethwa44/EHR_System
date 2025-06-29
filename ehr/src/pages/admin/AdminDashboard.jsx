import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import { GlobalProvider } from '../../components/GlobalContext';

const AdminDashboard = () => {
  return (
    <>
    <GlobalProvider>
          {/* sidebar  */}
    <AdminSidebar />

    {/* main content  */}
    <div className="main">
      
      {/* header  */}
      <AdminHeader />

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

export default AdminDashboard