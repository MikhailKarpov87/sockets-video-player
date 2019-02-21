import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { updatePlayerURL } from "../../actions";

const InputWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin: 10px 15%;

  @media screen and (max-width: 600px) {
    margin: 10px 2%;
  }

  button {
    margin-left: 15px;
  }
`;

class Input extends Component {
  static propTypes = {
    user: PropTypes.shape({
      userName: PropTypes.string,
      userId: PropTypes.string,
      isAuth: PropTypes.bool.isRequired
    }),
    updatePlayerURL: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      videoURL: ""
    };
  }

  render() {
    const { videoURL } = this.state;
    const { updatePlayerURL, user } = this.props;

    return user.isAuth ? (
      <InputWrapper>
        <TextField
          id="player-url"
          label="Enter video URL"
          placeholder="Enter video URL"
          margin="normal"
          fullWidth={true}
          onChange={e => this.setState({ videoURL: e.target.value })}
          onKeyPress={e => e.key === "Enter" && videoURL && updatePlayerURL(videoURL)}
          value={videoURL}
        />

        <Button
          variant="contained"
          size="small"
          onClick={() => videoURL && updatePlayerURL(videoURL)}
        >
          LOAD
        </Button>
      </InputWrapper>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { updatePlayerURL }
)(Input);
