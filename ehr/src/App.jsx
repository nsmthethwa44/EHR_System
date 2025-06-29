import "./style/all.css"
import "./style/all.min.css"
import "./style/style.css";

import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./components/Overview"
import Doctors from "./pages/admin/Doctors";
import Prescriptions from "./pages/admin/Prescriptions";
import Patients from "./pages/admin/Patients";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import LabReports from "./pages/admin/LabReports";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import MyLabResults from "./pages/patient/MyLabResults";
import MyMedicalRecords from "./pages/patient/MyMedicalRecords";
import MyPrescriptions from "./pages/patient/MyPrescriptions";
import MyProfile from "./pages/patient/MyProfile";
import PatientOverview from "./pages/patient/PatientOverview";
import Signup from "./components/Signup";
import AdminOverview from "./pages/admin/AdminOverview";
import DoctorOverview from "./pages/doctor/DoctorOverview";
import Appointments from "./pages/admin/Appointments";
import MyAppointments from "./pages/patient/MyAppointments";
import DoctorList from "./pages/patient/DoctorList";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import AppointmentDetails from "./pages/doctor/AppointmentDetails";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />

          {/* admin  */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminOverview />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="patients" element={<Patients />} />
            <Route path="upcoming-appointments" element={<Appointments />} />
            <Route path="lab-report" element={<LabReports />} />
            <Route path="prescriptions" element={<LabReports />} />
            <Route path="billings" element={<LabReports />} />
            <Route path="help" element={<LabReports />} />
            <Route path="settings" element={<LabReports />} />
          </Route>

          {/* doctor  */}
          <Route path="/doctor" element={<DoctorDashboard />}>
            <Route index element={<DoctorOverview />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="patients" element={<Patients />} />
            <Route path="upcoming-appointments" element={<Appointments />} />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="/doctor/appointments/appointment-details/:id" element={<AppointmentDetails/>} />
            <Route path="lab-report" element={<LabReports />} />
            <Route path="prescriptions" element={<LabReports />} />
            <Route path="billings" element={<LabReports />} />
            <Route path="help" element={<LabReports />} />
            <Route path="settings" element={<LabReports />} />
            <Route path="login" element={<Login />} />
          </Route>

          {/* patient  */}
          <Route path="/patient" element={<PatientDashboard />}>
            <Route index element={<PatientOverview />} />
            <Route path="my-lab-results" element={<MyLabResults />} />
            <Route path="doctors" element={<DoctorList />} />
            <Route path="appointments" element={<MyAppointments />} />
            <Route path="my-medication-records" element={<MyLabResults />} />
            <Route path="my-prescriptions" element={<MyLabResults />} />
            <Route path="my-profile" element={<DoctorList />} />
            <Route path="settings" element={<MyLabResults/>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App
