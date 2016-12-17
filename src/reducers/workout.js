'use strict';

export default (state = {}, action) => {
  switch (action.type) {
    case 'WORKOUT_PAGE_LOADED':
      return {
        ...state,
        workout: action.payload[0].workout,
        comments: action.payload[1].comments
      };
      break;
    case 'WORKOUT_PAGE_UNLOADED':
      return {};
    case 'ADD_COMMENT':
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error ?
          null :
          (state.comments || []).concat([action.payload.comment])
      };
    case 'DELETE_COMMENT':
      const commentId = action.commentId
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== commentId)
      };
  }

  return state;
};
