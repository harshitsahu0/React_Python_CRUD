import React, { useEffect, useState } from 'react'
import DataTable from '../DataTable/DataTable';
import "./NavBar.css";
import axios from 'axios';
import swal from 'sweetalert';

const NavBar = () => {
    const [comName, setComName] = useState("");
    const [ComDescription, setComDescription] = useState("");
    const [foundDate, setFoundDate] = useState("");
    const [headLocation, setHeadLocation] = useState("");
    const [update, setUpdate] = useState(false);
    const [id, setId] = useState();
    const [data, setData] = useState([]);

    const getData = () => {
        axios.get('http://127.0.0.1:8000/api/companies/').then((res) => {
            setData(res.data);
        })
    }

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("name", comName);
        formData.append("description", ComDescription);
        formData.append("founded_date", foundDate);
        formData.append("headquarters_location", headLocation);
        axios.put(`http://127.0.0.1:8000/api/companies/${id}/`, formData).then((res) => {
            console.log(res);
            swal("successfull!", "Your details updated!", "success");
            getData();
        })
        console.log("id :", id);
        console.log("hit");
        const submitBtn = document.getElementById("createBtn");
        submitBtn.innerHTML = "Submit";
    }

    const handleUpdateState = (name, des, date, loc, id) => {
        setComName(name);
        setComDescription(des);
        setFoundDate(date);
        setHeadLocation(loc);
        const submitBtn = document.getElementById("createBtn");
        submitBtn.innerHTML = "Update";
        setUpdate(true);
        setId(id);
    }

    useEffect(() => {
        getData();
    }, [])

    const handleFromSubmit = () => {
        if (update) {
            console.log("id in submit function : ", id);
            handleUpdate()
            setComName("");
            setComDescription("");
            setFoundDate("");
            setHeadLocation("");
        } else {
            const formData = new FormData();
            formData.append("name", comName);
            formData.append("description", ComDescription);
            formData.append("founded_date", foundDate);
            formData.append("headquarters_location", headLocation);
            axios.post("http://127.0.0.1:8000/api/companies/", formData).then((res) => {
                swal("successfull!", "Your details Submited!", "success");
                getData();
            })
            setComName("");
            setComDescription("");
            setFoundDate("");
            setHeadLocation("");
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
                <div className="container-fluid">
                    <h3>CRUD Operation</h3>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>
                        <form className="d-flex">
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add Company
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
            <DataTable data={data} getData={getData} handleUpdateState={handleUpdateState} />
            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <h5> Company Name:</h5>
                                        </td>
                                        <td><input type="text" id="first_name" placeholder="Enter company_Name" value={comName} onChange={(e) => setComName(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h5>description:</h5>
                                        </td>
                                        <td><input type="text" id="last_name" placeholder="company description" value={ComDescription} onChange={(e) => setComDescription(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h5>founded_date :</h5>
                                        </td>
                                        <td>
                                            <input type="date" id="Dob" placeholder="Enter Your Date of birth" value={foundDate} onChange={(e) => setFoundDate(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h5>headquarters_location:</h5>
                                        </td>
                                        <td>
                                            <select name="Country" id="Country" value={headLocation} onChange={(e) => setHeadLocation(e.target.value)}>
                                                <option value="" defaultValue disabled>select Location</option>
                                                <option value="Indore">Indore</option>
                                                <option value="Bhopal">Bhopal</option>
                                                <option value="Pune">Pune</option>
                                                <option value="Bangalore">Bangalore</option>
                                                <option value="Mumbai">Mumbai</option>
                                                <option value="Hyderabad">Hyderabad</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" id='createBtn' className="btn btn-primary" data-bs-dismiss="modal" onClick={handleFromSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar
