import axios from "axios";
import swal from "sweetalert";
export const GET_EMP_DATA = "GET_EMP_DATA";

export const getEmpRes = (data) =>{
    return {
        type: GET_EMP_DATA,
        apiData: data
    }
}

export const getEmpData = (cmpId) =>{
    return (dispatch) =>{
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/companiesemp/${cmpId}/`).then((res)=>{
            dispatch(getEmpRes(res.data));
        })
    }
}

export const AddEmpData = (payload,id) =>{
    return (dispatch)=>{
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/employees/`,payload).then((res)=>{
            dispatch(getEmpData(id));
            swal({
                title: "successfull",
                text: "Your details Submited!",
                icon: "success",
                timer: 2000,
                buttons: false,
              });
        })
    }
}

export const updateEmpData = (payload,empId,id) =>{
    return (dispatch)=>{
        axios.put(`${process.env.REACT_APP_BASE_URL}/api/employees/${empId}/`,payload).then((res)=>{
            dispatch(getEmpData(id));
            swal({
                title: "Updated",
                text: "Your details updated!",
                icon: "success",
                timer: 2000,
                buttons: false,
              });
        })
    }
}

export const deleteEmpData = (empid,id) =>{
    return (dispatch)=>{
        axios.delete(`${process.env.REACT_APP_BASE_URL}/api/employees/${empid}/`).then((res)=>{
            dispatch(getEmpData(id));
        })
    }
}
