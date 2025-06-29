import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useGlobal } from './GlobalContext';
import placeholderImg from "../../assets/img/female_profile_50px.png"

const MyLabResults = () => {
  const [labResults, setLabReports] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const {user} = useGlobal()
  const id = user?.id

    const formatDate = (dateString) =>{
    const options = {year: "numeric", month: "long", day: "numeric"};
    return new Date(dateString).toLocaleDateString(`en-GB`, options);
  }

  const getUserLabResults = async() =>{
    if(!id) return;

    try {
      const res = await axios.get(`${apiUrl}/patientResults/${id}`)
      if(res.data && Array.isArray(res.data.Result)){
        setLabReports(res.data.Result)
        console.log(res.data.Result)
      }else{
        throw new Error("Invalid data formate")
      }
    } catch (error) {
      console.log("Failed to fetch lab results", error)
    }
  }

  useEffect(() =>{
    getUserLabResults()
  }, [id])

  return (
   <div className="wrapper  labReports">
        <div className="content">

                 <div className="page-title">
                    <h3 className="count">My Lab Results</h3>
                </div>

                <div className="container">
                  <div className="search-title">
                      <h3>All Lab Results</h3>
                      <div className="search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                          type="text"
                          placeholder="Search lab results..."
                        />
                      </div>
                    </div>
                     <div className="table-container">
                                <div className="table">
                                  {labResults.length === 0 ? (
                                    <p>No lab results found.</p>
                                  ) : (
                                   <table>
                                    <thead>
                                      <tr>
                                        <th>Photo</th>
                                        <th>Name</th>
                                        <th>Test_Name</th>
                                         <th>Date</th>
                                        <th>Results</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    {labResults.map((item) =>(
                                       <tr key={item.id}>
                                        <td><img src={item.photo ? `${apiUrl}/images/${item.photo}` : placeholderImg} alt="" className='image' /></td>
                                        <td>{item?.name}</td>
                                        <td>{item?.test_name}</td>
                                        <td>{formatDate(item?.date)}</td>
                                        <td>{item?.results}</td>
                                    </tr>
                                    ))}
                                    </tbody>
                                   </table>
                                  )}
                                 
                                </div>
                              </div>
                </div>

        </div>
    </div>
  )
}

export default MyLabResults