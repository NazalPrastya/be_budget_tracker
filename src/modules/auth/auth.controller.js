const { ca } = require("zod/v4/locales");
const AuthService = require("./auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const data = req.body;
      const result = await AuthService.register(data);
      res.status(201).json({
        status: 201,
        message: "User berhasil di buat",
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const data = req.body;
      const result = await AuthService.login(data);
      res.status(200).json({
        status: 200,
        message: "User berhasil di login",
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async profile(req, res, next) {
    try {
      //   const result = await AuthService.profile(req.user.id);
      res.status(200).json({
        status: 200,
        message: "User berhasil di ambil",
        success: true,
        // data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
