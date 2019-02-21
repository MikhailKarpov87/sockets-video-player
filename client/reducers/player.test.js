import reducer from "./player";
import * as t from "../constants";
import { initialState } from "../constants";

const state = initialState.player;

describe("player reducer", () => {
  it("VIDEO_PLAY from initial", () => {
    const action = {
      type: t.VIDEO_PLAY,
      payload: { position: 0 }
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      playing: true,
      position: action.payload.position
    });
  });

  it("VIDEO_PLAY from paused state", () => {
    const action = {
      type: t.VIDEO_PLAY,
      payload: { position: 0 }
    };

    const state = { ...state, playing: false };

    expect(reducer(state, action)).toEqual({
      ...state,
      playing: true,
      position: action.payload.position
    });
  });

  it("VIDEO_PLAY from playing state", () => {
    const action = {
      type: t.VIDEO_PLAY,
      payload: { position: 0 }
    };

    const state = { ...state, playing: true };

    expect(reducer(state, action)).toEqual({
      ...state,
      playing: true,
      position: action.payload.position
    });
  });

  it("VIDEO_PAUSE from initial state", () => {
    const action = {
      type: t.VIDEO_PAUSE,
      payload: { position: 0 }
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      playing: false,
      position: action.payload.position,
      updatePosition: true
    });
  });

  it("VIDEO_PAUSE from paused state", () => {
    const action = {
      type: t.VIDEO_PAUSE,
      payload: { position: 0 }
    };

    const state = { ...state, playing: false };

    expect(reducer(state, action)).toEqual({
      ...state,
      playing: false,
      position: action.payload.position,
      updatePosition: true
    });
  });

  it("VIDEO_PAUSE from playing state", () => {
    const action = {
      type: t.VIDEO_PAUSE,
      payload: { position: 0 }
    };

    const state = { ...state, playing: true };

    expect(reducer(state, action)).toEqual({
      ...state,
      playing: false,
      position: action.payload.position,
      updatePosition: true
    });
  });

  it("VIDEO_SEEK with updatePosition flag = true", () => {
    const action = {
      type: t.VIDEO_SEEK,
      payload: { position: 0.028, positionSeconds: 4, updatePosition: true }
    };

    const state = { ...state, playing: true };

    expect(reducer(state, action)).toEqual({
      ...state,
      position: action.payload.position,
      positionSeconds: action.payload.positionSeconds,
      updatePosition: true
    });
  });

  it("VIDEO_SEEK when position = 1", () => {
    const action = {
      type: t.VIDEO_SEEK,
      payload: { position: 1, positionSeconds: 164 }
    };

    const state = { ...state, playing: true };

    expect(reducer(state, action)).toEqual({
      ...state,
      playing: false,
      position: action.payload.position,
      positionSeconds: action.payload.positionSeconds,
      updatePosition: false
    });
  });
});
