import React, { useState, useEffect } from 'react';
import scopeImg from "../../assets/img/scope.png";
import { toast} from 'react-toastify';
import axios from 'axios';
import { useGlobal } from './GlobalContext';
import { useNavigate } from 'react-router-dom';

const CreateAppointment = ({onClose}) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const {user, doctors} = useGlobal();
  const navigate = useNavigate();

  const [data, setData] = useState({
    date: "",
    department: "",
    doctorId: "",
    procedure: "",
    patientId: user?.id || "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/appointment`, data)

      if (res.data.Status === "Success") {
        toast.success(res.data.message, { position: "top-center",});
        // setTimeout(() => {
        //   navigate("appointments")
        // }, 3000);
       
      } else {
        toast.error("Failed to create appointment.", {  position: "top-center",});
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("An error occurred. Please try again.", {  position: "top-center",});
    }
  };

  return (
    <div>
        <div className="create_form_ popup_wrapper_">
        <div className="container_">
          <div className="title_">
            <img src={scopeImg} alt="" className="scopeImg_" />
            <h3 className="count">Create Appointment</h3>
            <i className="fa-solid fa-xmark" onClick={ onClose}></i>
          </div>

          <form className="form_" onSubmit={handleSubmit}>
            <label htmlFor="date">
              Appointment Date (doctor will assign time after approval):
              <input type="date" className="textBox_" name="date" value={data.date} onChange={handleOnChange} required />
            </label>

            <label htmlFor="department">
              Which department would you like to get an appointment from?
              <select name="department" value={data.department} onChange={handleOnChange} required>
                <option value="">-- Select Department --</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Oncology">Oncology</option>
                <option value="Pathology">Pathology</option>
              </select>
            </label>

            <label htmlFor="doctorId">
              Doctor:
              <select name="doctorId" value={data.doctorId} onChange={handleOnChange} required>
                <option value="">-- Select Doctor --</option>
                {doctors.map((item) =>(
                  <option value={item.id} key={item.id}>Dr {item.name}</option>
                ))}
                
              </select>
            </label>

            <label htmlFor="procedure">
              Which procedure do you want to make an appointment for?
              <select name="procedure" value={data.procedure} onChange={handleOnChange} required>
                <option value="">-- Select Procedure --</option>
                <option value="Medical Examination">Medical Examination</option>
                <option value="Result Analysis">Result Analysis</option>
                <option value="Regular Checkup">Regular Checkup</option>
                <option value="Consultation">Consultation</option>
              </select>
            </label>

            <div className="buttons">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;
