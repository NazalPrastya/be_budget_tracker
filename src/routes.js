const express = require("express");

const router = express.Router();

const userRouter = require("./modules/user/user.route");
const authRouter = require("./modules/auth/auth.route");

router.use("/users", userRouter);
router.use("/auth", authRouter);

router.use((req, res) => {
  throw new NotFound("Terjadi kesalahan pada server");
});

module.exports = router;
