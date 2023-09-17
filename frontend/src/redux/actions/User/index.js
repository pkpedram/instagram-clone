import axios from "axios"
import _dataManager from "../../dataManager"
import { ApiConfig } from "../../constants"
import { toast } from "react-toastify";

const userActions = {
    login: (data) => async dispatch => {
        try {
            let res = await axios.post(ApiConfig.baseUrl + '/login', data);
            if(res.data){
                console.log(res.data)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
        }
    },
    signUp: (data) => async dispatch => {
        try {
            let res = await axios.post(ApiConfig.baseUrl + '/register', data)
            if(res.data){
                console.log(res.data)
            }
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
    }
}

export default userActions