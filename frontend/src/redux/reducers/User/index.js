let initialState = {
    isLogin: false,
    userData: {}
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

        default:
            return state
         
    }
}

export default userState