const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isRead: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Message;
