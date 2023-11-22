import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getApiData,
  postApiFun,
  updateCompanyApi,
} from "../../Redux/Actions/Company_Action";
import { getEmpData } from "../../Redux/Actions/Employee_Action";
import { postCmplnApiData } from "../../Redux/Actions/Complain_Action";
import AddCmplnBtn from "../AddComplainBtn/AddCmplnBtn";

const NavBar = () => {
  const [comName, setComName] = useState("");
  const [ComDescription, setComDescription] = useState("");
  const [foundDate, setFoundDate] = useState("");
  const [headLocation, setHeadLocation] = useState("");
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState([]);
  const [isValid, setIsValid] = useState(false);

  const [cmpSelected, setCmpSelected] = useState("");
  const [empSelected, setEmpSelected] = useState("");
  const [complainTitle, setComplainTitle] = useState("");
  const [complainDescription, setcomplainDescription] = useState("");
  const [complainemail, setComplainemail] = useState("");

  const [employeeoptionsData, setEmployeeoptionsData] = useState([]);

  const [searchRst, setSearchRst] = useState([]);
  const [srchState, setSrchState] = useState(false);
  const [totalSrchRst, setTotalSrchRst] = useState();
  const dispatch = useDispatch();
  const ApiData = useSelector((state) => state.getApiReducer.dataList);
  const empOptdata = useSelector((state) => state.getEmpApiReducer.dataList);
  const postRes = useSelector((state) => state.getEmpCmplnApiReducer.postData);

  // const handleCpmSlt = (e) => {
  //   setCmpSelected(e.target.value);
  //   const cmpId = JSON.parse(e.target.value);
  //   console.log(cmpId);
  //   // axios
  //   //   .get(`http://127.0.0.1:8000/api/companiesemp/${cmpId}/`)
  //   //   .then((res) => {
  //   //     console.log(res.data);
  //   //     setEmployeeoptionsData(res.data);
  //   //   });
  //   dispatch(getEmpData(cmpId));
  //   setCmpSelected(cmpId);
  // };

  // const postComplain = () => {
  //   const formData = new FormData();
  //   formData.append("title", complainTitle);
  //   formData.append("discriptions", complainDescription);
  //   formData.append("email", complainemail);
  //   formData.append("company", cmpSelected);
  //   formData.append("employee", empSelected);
  //   // axios.post("http://127.0.0.1:8000/api/complains/",formData).then((res)=>{
  //   //   swal({
  //   //     title: "successfull",
  //   //     text: "Your Complain added!",
  //   //     icon: "success",
  //   //     timer: 2000,
  //   //     buttons: false,
  //   //   });
  //   //   console.log(res.data);
  //   // })
  //   dispatch(postCmplnApiData(formData));
  // };

  const validation = () => {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    var pattern = new RegExp(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
    );
    const newObj = {};
    if (comName.length === 0) {
      alert("please enter company name");
      setIsValid(false);
      return false;
    }
    if (ComDescription.length === 0) {
      alert("Please enter Company's Description");
      setIsValid(false);
      return false;
    }
    if (foundDate.length == 0) {
      alert("please enter company's founded date");
      setIsValid(false);
      return false;
    }
    if (headLocation.length == 0) {
      alert("please enter company's Headquarter's");
      setIsValid(false);
      return false;
    }
    return true;
  };

  // const getData = () => {
  //   axios.get("http://127.0.0.1:8000/api/companies/").then((res) => {
  //     const sortData = res.data.sort((a,b)=>{
  //       const nameA = a.name.toUpperCase();
  //       const nameB = b.name.toUpperCase();
  //       if (nameA < nameB) {
  //         return -1;
  //       }
  //       if (nameA > nameB) {
  //         return 1;
  //       }
  //       return 0;
  //     })
  //     setData(sortData);
  //   });
  // };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("name", comName);
    formData.append("description", ComDescription);
    formData.append("founded_date", foundDate);
    formData.append("headquarters_location", headLocation);
    // axios
    //   .put(`http://127.0.0.1:8000/api/companies/${id}/`, formData)
    //   .then((res) => {
    //     console.log(res);
    //     swal({
    //       title: "successfull",
    //       text: "Your details updated!",
    //       icon: "success",
    //       timer: 2000,
    //       buttons: false,
    //     });
    //     getData();
    //   });
    dispatch(updateCompanyApi(id, formData));
    console.log("id :", id);
    console.log("hit");
    const submitBtn = document.getElementById("createBtn");
    submitBtn.innerHTML = "Submit";
  };

  const handleUpdateState = (name, des, date, loc, id) => {
    setComName(name);
    setComDescription(des);
    setFoundDate(date);
    setHeadLocation(loc);
    const submitBtn = document.getElementById("createBtn");
    submitBtn.innerHTML = "Update";
    setUpdate(true);
    setId(id);
  };

  // useEffect(() => {
  //   if (postRes) {
  //     setComplainemail("");
  //     setcomplainDescription("");
  //     setComplainTitle("");
  //     setEmpSelected("");
  //     setCmpSelected("");
  //   }
  // }, [postRes]);

  useEffect(() => {
    dispatch(getApiData());
  }, []);

  useEffect(() => {
    if (ApiData !== undefined) {
      const sortData = ApiData.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setData(sortData);
    }

    if (empOptdata !== undefined) {
      setEmployeeoptionsData(empOptdata);
    }
  }, [ApiData, empOptdata]);

  const handleFromSubmit = () => {
    if (update) {
      console.log("id in submit function : ", id);
      handleUpdate();
      setComName("");
      setComDescription("");
      setFoundDate("");
      setHeadLocation("");
    } else {
      const valid = validation();
      if (valid) {
        const formData = new FormData();
        formData.append("name", comName);
        formData.append("description", ComDescription);
        formData.append("founded_date", foundDate);
        formData.append("headquarters_location", headLocation);
        // axios
        //   .post("http://127.0.0.1:8000/api/companies/", formData)
        //   .then((res) => {
        //     swal({
        //       title: "successfull",
        //       text: "Your details Submited!",
        //       icon: "success",
        //       timer: 2000,
        //       buttons: false,
        //     });
        //     getData();
        //   });
        dispatch(postApiFun(formData));
        setComName("");
        setComDescription("");
        setFoundDate("");
        setHeadLocation("");
      }
    }
  };

  const handleClose = () => {
    setComName("");
    setComDescription("");
    setFoundDate("");
    setHeadLocation("");
    const submitBtn = document.getElementById("createBtn");
    submitBtn.innerHTML = "Submit";
    setUpdate(false);
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg "
        style={{ backgroundColor: "cadetblue" }}
      >
        <div className="container-fluid">
          <h3 id="welTxt">Welcome to Companies Dashboard </h3>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form className="d-flex">
              <button
                type="button"
                className="addBtn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add Company
              </button>
              {/* <button
                type="button"
                className="addBtn addCmpBtn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal2"
              >
                Add Complain
              </button> */}
              <AddCmplnBtn data={data}/>
            </form>
          </div>
        </div>
      </nav>
      <DataTable
        data={data}
        searchRst={searchRst}
        srchState={srchState}
        totalSrchRst={totalSrchRst}
        handleUpdateState={handleUpdateState}
      />
      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <h3 style={{ paddingTop: "20px" }}>Company</h3>

            <div className="modal-body">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <h5>Company Name:</h5>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="first_name"
                        placeholder="Enter company_Name"
                        value={comName}
                        onChange={(e) => setComName(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h5>Description:</h5>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="last_name"
                        placeholder="company description"
                        value={ComDescription}
                        onChange={(e) => setComDescription(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h5>Founded_date :</h5>
                    </td>
                    <td>
                      <input
                        type="date"
                        id="Dob"
                        placeholder="Enter Your Date of birth"
                        value={foundDate}
                        onChange={(e) => setFoundDate(e.target.value)}
                        style={{ width: "190px" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h5>Headquarters_location:</h5>
                    </td>
                    <td>
                      <select
                        name="Country"
                        id="Country"
                        value={headLocation}
                        onChange={(e) => setHeadLocation(e.target.value)}
                        style={{ width: "190px" }}
                      >
                        <option value="" defaultValue disabled>
                          select Location
                        </option>
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
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                id="createBtn"
                className="btn btn-info"
                data-bs-dismiss="modal"
                onClick={handleFromSubmit}
                style={{ color: "white" }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog addCmpMdl">
          <div className="modal-content">
            <br />
            <h3 style={{ color: "" }}>AddComplain</h3>
            <div className="modal-body">
              <form className="containerr">
                <div className="mb-3">
                  <label htmlFor="companySelect" className="form-label">
                    Company
                  </label>
                  <select
                    className="select"
                    value={cmpSelected}
                    onChange={handleCpmSlt}
                    id="companySelect"
                  >
                    <option value="">Select company</option>
                    {data.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="employeeSelect" className="form-label">
                    Employee
                  </label>
                  <select
                    className="select"
                    value={empSelected}
                    onChange={(e) => setEmpSelected(e.target.value)}
                    id="employeeSelect"
                  >
                    <option value="" disabled>
                      Select Employee
                    </option>
                    {employeeoptionsData.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.first_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={complainTitle}
                    onChange={(e) => setComplainTitle(e.target.value)}
                    placeholder="Enter Description"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={complainDescription}
                    onChange={(e) => setcomplainDescription(e.target.value)}
                    placeholder="Enter Description"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={complainemail}
                    onChange={(e) => setComplainemail(e.target.value)}
                    placeholder="Enter FoundedDate"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <center>
                <button
                  type="button"
                  onClick={postComplain}
                  className="btn btn-secondary addComplain"
                  data-bs-dismiss="modal"
                >
                  AddComplain
                </button>
              </center>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default NavBar;
