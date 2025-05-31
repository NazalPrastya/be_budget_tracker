const express = require("express");

const router = express.Router();

const userRouter = require("./modules/user/user.route");

router.use("/users", userRouter);

router.use((req, res) => {
  throw new NotFound("Terjadi kesalahan pada server");
});

module.exports = router;
