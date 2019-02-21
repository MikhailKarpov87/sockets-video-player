import React from "react";
import PropTypes from "prop-types";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import styled from "styled-components";
import ArrowRight from "@material-ui/icons/ArrowRight";
import Chat from "@material-ui/icons/Chat";
import Tooltip from "@material-ui/core/Tooltip";

const ChatToggle = props => {
  const { collapseChat, handleClick } = props;
  const ChatToggleWrapper = styled.span`
    position: absolute;
    left: ${props => (props.collapseChat ? "90%;" : "63%;")};
    cursor: pointer;
    color: grey;

    :hover {
      color: lightgrey;
    }

    @media screen and (max-width: 959px) {
      display: none;
    }
  `;

  return (
    <ChatToggleWrapper collapseChat={collapseChat}>
      {collapseChat ? (
        <Tooltip title="Open Chat">
          <span onClick={handleClick}>
            <ArrowLeft />
            <Chat />
          </span>
        </Tooltip>
      ) : (
        <Tooltip title="Close Chat">
          <span onClick={handleClick}>
            <Chat />
            <ArrowRight />
          </span>
        </Tooltip>
      )}
    </ChatToggleWrapper>
  );
};

ChatToggle.propTypes = {
  collapseChat: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default ChatToggle;
