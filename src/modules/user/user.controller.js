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

  async getById(req, res, next) {
    try {
      const user = await UserService.getById(req.params.id);
      if (!user) throw new NotFound("User tidak ditemukan");
      res.status(200).json({
        status: 200,
        message: "User berhasil di ambil",
        success: true,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }
  async create(req, res, next) {
    try {
      const user = await UserService.create(req.body);
      res.status(201).json({
        status: 201,
        message: "User berhasil di buat",
        success: true,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }
  async update(req, res, next) {
    try {
      const userUpdate = await UserService.update(req.params.id, req.body);
      if (!userUpdate) throw new NotFound("User tidak ditemukan");
      res.status(200).json({
        status: 200,
        message: "User berhasil di update",
        success: true,
        data: userUpdate,
      });
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      const user = await UserService.delete(req.params.id);
      if (!user) throw new NotFound("User tidak ditemukan");
      res.status(200).json({
        status: 200,
        message: "User berhasil di delete",
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
