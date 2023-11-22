import getApiReducer from "./Company_Reducer";
import getEmpApiReducer from "./Employee_reducer"
import getEmpCmplnApiReducer from "./Complain_Reducer"
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    getApiReducer,
    getEmpApiReducer,
    getEmpCmplnApiReducer
})

export default rootReducer