const express = require("express");
const router = express.Router();

const authJWT = require("../../middlewares/auth.middleware");
const CategoryController = require("./category.controller");
const validateRequest = require("../../middlewares/validation.middleware");
const asyncErrorHandler = require("../../errors/asyncErrorHandler");
const {
  categoryIdParamValidator,
  updateCategoryValidator,
  createCategoryValidator,
} = require("./category.validator");

router.use(authJWT);
router.get(
  "/",
  asyncErrorHandler(CategoryController.getAll.bind(CategoryController))
);
router.get(
  "/:id",
  categoryIdParamValidator,
  validateRequest,
  asyncErrorHandler(CategoryController.getById.bind(CategoryController))
);
router.post(
  "/",
  createCategoryValidator,
  validateRequest,
  asyncErrorHandler(CategoryController.create.bind(CategoryController))
);
router.put(
  "/:id",
  updateCategoryValidator,
  validateRequest,
  asyncErrorHandler(CategoryController.update.bind(CategoryController))
);
router.delete(
  "/:id",
  categoryIdParamValidator,
  validateRequest,
  asyncErrorHandler(CategoryController.delete.bind(CategoryController))
);

module.exports = router;
