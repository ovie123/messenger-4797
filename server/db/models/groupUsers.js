const Sequelize = require("sequelize");
const db = require("../db");

const GroupUsers = db.define("groupUsers", {
  groupId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = GroupUsers;
