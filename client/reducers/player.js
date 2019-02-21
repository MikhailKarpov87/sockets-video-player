import * as t from "../constants";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case t.VIDEO_PLAY:
      return {
        ...state,
        playing: true,
        position: action.payload.position
      };

    case t.VIDEO_UPDATE_INFO:
      return {
        ...state,
        duration: action.payload.duration
      };

    case t.VIDEO_PAUSE:
      return {
        ...state,
        playing: false,
        position: action.payload.position,

        updatePosition: true
      };

    case t.VIDEO_SEEK:
      const updatePosition = action.payload.updatePosition || false;
      const playing = action.payload.position === 1 ? false : state.playing;
      return {
        ...state,
        playing,
        position: action.payload.position,
        positionSeconds: action.payload.positionSeconds,
        updatePosition
      };

    case t.VIDEO_INPUT_SUBMIT:
      const { videoURL } = action.payload;
      return { ...state, url: videoURL, playing: false, position: 0 };

    default:
      return state;
  }
}
