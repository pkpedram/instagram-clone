let initialState = {
    isLogin: false,
    userData: {},
    userByUserName: {}
}

const userState = (state = initialState, action ) => {
    let {type, payload, params} = action;

    switch (type) {
      
        case 'USER_DATA':
            return {
                ...state,
                isLogin: true,
                userData: payload
            }

        case 'user/' + params?.username: 
            return {
                ...state,
                userByUserName: payload.result
            }    

        default:
            return state
         
    }
}

export default userState