const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const NotFound = require("../../errors/NotFoundError");
const ServerError = require("../../errors/ServerError");
const BadRequestError = require("../../errors/BadRequestError");
class UserService {
  constructor() {
    this.SALT_ROUNDS = 10;
  }

  async getAll() {
    return await User.findAll({ attributes: { exclude: ["password"] } });
  }

  async getById(id) {
    return await User.findByPk(id, { attributes: { exclude: ["password"] } });
  }

  async create(data) {
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) throw new BadRequestError("Email sudah terdaftar");

    const hash = await bcrypt.hash(data.password, this.SALT_ROUNDS);

    const user = await User.create({ ...data, password: hash });
    const userJson = user.toJSON();
    delete userJson.password;

    return userJson;
  }

  async update(uuid, data) {
    const user = await User.findOne({ where: { uuid } });
    if (!user) throw new NotFound("User tidak ditemukan");

    if (data.email && data.email !== user.email) {
      const existingUser = await User.findOne({ where: { email: data.email } });
      if (existingUser) throw new BadRequestError("Email sudah terdaftar");
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, this.SALT_ROUNDS);
    } else {
      delete data.password;
    }

    try {
      await user.update(data, { validate: true });
    } catch (err) {
      console.log(err);
      const message = err.errors?.map((e) => e.message) || [err.message];
      throw new ServerError("Gagal Update User: ", +message.join(", "));
    }

    const userJson = user.toJSON();
    return userJson;
  }

  async delete(uuid) {
    const user = await User.findOne({ where: { uuid } });
    if (!user) throw new NotFound("User tidak ditemukan");
    await user.destroy();
    return true;
  }
}

module.exports = new UserService();
