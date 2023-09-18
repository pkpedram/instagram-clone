import axios from "axios"
import { ApiConfig } from "../../constants"
import { toast } from "react-toastify"
import _dataManager from "../../dataManager"

const postActions = {
    addPost: (data = {}, images = [], videos = []) => async dispatch => {
        try {
            let postRes = await axios.post(ApiConfig.baseUrl + '/post', data, 
            {headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              }}
            )

            if(postRes.data){
                await images.map(async image => {
                    try {

                        let formData = new FormData()
                        formData.append('relatedPost', postRes.data.result._id)
                        formData.append('image', image)

                        let imageRes = await axios.post(ApiConfig.baseUrl + '/post/image',
                            formData,
                            {headers: {
                                Authorization: `Bearer ${localStorage.getItem("access")}`,
                              }}

                        )

                        if(imageRes.data){

                        }
                        
                    } catch (error) {
                        console.log(error)
                        toast.error(error.response.data.message)
                    }
                })

                await videos.map(async video => {
                    try {

                        let formData = new FormData()
                        formData.append('relatedPost', postRes.data.result._id)
                        formData.append('video', video)

                        let videoRes = await axios.post(ApiConfig.baseUrl + '/post/video',
                            formData,
                            {headers: {
                                Authorization: `Bearer ${localStorage.getItem("access")}`,
                              }}

                        )

                        if(videoRes.data){
                            
                        }
                        
                    } catch (error) {
                        console.log(error)
                        toast.error(error.response.data.message)
                    }
                })
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    },

    getUserPosts: (username = '',data = {}, params = {}) => async dispatch => {
        await _dataManager.get(`posts/${username}`, data, {dispatch, params: params}, {username: username})
    },
    getPostInfo: (id = '') => async dispatch => {
        await _dataManager.get(`post/${id}`, {}, {dispatch}, {id: id})
    }
}

export default postActions