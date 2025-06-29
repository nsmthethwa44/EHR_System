import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import placeholderImg from "../../assets/img/female_profile_50px.png"

const Patients = () => {
  const [searchTeam, setSearchTeam] = useState("");
  const [patients, setPatients] = useState([])
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

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
    getPatients()
  }, [])

  const SearchFilterData = patients.filter((item) =>(
    item.name.toLowerCase().includes(searchTeam.toLowerCase())
  ))

   const formatDate = (dateString) =>{
    const options = {year: "numeric", month: "long", day: "numeric"};
    return new Date(dateString).toLocaleDateString(`en-GB`, options);
  }

  return (
    <div className="wrapper patients">
      <div className="content">
        <div className="page-title">
          <h3 className="count">Patients</h3>
          <div className="buttons">
            <Link className="btn">
              <i className="fa-solid fa-plus"></i>Add Patient
            </Link>
          </div>
        </div>

        <div className="container">
          <div className="search-title">
            <h3>All Patients</h3>
            <div className="search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search patient..."
                value={searchTeam}
                onChange={(e) => setSearchTeam(e.target.value)}
              />
            </div>
          </div>

          <div className="table-container">
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {SearchFilterData.map((item) => (
                    <tr key={item.id}>
                      <td><img src={`${apiUrl}/images/${item.photo}` || placeholderImg} alt="" className="image" /></td>
                      <td>{item.name}</td>
                      <td>{item?.age  || "NULL"}</td>
                      <td>{item?.gender  || "NULL"}</td>
                      <td>{item.email}</td>
                      <td>{item?.phone  || "NULL"}</td>
                      <td>{formatDate(item.date)}</td>
                      <td>
                        <div className="buttons">
                          <Link className="btn read">
                            <i className="fa-solid fa-eye"></i>
                          </Link>
                          <Link className="btn edit">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Link>
                          <Link className="btn delete">
                            <i className="fa-solid fa-trash-can"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patients