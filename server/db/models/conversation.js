const { Op, Sequelize } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {
  user1Id: {
    type: Sequelize.NUMBER,
    allowNull: true,
  },
  user2Id: {
    type: Sequelize.NUMBER,
    allowNull: true,
  },
  groupUser: {
    type: Sequelize.NUMBER,
    allowNull: true,
  },
});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id],
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id],
      },
    },
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
