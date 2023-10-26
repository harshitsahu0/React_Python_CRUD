import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Space } from "antd";
import swal from "sweetalert";
import axios from "axios";
import "./Style.css";

function Employee() {
  const { id, cmpName } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phnum, setPhnum] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [emplyData, setEmplyData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [empId, setEmpId] = useState();
  const [isValid, setIsValid] = useState(false);
  const [current, setCurrent] = useState(1);
  const navigate = useNavigate();

  const validation = () => {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    var pattern = new RegExp(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
    );
    if (firstName.length === 0) {
      alert("please enter your First name");
      setIsValid(false);
      return false;
    }
    if (lastName.length === 0) {
      alert("please enter your Last name");
      setIsValid(false);
      return false;
    }
    if (!emailRegex.test(Email)) {
      alert("Please enter a valid email");
      setIsValid(false);
      return false;
    }
    if (Email.length === 0) {
      alert("Please enter a email");
      setIsValid(false);
      return false;
    }
    if (!pattern.test(Phnum)) {
      alert("please enter valid number");
      setIsValid(false);
      return false;
    }
    if (Phnum.length !== 10 || Phnum.length === 0) {
      alert("number should be of 10 digits");
      setIsValid(false);
      return false;
    }
    if (hireDate.length == 0) {
      alert("please enter your date of birth");
      setIsValid(false);
      return false;
    }
    return true;
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", Email);
    formData.append("phone", Phnum);
    formData.append("hire_date", hireDate);
    formData.append("company", JSON.parse(id));
    axios
      .put(`http://127.0.0.1:8000/api/employees/${empId}/`, formData)
      .then((res) => {
        getEmployeesData();
        swal({
          title: "Updated",
          text: "Your details updated!",
          icon: "success",
          timer: 2000,
          buttons: false,
        });
      });
    setUpdate(false);
    document.getElementById("subBtn").innerHTML = "Submit";
    document.getElementById("Rgstr").innerHTML = "Register";
  };

  const handleSubmit = () => {
    const valid = validation();
    if (update) {
      if (valid) {
        handleUpdate();
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhnum("");
        setHireDate("");
      }
    } else {
      if (valid) {
        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", Email);
        formData.append("phone", Phnum);
        formData.append("hire_date", hireDate);
        formData.append("company", JSON.parse(id));
        axios
          .post("http://127.0.0.1:8000/api/employees/", formData)
          .then((res) => {
            console.log(res);
            getEmployeesData();
            swal({
              title: "successfull",
              text: "Your details Submited!",
              icon: "success",
              timer: 2000,
              buttons: false,
            });
          });
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhnum("");
        setHireDate("");
      }
    }
  };

  const getEmployeesData = () => {
    const cmpId = JSON.parse(id);
    axios
      .get(`http://127.0.0.1:8000/api/companiesemp/${cmpId}/`)
      .then((res) => {
        console.log(res.data);
        setEmplyData(res.data);
      });
  };

  const handleEdit = (id) => {
    const updtData = emplyData.filter((item) => item.id == id);
    console.log("updateData : ", updtData[0].first_name);
    setFirstName(updtData[0].first_name);
    setLastName(updtData[0].last_name);
    setEmail(updtData[0].email);
    setPhnum(updtData[0].phone);
    setHireDate(updtData[0].hire_date);
    setEmpId(id);
    document.getElementById("subBtn").innerHTML = "Update";
    setUpdate(true);
    document.getElementById("Rgstr").innerHTML = "Update";
  };

  useEffect(() => {
    getEmployeesData();
  }, []);

  const handleDeleteEmp = (id) => {
    swal({
      title: "Are you sure? ",
      text: "Once deleted, you will not be able to recover this Data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal({
          title: "successfull",
          text: "Your details deleted!",
          icon: "success",
          timer: 2000,
          buttons: false,
        });
        axios
          .delete(`http://127.0.0.1:8000/api/employees/${id}/`)
          .then((res) => {
            console.log(res);
            getEmployeesData();
          });
      } else {
        swal({
          title: "Cancelled",
          text: "Your Data is Safe!",
          icon: "success",
          timer: 2000,
          buttons: false,
        });
      }
    });
  };

  const handleBack = () => {
    navigate("/");
  };

  const itemPerpage = 6;
  const totalItemPerPages = emplyData.length;
  const totalPages = Math.ceil(totalItemPerPages / itemPerpage);

  const getPageNumbers = () => {
    const totalNumPages = []; 
    for(let i=1;i<=totalPages;i++){
      totalNumPages.push(i);
    }
    return totalNumPages;
  };

  return (
    <div className="MainEmply ">
      <h1 className="cmpName">WELCOME TO {cmpName.toUpperCase()}</h1>
      <div className="col-lg-6 mainRegForm">
        <div className=" row container-fluid rowDiv">
          <h1 id="Rgstr">Register</h1>
          <div className="col-lg-6 leftDiv">
            <label htmlFor="first_name" className="label">
              First Name :{" "}
            </label>
            <input
              type="text"
              className="inptfld"
              placeholder="Enter your First Name..."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="last_name" className="label">
              Email :{" "}
            </label>
            <input
              type="email"
              placeholder="Enter your Email..."
              style={{ marginLeft: "60px" }}
              className="inptfld"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="" className="label" style={{ float: "left" }}>
              Hire Date :
            </label>
            <input
              type="date"
              className="inptfld"
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
              style={{ marginLeft: "-20px" }}
            />
          </div>
          <div className="col-lg-6 rightDiv">
            <label htmlFor="" className="label">
              Last Name :{" "}
            </label>
            <input
              type="text"
              className="inptfld"
              placeholder="Enter your Last Name..."
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="" className="label">
              Phone No. :{" "}
            </label>
            <input
              type="text"
              className="inptfld"
              placeholder="Enter your First Name..."
              value={Phnum}
              onChange={(e) => setPhnum(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={handleBack} id="BckBtn">
              GO Back
            </button>
            <button id="subBtn" onClick={handleSubmit}>
              {" "}
              submit
            </button>
          </div>
        </div>
      </div>
      <div className="EmpDataTbl col-lg-10">
        {emplyData.length > 0 ? (
          <>
            <table className="table table-success table-striped">
              <thead>
                <tr>
                  <th scope="col">S.N0.</th>
                  <th scope="col">Fisrt Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone No.</th>
                  <th scope="col">Hire Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {emplyData.slice((current - 1) * itemPerpage, current * itemPerpage).map((item, i) => {
                  const itemIndex = (current - 1) * itemPerpage + i + 1;
                  return (
                    <tr key={item.id}>
                      <th scope="row">{itemIndex}</th>
                      <td> {item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.hire_date}</td>
                      <td>
                        <Space wrap>
                          <button
                            id="updateBtn"
                            onClick={() => handleEdit(item.id)}
                          >
                            <EditOutlined />
                          </button>
                          <button
                            type="primary"
                            id="deleteBtn"
                            onClick={() => handleDeleteEmp(item.id)}
                          >
                            <DeleteOutlined />{" "}
                          </button>
                        </Space>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="pagination">
              {totalPages > 1 && (
                <div className="mainPage">
                  <button
                    onClick={() => setCurrent(current - 1)}
                    className="next-prev-btn"
                    disabled={current === 1}
                  >
                    Previous
                  </button>
                  {getPageNumbers().map((pageNumber) => (
                    <button
                      key={pageNumber}
                      className={pageNumber === current ? "active" : ""}
                      onClick={() => setCurrent(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrent(current + 1)}
                    className="next-prev-btn"
                    disabled={current === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <h3>There are no employees in this company</h3>
        )}
      </div>
    </div>
  );
}

export default Employee;
