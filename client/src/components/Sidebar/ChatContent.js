import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  boldText: {
    color: "black",
    fontWeight: 600,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { latestMessageText, otherUser, notification } = conversation;
  const lastIndex = conversation.messages.length - 1;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={
            otherUser.id === conversation.messages[lastIndex].senderId &&
            notification > 0
              ? ` ${classes.previewText} ${classes.boldText}`
              : classes.previewText
          }
        >
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
