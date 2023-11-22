import { GET_EMP_DATA } from "../Actions/Employee_Action";

const initialState = {
    dataList : null
}

const getEmpApiReducer = (state=initialState,action) =>{
    switch(action.type){
        case GET_EMP_DATA : 
            return{
                ...state,
                dataList: action.apiData
            }
        default : 
            return{
                state
            }    
    }
}

export default getEmpApiReducer