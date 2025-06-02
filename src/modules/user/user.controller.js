const UserService = require("./user.service");
const NotFound = require("../../errors/NotFoundError");
const UnauthorizedError = require("../../errors/UnauthorizedError");
const jwtService = require("../auth/jwt.service");

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
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw new UnauthorizedError("Token tidak valid");
    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = jwtService.verify(token);
      let updatedUser;

      if (decodedToken?.uuid === req.params.uuid) {
        updatedUser = await UserService.update(req.params.uuid, req.body);
      } else {
        throw new NotFound("Anda tidak memiliki akses untuk mengubah data ini");
      }

      if (!updatedUser) throw new NotFound("User tidak ditemukan");
      res.status(200).json({
        status: 200,
        message: "User berhasil di update",
        success: true,
        data: updatedUser,
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
