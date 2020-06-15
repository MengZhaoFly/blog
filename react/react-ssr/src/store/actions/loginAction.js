import * as types from '../constants'
export const getLoginInfo = () => {
  return (dispatch, getState, axiosInstance) => {
    // axiosInstance 即是 请求时候的主体 [ 客户端 | 服务端 ]
    return axiosInstance.get('/islogin')
    .then(res => {
      console.log('islogin res', res.data);
      if (res.data) {
        dispatch({
          type: types.LOGIN_STATUS,
          value: res.data.islogin
        })
      } 
    })
  }
}


export const login = () => {
  return (dispatch, getState, axiosInstance) => {
    // axiosInstance 即是 请求时候的主体 [ 客户端 | 服务端 ]
    return axiosInstance.get('/login')
    .then(res => {
        dispatch({
          type: types.LOGIN_STATUS,
          value: true
        })
    })
  }
}
export const logout = () => {
  return (dispatch, getState, axiosInstance) => {
    // axiosInstance 即是 请求时候的主体 [ 客户端 | 服务端 ]
    return axiosInstance.get('/logout')
    .then(res => {
      dispatch({
        type: types.LOGIN_STATUS,
        value: false
      })
    })
  }
}