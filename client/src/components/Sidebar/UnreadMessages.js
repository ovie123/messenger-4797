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
  unreadChatContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: 10,
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
  unReadText: {
    width: 24,
    height: 24,
    fontSize: 12,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",
    backgroundColor: "#3A8DFF",
    borderRadius: "50%",
  },
}));

const UnreadMessages = (props) => {
  const classes = useStyles();
  const notification = props.conversation.notification || 0;

  return (
    <Box className={classes.root}>
      <Box className={classes.unreadChatContainer}>
        {<Typography className={classes.unReadText}>{notification}</Typography>}
      </Box>
    </Box>
  );
};

export default UnreadMessages;
