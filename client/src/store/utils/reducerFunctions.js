export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    newConvo.notification = 1;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const newConvo = { ...convo };
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      newConvo.notification = newConvo.notification + 1;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = { ...convo };
      convoCopy.id = message.conversationId;
      convoCopy.messages = [message, ...convoCopy.messages];
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const markConvoAsRead = (state, conversationId, userId) => {
  return state.map((convo) => {
    const convoCopy = { ...convo };

    if (convoCopy.id === conversationId) {
      const lastIndex = convoCopy.messages.length - 1;
      convoCopy.notification = 0;
      convoCopy.messages.map((msg, index) => {
        msg.isRead = true;
        const indexCondition = lastIndex === index || lastIndex === index - 1;
        if (userId === msg.senderId) {
          if (indexCondition) {
            msg.isLastMessageRead = true;
          } else {
            msg.isLastMessageRead = false;
          }
        }

        return msg;
      });
      return convoCopy;
    } else {
      return convo;
    }
  });
};
