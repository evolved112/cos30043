export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuth(state) {
    console.log(state);
    return !!state.token;
  }
};