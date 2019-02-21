import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import Slider from "@material-ui/lab/Slider";
import Fab from "@material-ui/core/Fab";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Tooltip from "@material-ui/core/Tooltip";
import { sendMessage } from "../../socket";
import { videoSeek } from "../../actions";
import { getTimeFromSeconds } from "../../utils/player";

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 15px;

  div[role="slider"] {
    padding: 0 20px;
  }

  button {
    background-color: #32adff;
    flex: 0 0 auto;
  }
`;

class Controls extends Component {
  static propTypes = {
    player: PropTypes.shape({
      playing: PropTypes.bool.isRequired,
      duration: PropTypes.number,
      position: PropTypes.number.isRequired,
      positionSeconds: PropTypes.number.isRequired,
      updatePosition: PropTypes.bool.isRequired,
      url: PropTypes.string.isRequired
    }),
    user: PropTypes.shape({
      userName: PropTypes.string,
      userId: PropTypes.string,
      isAuth: PropTypes.bool.isRequired
    }),
    videoSeek: PropTypes.func.isRequired
  };

  onPlayPauseClick = () => {
    const { playing, position, positionSeconds } = this.props.player;
    sendMessage(playing ? "VIDEO_PAUSE" : "VIDEO_PLAY", { position, positionSeconds });
  };

  onSeekChange = (e, value) => {
    const { videoSeek } = this.props;
    const { positionSeconds } = this.props.player;
    videoSeek(value, positionSeconds);
    sendMessage("VIDEO_SEEK", { position: value, positionSeconds, updatePosition: true });
  };

  render() {
    const { playing, position, duration, positionSeconds } = this.props.player;

    const progressTime = getTimeFromSeconds(positionSeconds);

    return (
      <ControlsWrapper>
        <Fab onClick={this.onPlayPauseClick} color="primary" size="small">
          {playing ? <PauseIcon /> : <PlayIcon />}
        </Fab>
        {duration && duration !== Infinity ? (
          <Tooltip title={progressTime}>
            <Slider value={position} min={0} max={1} onChange={this.onSeekChange} />
          </Tooltip>
        ) : (
          <Slider value={0} disabled />
        )}
      </ControlsWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    player: state.player,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { videoSeek }
)(Controls);
