import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EditOutlined, DeleteOutlined, EditFilled, DeleteFilled } from "@ant-design/icons";
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


  const [errors, setErrors] = useState({});

  const validation = () => {
    let isValid = true;
    const newErrors = {};
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    var pattern = new RegExp(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
    );
    if(firstName.length===0&&lastName.length === 0&&Email.length === 0&&Phnum.length === 0&&hireDate.length == 0){
      newErrors.default = "All the field * required";
      isValid =false;
    }else{

      if (firstName.length === 0) {
        newErrors.firstName = "first name required*";
        setIsValid(false);
        isValid= false;
      }
      if (lastName.length === 0) {
        newErrors.lastName = "last name required*";
        setIsValid(false);
        isValid= false;
      }
      if (!emailRegex.test(Email)) {
        newErrors.email = "Invalid email address*";
        setIsValid(false);
        isValid= false;
      }
      if (Email.length === 0) {
        newErrors.email = "email required*";
        setIsValid(false);
        isValid= false;
      }
      if (!pattern.test(Phnum)) {
        newErrors.Phnum = "Invalid number*";
        setIsValid(false);
        isValid= false;
      }
      if (Phnum.length !== 10 || Phnum.length === 0) {
        newErrors.Phnum = "only 10 digits required*";
        setIsValid(false);
        isValid= false;
      }
      if (hireDate.length == 0) {
        newErrors.hireDate = "hire date required*";
        setIsValid(false);
        isValid= false;
      }
      console.log("newErrors :",newErrors);
    }
    setErrors(newErrors);
    return isValid;
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
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhnum("");
    setHireDate("");
  };

  const handleSubmit = () => {
    const valid = validation();
    if (update) {
      if (valid) {
        handleUpdate();
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

  const pagesToShow = 2;
  const pageNumbers = getPageNumbers();

  const visiblePageNumbers = pageNumbers.filter(
    (pageNumber) =>
      pageNumber >= current - pagesToShow && pageNumber <= current + pagesToShow
  );

  return (
    <div className="MainEmply ">
      <h1 className="cmpName">WELCOME TO {cmpName.toUpperCase()}</h1>
      <div className="col-lg-6 mainRegForm">
        <div className=" row container-fluid rowDiv">
          <h1 id="Rgstr">Register</h1>
          <div className="col-lg-6 leftDiv">
            <label htmlFor="first_name" className="label">
              First Name<span className="text-danger">*</span> :{" "}
            </label>
            <input
              type="text"
              className="inptfld"
              placeholder="Enter your First Name..."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <p className="altP" style={{marginLeft:"83px"}}>{errors.firstName}</p>
            <label htmlFor="last_name" className="label">
              Email<span className="text-danger">*</span> :{" "}
            </label>
            <input
              type="email"
              placeholder="Enter your Email..."
              style={{ marginLeft: "50px" }}
              className="inptfld"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="altP" style={{marginLeft:"33px"}}>{errors.email}</p>
            <label htmlFor="" className="label" style={{ float: "left" }}>
              Hire Date<span className="text-danger">*</span> :
            </label>
            <input
              type="date"
              className="inptfld"
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
              style={{ marginLeft: "10px",width:"185px" }}
            />
            <p className="altP" style={{marginLeft:"55px"}}>{errors.hireDate}</p>
          </div>
          <div className="col-lg-6 rightDiv">
            <label htmlFor="" className="label">
              Last Name<span className="text-danger">*</span> :{" "}
            </label>
            <input
              type="text"
              className="inptfld"
              placeholder="Enter your Last Name..."
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <p className="altP" style={{marginLeft:"80px"}}>{errors.lastName}</p>
            <label htmlFor="" className="label">
              Phone No.<span className="text-danger">*</span> :{" "}
            </label>
            <input
              type="text"
              className="inptfld"
              placeholder="Enter your First Name..."
              value={Phnum}
              onChange={(e) => setPhnum(e.target.value)}
            />
            <p className="altP" style={{marginLeft:"88px"}}>{errors.Phnum}</p>
            <p className="altP" >{errors.default}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={handleBack} id="BckBtn">
              Go Back
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
            <table className="table">
              <thead>
                <tr className="tHead">
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
                    <tr key={item.id} className="tbRw">
                      <th scope="row">{itemIndex}</th>
                      <td>
                        {" "}
                        <Link id="lnk" to={`/empComplain/${item.id}/${item.first_name}`}>
                        {item.first_name}
                        </Link>
                      </td>
                      <td>{item.last_name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.hire_date}</td>
                      <td>
                        <Space wrap>
                            <EditFilled onClick={() => handleEdit(item.id)} id="updateBtn"/>
                            <DeleteFilled onClick={() => handleDeleteEmp(item.id)} id="deleteBtn"/>
                        </Space>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* <div className="pagination">
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
            </div> */}
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
                {current > pagesToShow + 1 && (
                  <>
                    <button onClick={() => setCurrent(1)}>1</button>
                    {current > pagesToShow + 2 && <span>...</span>}
                  </>
                )}
                {visiblePageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={pageNumber === current ? "active" : ""}
                    onClick={() => setCurrent(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
                {current < totalPages - pagesToShow && (
                  <>
                    {current < totalPages - pagesToShow - 1 && <span>...</span>}
                    <button onClick={() => setCurrent(totalPages)}>
                      {totalPages}
                    </button>
                  </>
                )}
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
