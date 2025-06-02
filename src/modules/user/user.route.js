const express = require("express");
const router = express.Router();

const UserController = require("./user.controller");

const authJWT = require("../../middlewares/auth.middleware");
const asyncErrorHandler = require("../../errors/asyncErrorHandler");
const {
  idParamValidator,
  updateUserValidator,
  createUserValidator,
} = require("./user.validator");
const validateRequest = require("../../middlewares/validation.middleware");

router.use(authJWT);
router.get("/", asyncErrorHandler(UserController.getAll.bind(UserController)));

router.get(
  "/:id",
  idParamValidator,
  validateRequest,
  asyncErrorHandler(UserController.getById.bind(UserController))
);

router.post(
  "/",
  createUserValidator,
  validateRequest,
  asyncErrorHandler(UserController.create.bind(UserController))
);

router.put(
  "/:uuid",
  idParamValidator,
  updateUserValidator,
  validateRequest,
  asyncErrorHandler(UserController.update.bind(UserController))
);

router.delete(
  "/:uuid",
  idParamValidator,
  validateRequest,
  asyncErrorHandler(UserController.delete.bind(UserController))
);

module.exports = router;
