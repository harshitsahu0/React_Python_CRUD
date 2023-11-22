import React, { useEffect, useState } from 'react'
import { getEmpData } from '../../Redux/Actions/Employee_Action';
import { useDispatch, useSelector } from 'react-redux';
import { postCmplnApiData } from '../../Redux/Actions/Complain_Action';

const AddCmplnBtn = (props) => {
    const [cmpSelected, setCmpSelected] = useState("");
    const [empSelected, setEmpSelected] = useState("");
    const [complainTitle, setComplainTitle] = useState("");
    const [complainDescription, setcomplainDescription] = useState("");
    const [complainemail, setComplainemail] = useState("");

    const [employeeoptionsData, setEmployeeoptionsData] = useState([]);


    const dispatch = useDispatch();
    const empOptdata = useSelector((state) => state.getEmpApiReducer.dataList);
    const postRes = useSelector((state) => state.getEmpCmplnApiReducer.postData);



    const handleCpmSlt = (e) => {
        setCmpSelected(e.target.value);
        const cmpId = JSON.parse(e.target.value);
        console.log(cmpId);
        // axios
        //   .get(`http://127.0.0.1:8000/api/companiesemp/${cmpId}/`)
        //   .then((res) => {
        //     console.log(res.data);
        //     setEmployeeoptionsData(res.data);
        //   });
        dispatch(getEmpData(cmpId));
        setCmpSelected(cmpId);
    };

    const postComplain = () => {
        const formData = new FormData();
        formData.append("title", complainTitle);
        formData.append("discriptions", complainDescription);
        formData.append("email", complainemail);
        formData.append("company", cmpSelected);
        formData.append("employee", empSelected);
        // axios.post("http://127.0.0.1:8000/api/complains/",formData).then((res)=>{
        //   swal({
        //     title: "successfull",
        //     text: "Your Complain added!",
        //     icon: "success",
        //     timer: 2000,
        //     buttons: false,
        //   });
        //   console.log(res.data);
        // })
        dispatch(postCmplnApiData(formData));
    };

    useEffect(() => {
        if (postRes) {
            setComplainemail("");
            setcomplainDescription("");
            setComplainTitle("");
            setEmpSelected("");
            setCmpSelected("");
        }
    }, [postRes]);

    useEffect(() => {
        if (empOptdata !== undefined) {
            setEmployeeoptionsData(empOptdata);
        }
    }, [empOptdata])

    return (
        <>
            <button
                type="button"
                className="addBtn addCmpBtn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal2"
            >
                Add Complain
            </button>

            <div
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
                                        {props.data.map((option) => (
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
            </div>
        </>
    )
}

export default AddCmplnBtn
