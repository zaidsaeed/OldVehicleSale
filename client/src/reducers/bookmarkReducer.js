import { ADD_BOOKMARK, DELETE_BOOKMARK } from "../actions/types";
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
    default:
      return state;
  }
}
