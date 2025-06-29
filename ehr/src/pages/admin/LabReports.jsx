import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AddLabReports from '../../components/AddLabReports'
import { useGlobal } from '../../components/GlobalContext'

const LabReports = () => {
  const [searchTeam, setSearchTeam] = useState("");
  const [addReports, setAddReports] = useState(null)
  const {labReports} = useGlobal()
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const closeAddReports = () => setAddReports(false)
  const showAddReports = () => setAddReports(!addReports)

  const SearchFilterData = labReports.filter((item) =>(
    item.name.toLowerCase().includes(searchTeam.toLowerCase())
  ))

    const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(`en-GB`, options);
  };

  return (
    <>
        <div className="wrapper lab-reports">
      <div className="content">
        <div className="page-title">
          <h3 className="count">Lab Reports</h3>
          <div className="buttons">
            <Link className="btn" onClick={showAddReports}>
              <i className="fa-solid fa-plus"></i>Add Lab Report
            </Link>
          </div>
        </div>

        <div className="container">
          <div className="search-title">
            <h3>All Reports</h3>
            <div className="search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search doctor..."
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
                    <th>Test_Name</th>
                    <th>Results</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {SearchFilterData.map((item) => (
                    <tr key={item.lab_id}>
                      <td><img src={`${apiUrl}/images/${item.photo}`} alt="" className="image" /></td>
                      <td>{item.name}</td>
                      <td>{item.test_name}</td>
                      <td>{item.results}</td>
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
    {addReports && <AddLabReports  onClose={closeAddReports}/>}
    </>

  );
}

export default LabReports