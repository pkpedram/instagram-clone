let initialState = {
    userPosts: [],
    postInfo: {}
};

const postState = (state = initialState, action) => {
  let { type, payload, params } = action;

  switch (type) {

    case `posts/${params?.username}`:
        return {
            ...state,
            userPosts: payload.result
        }

    default:
      return state;
  }
};

export default postState;
