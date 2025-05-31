const { User } = require("../../../models");
const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.SALT_ROUNDS = 10;
  }

  async getAll() {
    return await User.findAll({ attributes: { exclude: ["password"] } });
  }

  async getById(id) {
    return await User.findByPk(id);
  }
}

module.exports = new UserService();
