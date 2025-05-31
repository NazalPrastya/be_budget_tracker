const UserService = require("./user.service");
const NotFound = require("../../errors/NotFoundError");

class UserController {
  async getAll(req, res, next) {
    try {
      const users = await UserService.getAll();
      if (users.length === 0) throw new NotFound("User tidak ditemukan");
      res.status(200).json({
        status: 200,
        message: "User berhasil di ambil",
        success: true,
        data: users,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
