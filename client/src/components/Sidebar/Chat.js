import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { updateReadStatus } from "../../store/utils/thunkCreators";

import { connect } from "react-redux";
import UnreadMessages from "../Sidebar/UnreadMessages";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, userId } = props;
  const { otherUser, notification } = conversation;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    const lastIndex = conversation.messages.length - 1;
    const convoId = conversation?.messages[lastIndex]?.conversationId;
    if (conversation?.messages[lastIndex]?.senderId !== userId) {
      await props.updateReadStatus(convoId, userId, otherUser.id);
    }
  };

  const lastIndex = conversation.messages.length - 1;
  const isNotification =
    otherUser.id === conversation?.messages[lastIndex]?.senderId &&
    notification > 0;

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent
        conversation={conversation}
        color={isNotification ? "black" : "#9CADC8"}
        fontWeight={isNotification ? "600" : "100"}
      />
      {isNotification && (
        <UnreadMessages conversation={conversation} userId={userId} />
      )}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    updateReadStatus: (convoId, userId, otherUserId) => {
      dispatch(updateReadStatus(convoId, userId, otherUserId));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
