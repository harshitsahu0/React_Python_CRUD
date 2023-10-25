import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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



  const validation = () => {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    var pattern = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
    if (firstName.length === 0) {
      alert("please enter your First name");
      setIsValid(false);
      return false
    }
    if (lastName.length === 0) {
      alert("please enter your Last name");
      setIsValid(false);
      return false
    }
    if (!emailRegex.test(Email)) {
      alert("Please enter a valid email");
      setIsValid(false);
      return false
    }
    if (Email.length === 0) {
      alert("Please enter a email");
      setIsValid(false);
      return false
    }
    if (!pattern.test(Phnum)) {
      alert("please enter valid number");
      setIsValid(false);
      return false
    }
    if (Phnum.length !== 10 || Phnum.length === 0) {
      alert("number should be of 10 digits");
      setIsValid(false);
      return false
    }
    if(hireDate.length==0){
      alert("please enter your date of birth");
      setIsValid(false);
      return false
    }
    // setIsValid(true);
    return true;
  }


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
        swal("successfull!", "Your details updated!", "success");
      });
      setUpdate(false);
    document.getElementById("subBtn").innerHTML = "Submit";
    document.getElementById("Rgstr").innerHTML = "Register";
  };

  const handleSubmit = () => {
    const valid = validation();
    if (update) {
      if(valid){
        handleUpdate();
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhnum("");
        setHireDate("");
      }
    } else {
      if(valid){
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
            swal("successfull!", "Your details Submited!", "success");
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
        swal("successfull!", "Your details deleted!", "success");
        axios
          .delete(`http://127.0.0.1:8000/api/employees/${id}/`)
          .then((res) => {
            console.log(res);
            getEmployeesData();
          });
      } else {
        swal("Your Data is safe!");
      }
    });
  };

  return (
    <div className="MainEmply ">
      {/* <marquee behavior="alternate" direction="Right"> */}
        <h1 className="cmpName">WELCOME TO {cmpName.toUpperCase()}</h1>
      {/* </marquee> */}
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
              style={{marginLeft:"-20px"}}
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
          <button id="subBtn" onClick={handleSubmit}>
            submit
          </button>
        </div>
      </div>

{/* <div className="RegFrom col-lg-4">
        <table className="EmpTbl">
          <tbody>
            <tr>
              <th colSpan={2} id="th">
                Register
              </th>
            </tr>
            <tr>
              <td>
                <h5> First Name:</h5>
              </td>
              <td>
                <input
                  type="text"
                  id="first_name"
                  placeholder="Enter company_Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <h5>Last Name:</h5>
              </td>
              <td>
                <input
                  type="text"
                  id="last_name"
                  placeholder="company description"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <h5>Email :</h5>
              </td>
              <td>
                <input
                  type="text"
                  id="last_name"
                  placeholder="company description"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <h5>Phone No. :</h5>
              </td>
              <td>
                <input
                  type="number"
                  id="last_name"
                  placeholder="company description"
                  value={Phnum}
                  onChange={(e) => setPhnum(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <h5>Hire Date :</h5>
              </td>
              <td>
                <input
                  type="date"
                  id="Dob"
                  placeholder="Enter Your Date of birth"
                  value={hireDate}
                  onChange={(e) => setHireDate(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button id="SubBtn" onClick={handleSubmit}>
          Submit
        </button>
      </div> */}



      <div className="EmpDataTbl col-lg-10">
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th scope="col">S.N0.</th>
              <th scope="col">Fisrt Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Hire Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {emplyData.map((item, i) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{i + 1}</th>
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
      </div>
    </div>
  );
}

export default Employee;
