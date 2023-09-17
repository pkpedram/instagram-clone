import axios from "axios"
import _dataManager from "../../dataManager"
import { ApiConfig } from "../../constants"
import { toast } from "react-toastify";

const userActions = {

    checkUserLogin: () => async dispatch => {
        if(localStorage.getItem('access') && localStorage.getItem('userData')){
            await dispatch({type: 'USER_DATA', payload: JSON.parse(localStorage.getItem('userData'))})
        }
    },

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
                window.localStorage.setItem('userData', JSON.stringify(res.data.userData))
                window.localStorage.setItem('access', res.data.token)
                // window.location.replace('/editProfile')
            }
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
    },
    editProfile: (data, file) => async dispatch => {
        try {

            let formData = new FormData()
            if(file){
                formData.append('avatar', file)
            }
            let keys = Object.keys(data)

            keys.map(item => formData.append(item, data[item]))

            let res = await axios.put(ApiConfig.baseUrl + '/editProfile', formData, {headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              }})

            if(res.data){
                console.log(res.data)
                localStorage.setItem('userData', JSON.stringify(res.data.result))
                window.location.href = '/'
            }  

        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)

        }
    }
}

export default userActions