import { GET_EMP_CMPLN } from "../Actions/Complain_Action";

const initialState = {
    dataList : null,
    postData : null
}

const getEmpCmplnApiReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_EMP_CMPLN :
            return{
                ...state,
                dataList: action.apiData
            }
        case "POST_RES" :
            return{
                ...state,
                postData: action.value
            }    
        default : 
            return{
                state
            }    
    }
}

export default getEmpCmplnApiReducer