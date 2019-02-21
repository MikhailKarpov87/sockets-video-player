import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signIn, signOut } from "../actions/";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const LogInOutButton = withStyles({
  root: {
    margin: "0 10px"
  }
})(Button);

class Login extends Component {
  static propTypes = {
    user: PropTypes.shape({
      userName: PropTypes.string,
      userId: PropTypes.string,
      token: PropTypes.string,
      googleToken: PropTypes.string,
      isAuth: PropTypes.bool.isRequired
    }),
    signIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  };

  render() {
    const { user, signOut, signIn, loginMessage } = this.props;

    return user.isAuth ? (
      <>
        <Typography variant="body2" color="inherit">
          Welcome, <b>{user.userName}</b>!
        </Typography>

        <LogInOutButton onClick={signOut} color="inherit" variant="text" size="small">
          LOGOUT
        </LogInOutButton>
      </>
    ) : (
      <div>
        {loginMessage && (
          <Typography variant="body2" color="error" align="center" inline>
            {loginMessage}
          </Typography>
        )}
        <Button onClick={signIn} color="inherit">
          LOGIN
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(Login);
