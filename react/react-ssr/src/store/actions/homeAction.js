import axios from 'axios';
import { HOME_CHANGE_COMMENT_LIST } from '../constants';

const commentListActionCreate = (commentList) => ({
  type: HOME_CHANGE_COMMENT_LIST,
  commentList
})
export const getCommentList = function() {
  // browser
  // /api/comment === localhost:3000/api/comment
  // server
  // api/  === 服务器/api
  return (dispatch, getState, axiosInstance) => {
    // axiosInstance 即是 请求时候的主体 [ 客户端 | 服务端 ]
    return axiosInstance.get('/comment')
    .then(res => {
      // console.log('res', res);
      const commentList = res.data.list;
      dispatch(commentListActionCreate(commentList));
    })
  }
}