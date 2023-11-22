import { GET_API_DATA } from "../Actions/Company_Action";

const initialState = {
    dataList : null
}

const getApiReducer = (state=initialState,action) =>{
    switch(action.type){
        case GET_API_DATA :
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

export default getApiReducer