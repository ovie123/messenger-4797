import React, { useEffect, useState } from "react";
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
  const notification = props.conversation.notification || 0;
  const { conversation, userId } = props;
  const lastIndex = conversation.messages.length - 1;

  return (
    <Box className={classes.root}>
      <Box>
        {conversation?.messages[lastIndex]?.senderId !== userId &&
          notification > 0 && (
            <Typography className={classes.unReadText}>
              {notification}
            </Typography>
          )}
      </Box>
    </Box>
  );
};

export default UnreadMessages;
