import { ADD_BOOKMARK } from "../actions/types";
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
    default:
      return state;
  }
}
