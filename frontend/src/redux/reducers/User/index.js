let initialState = {
    isLogin: false,
    userData: {}
}

const userState = (state = initialState, action ) => {
    let {type, payload, params} = action;

    switch (type) {
      
        default:
            return state
         
    }
}

export default userState