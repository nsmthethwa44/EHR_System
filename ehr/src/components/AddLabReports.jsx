import React, { useState, useEffect } from 'react';
import scopeImg from "../assets/img/scope.png";
import { toast} from 'react-toastify';
import axios from 'axios';
import { useGlobal } from './GlobalContext';

const AddLabReports = ({onClose}) => {
    const [data, setData] = useState({
        patientId: "",
        testName: "",
        labResults: ""
    })
    const [patients, setPatients] = useState([])
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {getLabReport} = useGlobal();

  const getPatients = async() =>{
    try {
      const res = await axios.get(`${apiUrl}/patients`)
      if(res.data && Array.isArray(res.data.Result)){
        setPatients(res.data.Result)
      }else{
        throw new Error("Invalid data formate")
      }
    } catch (error) {
      console.error("Failed to fetch patients data", error)
    }
  }

  useEffect(() =>{
    getPatients();
  }, [])

    const handleOnChange = (e) =>{
        const {name, value} = e.target;
        setData({...data, [name]: value})
    }

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!data || Object.keys(data).length === 0) {
    toast.error("Please fill in all fields.", { position: "top-center" });
    return;
  }

  setIsSubmitting(true);
  try {
    const res = await axios.post(`${apiUrl}/labResults`, data);
    console.log(data)

    if (res.data.Status === "Success") {
      toast.success(res.data.message, { position: "top-center" });
      getLabReport();
      setData({ patientId: "", testName: "", labResults: "" });
      setTimeout(() => {
        onClose();
      }, 3000);
    } else {
      toast.error(res.data?.message || "Failed to add lab results.", {
        position: "top-center",
      });
    }
  } catch (error) {
    console.error("Submission Error:", error);
    toast.error("An error occurred. Please try again.", { position: "top-center" });
  } finally {
    setIsSubmitting(false);
  }
};


  return (
     <div className="create_form_ popup_wrapper_">
            <div className="container_">
              <div className="title_">
                <img src={scopeImg} alt="" className="scopeImg_" />
                <h3 className="count">Add Lab Reports</h3>
                <i className="fa-solid fa-xmark" onClick={ onClose}></i>
              </div>
    
              <form className="form_" onSubmit={handleSubmit}>
    
                <label htmlFor="name">
                  Patient:
                  <select name="patientId" value={data.patientId} onChange={handleOnChange} required>
                    <option value="">-- Select Patient --</option>
                    {patients.map((item) =>(
                      <option value={item.id} key={item.id}>#{item.id} - {item.name}</option>
                    ))}
                  </select>
                </label>
                <label htmlFor="testName">Test Name:
                    <input type="text" name='testName' value={data.testName} placeholder='Test Name' onChange={handleOnChange}  className='textBox' required />
                </label>
                 <label htmlFor="labResults">Lab Result:
                    <input type="text" name='labResults' value={data.labResults} placeholder='lab Results' onChange={handleOnChange}  className='textBox' required />
                </label>
    
                <div className="buttons">
                 <button type="submit" disabled={isSubmitting} className='btn'>
                     {isSubmitting ? "Submitting..." : "Submit"}
              </button>
                </div>
              </form>
            </div>
          </div>
  )
}

export default AddLabReports