import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import { updateReadStatus } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column",
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
  },
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const { conversation } = props;
  const { otherUser } = props.conversation;

  const handleClick = async (conversation) => {
    const lastIndex = conversation.messages.length - 1;
    const convoId = conversation?.messages[lastIndex]?.conversationId;
    if (conversation?.messages[lastIndex].senderId !== user.id) {
      await props.updateReadStatus(convoId, user.id, otherUser.id);
    }
  };

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box
            className={classes.chatContainer}
            onClick={() => handleClick(conversation)}
          >
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateReadStatus: (convoId, userId, otherUserId) => {
      dispatch(updateReadStatus(convoId, userId, otherUserId));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
    activeConversation: state.activeConversation,
    conversation:
      state?.conversations?.find(
        (conversation) =>
          conversation.otherUser.username === state.activeConversation
      ) ?? {},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
