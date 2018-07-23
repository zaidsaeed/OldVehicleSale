import { ADD_BOOKMARK, DELETE_BOOKMARK, GET_BOOKMARKS } from "../actions/types";
const initialState = {
  bookmarks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: [action.payload, ...state.bookmarks]
      };
    case DELETE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          bookmark => bookmark._id !== action.id
        )
      };
    case GET_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.payload
      };
    default:
      return state;
  }
}
