import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import withStyles from "@material-ui/core/styles/withStyles";
import Login from "./login";

const HeaderWrapper = withStyles({
  root: {
    backgroundColor: "#32ADFF",
    marginBottom: "10px",
    color: "#FFFFFF"
  }
})(AppBar);

const Header = () => {
  return (
    <HeaderWrapper position="static" color="default">
      <Toolbar variant="dense">
        <Login />
      </Toolbar>
    </HeaderWrapper>
  );
};

export default Header;
