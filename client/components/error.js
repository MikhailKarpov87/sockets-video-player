import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import { inputError } from "../actions";

const ErrorMessage = props => {
  const { message, inputError } = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={!!message}
      autoHideDuration={6000}
      onClose={() => inputError(null)}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={
        <span id="message-id">
          <ErrorIcon style={{ fontSize: "0.9em" }} /> {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={() => inputError(null)}>
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  inputError: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    message: state.error
  };
};

export default connect(
  mapStateToProps,
  { inputError }
)(ErrorMessage);
