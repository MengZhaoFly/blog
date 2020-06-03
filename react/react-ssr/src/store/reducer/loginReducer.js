import { LOGIN_STATUS } from '../constants';
const defaultState = {
  islogin: true
}
export default (state = defaultState, action) => {
  
  switch (action.type) {
    case LOGIN_STATUS:
      return {
        ...state,
        islogin: action.value
      };
    default:
      return state
  }
}