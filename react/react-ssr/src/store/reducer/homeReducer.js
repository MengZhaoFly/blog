import { HOME_CHANGE_COMMENT_LIST } from '../constants';

const defaultState = {
	commentList: []
}

export default (state = defaultState, action) => {
	switch(action.type) {
		case HOME_CHANGE_COMMENT_LIST:
      const { commentList } = action;
			return {
        ...state,
        commentList
      }
		default:
			return state;
	}
}