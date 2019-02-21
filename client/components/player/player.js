import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { videoSeek, updateVideoInfo } from "../../actions";

class VideoPlayer extends Component {
  static propTypes = {
    player: PropTypes.shape({
      playing: PropTypes.bool.isRequired,
      position: PropTypes.number.isRequired,
      positionSeconds: PropTypes.number.isRequired,
      updatePosition: PropTypes.bool.isRequired,
      url: PropTypes.string.isRequired
    }),
    videoSeek: PropTypes.func.isRequired,
    updateVideoInfo: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.player = React.createRef();
  }

  onProgress = e => {
    const { videoSeek } = this.props;
    videoSeek(e.played, e.playedSeconds, false);
  };

  render() {
    const { playing, position, updatePosition, url } = this.props.player;
    const { updateVideoInfo } = this.props;

    //  Seeking to new position on video if updatePosition flag is true
    updatePosition && this.player.current.seekTo(position);

    return (
      <ReactPlayer
        controls={false}
        url={url}
        id="player"
        ref={this.player}
        playing={playing}
        width="auto"
        height="auto"
        onProgress={this.onProgress}
        onDuration={duration => updateVideoInfo({ duration })}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    player: state.player
  };
};

export default connect(
  mapStateToProps,
  { videoSeek, updateVideoInfo }
)(VideoPlayer);
