const Sequelize = require("sequelize");
const db = require("../db");

const GroupUsers = db.define("groupUsers", {
  groupId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
});

module.exports = GroupUsers;
