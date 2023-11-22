import axios from "axios";
import swal from "sweetalert";

export const GET_API_DATA = "GET_API_DATA";

export const getApiRes = (data) => {
    return {
        type: GET_API_DATA,
        apiData: data
    }
}

export const getApiData = () => {
   return (dispatch) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/companies/`).then((res) => {
            dispatch(getApiRes(res.data))
        })
    }
}


export const postApiFun = (payload) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/companies/`, payload).then((res) => {
            dispatch(getApiData())
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

export const updateCompanyApi = (id, payload) => {
    return (dispatch) => {
        axios.put(`${process.env.REACT_APP_BASE_URL}/api/companies/${id}/`, payload).then((res) => {
            dispatch(getApiData())
            swal({
                title: "successfull",
                text: "Your details updated!",
                icon: "success",
                timer: 2000,
                buttons: false,
            });
        })
    }
}

export const deleteCompanyApi = (id) => {
    return (dispatch) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/api/companies/${id}/`).then((res) => {
            dispatch(getApiData());
        })
    }
}