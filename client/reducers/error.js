import * as t from "../constants";

export default function(state = {}, action) {
  switch (action.type) {
    case t.INPUT_ERROR:
      const { message } = action.payload;
      return message;

    default:
      return state;
  }
}
