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
  unReadText: {
    fontSize: 12,
    color: "white",
    letterSpacing: -0.17,
    backgroundColor: "#4169E1",
    padding: 6,
    borderRadius: "100%",
  },
}));

const UnreadMessages = (props) => {
  const classes = useStyles();

  let { UnreadMsgs, user } = props || {};
  UnreadMsgs =
    Object.keys(UnreadMsgs).length > 0 &&
    UnreadMsgs.messages.filter(
      (msg) => msg.isRead === false && msg.senderId !== user
    );

  return (
    <Box className={classes.root}>
      <Box>
        {UnreadMsgs.length > 0 && (
          <Typography className={classes.unReadText}>
            {UnreadMsgs.length}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default UnreadMessages;
