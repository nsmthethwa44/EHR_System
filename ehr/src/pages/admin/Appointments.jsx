import DoctorAppointmentsCalendar from "../../components/DoctorAppointmentsCalendar"

const Appointments = () => {
    return (
      <div className="appointments wrapper">
        <div className="content">
          <div className="page-title">
            <h3 className="count">Upcoming Appointments</h3>
          </div>

          <div className="appointments-box">
            <div className="box">
              <DoctorAppointmentsCalendar />
            </div>
          </div>
        </div>
      </div>
    );
}
export default Appointments
