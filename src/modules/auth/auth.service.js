const { User } = require("../../../models");

const bcrypt = require("bcrypt");
const JwtService = require("./jwt.service");
const BadRequestError = require("../../errors/BadRequestError");
class AuthService {
  constructor() {
    this.SALT_ROUNDS = 10;
  }

  async register({ name, email, password, number }) {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) throw new BadRequestError("Email sudah terdaftar");

    const hash = await bcrypt.hash(password, this.SALT_ROUNDS);

    const user = await User.create({ name, email, number, password: hash });
    const token = JwtService.sign({ id: user.id, email: user.email });
    const userJson = user.toJSON();
    delete userJson.password;

    return { user: userJson, token };
  }

  async login({ email, password }) {
    const user = await User.findOne({ where: { email: email } });
    if (!user)
      throw new BadRequestError(
        "Email belum terdaftar, harap register terlebih dulu"
      );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestError("Password salah");

    const token = JwtService.sign({
      id: user.id,
      uuid: user.uuid,
      email: user.email,
    });
    const userJson = user.toJSON();
    delete userJson.password;

    return { user: userJson, token };
  }

  async profile(userId) {
    return await User.findOne({
      where: { uuid: userId },
      attributes: { exclude: ["password"] },
    });
  }
}

module.exports = new AuthService();
