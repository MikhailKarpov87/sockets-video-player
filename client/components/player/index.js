import React from "react";
import styled from "styled-components";
import VideoPlayer from "./player";
import Input from "./input";
import Controls from "./controls";

const PlayerWrapper = styled.div`
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: 640px) {
    iframe {
      pointer-events: none;
    }
  }

  #player {
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }

  #player > div {
    float: none;
    clear: both;
    width: 100%;
    position: relative;
    padding-bottom: 50%;
    padding-top: 25px;
    height: 0;
  }

  #player > div iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Player = props => (
  <PlayerWrapper>
    <VideoPlayer />
    <Controls />
    <Input />
  </PlayerWrapper>
);

export default Player;
