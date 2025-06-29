import axios from "axios";
import React, { useEffect, useState } from "react";

const DoctorAppointmentsCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [displayMonth, setDisplayMonth] = useState("2025-05");
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const getAppointments = async () => {
    try {
      const res = await axios.get(`${apiUrl}/appointments`);
      if (res.data && Array.isArray(res.data.Result)) {
        const appts = res.data.Result;
        setAppointments(appts);

        // Check if current month (May 2025) has appointments
        const mayAppointments = appts.filter(appt =>
          appt.appointment_date?.startsWith("2025-05")
        );

        if (mayAppointments.length > 0) {
          setDisplayMonth("2025-05");
        } else {
          // Find the next available month
          const availableMonths = [...new Set(appts.map(appt =>
            appt.appointment_date?.slice(0, 7)
          ))].sort();

          const nextMonth = availableMonths.find(month => month > "2025-05");
          setDisplayMonth(nextMonth || "2025-05"); // fallback to May if nothing later
        }
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const daysInMonth = (month) => {
    const [year, mon] = month.split("-");
    return new Date(year, mon, 0).getDate();
  };

  const getAppointmentsForDate = (dateStr) =>
    appointments.filter(appt => appt.appointment_date?.startsWith(dateStr));

  const handleDayClick = (day) => {
    const selected = `${displayMonth}-${String(day).padStart(2, "0")}`;
    setSelectedDate(selected);
  };

  const renderCalendarDays = () => {
    const days = daysInMonth(displayMonth);
    return Array.from({ length: days }, (_, i) => i + 1).map(day => {
      const fullDate = `${displayMonth}-${String(day).padStart(2, "0")}`;
      const hasAppointments = getAppointmentsForDate(fullDate).length > 0;

      return (
        <div
          key={day}
          className="calendar-day"
          onClick={() => handleDayClick(day)}
        >
          <div className="day-number">{day}</div>
          {hasAppointments && <span className="appointment-indicator"></span>}
        </div>
      );
    });
  };

  return (
    <div className="calendar-container">
      <h3 className="heading">Doctor Appointments - {displayMonth}</h3>
      <div className="calendar-grid">{renderCalendarDays()}</div>

      {selectedDate && (
        <div className="appointment-details">
          <h3>Appointments on {selectedDate}</h3>
          {getAppointmentsForDate(selectedDate).length === 0 ? (
            <p>No appointments scheduled.</p>
          ) : (
            <ul>
              {getAppointmentsForDate(selectedDate).map((appt, index) => (
                <li key={index}>
                  <strong>
                    {appt.appointment_date?.split(" ")[1] || "Time N/A"}
                  </strong>{" "}
                  - Patient #{appt.patient_id} ({appt.doctor_name})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointmentsCalendar;
