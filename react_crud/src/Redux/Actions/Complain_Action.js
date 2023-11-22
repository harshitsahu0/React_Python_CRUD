import axios from "axios";
import swal from "sweetalert";
export const GET_EMP_CMPLN = "GET_EMP_CMPLN";

export  const getEmpCmplnRes = (data) =>{
    return {
        type : GET_EMP_CMPLN,
        apiData : data
    }
}

export const getCmplnApiData = (id) =>{
    return (dispatch)=>{
        dispatch(postRes(null));
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/empcomplains/${id}/`).then((res)=>{
            dispatch(getEmpCmplnRes(res.data))
        })
    }
}

export const postRes = (data) =>{
    return {
        type : "POST_RES",
        value : data
    }
}

export const postCmplnApiData = (payload) =>{
    return (dispatch)=>{
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/complains/`,payload).then((res)=>{
            swal({
                title: "successfull",
                text: "Your Complain added!",
                icon: "success",
                timer: 2000,
                buttons: false,
              });
              dispatch(postRes(true));
        })
    }
}

export const deleteCmplnApi = (delId,id) =>{
    return (dispatch)=>{
        axios.delete(`${process.env.REACT_APP_BASE_URL}/api/complains/${delId}/`).then((res)=>{
            dispatch(getCmplnApiData(id))
        })
    }
}