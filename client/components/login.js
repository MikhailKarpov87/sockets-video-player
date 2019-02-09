import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signIn, signOut } from "../actions/";

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
    const { user, signOut, signIn } = this.props;

    return user.isAuth ? (
      <div className="header-login">
        <span>
          Привет, <b>{user.userName}</b>!
        </span>
        <button onClick={signOut} className="login-button">
          Выйти
        </button>
      </div>
    ) : (
      <div className="header-login">
        <button onClick={signIn} className="login-button">
          Войти
        </button>
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
