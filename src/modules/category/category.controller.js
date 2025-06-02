const CategoryService = require("./category.service");

class CategoryController {
  async getAll(req, res, next) {
    try {
      const categories = await CategoryService.getAll();
      console.log(categories);
      res.status(200).json({
        status: 200,
        message: "Category berhasil di ambil",
        success: true,
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  }
  async getById(req, res, next) {
    try {
      const category = await CategoryService.getById(req.params.id);
      res.status(200).json({
        status: 200,
        message: "Category berhasil di ambil",
        success: true,
        data: category,
      });
    } catch (err) {
      next(err);
    }
  }
  async create(req, res, next) {
    try {
      const newCategory = await CategoryService.create(req.body);
      res.status(201).json({
        status: 201,
        message: "Category berhasil di buat",
        success: true,
        data: newCategory,
      });
    } catch (err) {
      next(err);
    }
  }
  async update(req, res, next) {
    try {
      const updatedCategory = CategoryService.update(req.params.id, req.body);
      res.status(200).json({
        status: 200,
        message: "Category berhasil di update",
        success: true,
        data: updatedCategory,
      });
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      const deletedCategory = CategoryService.delete(req.params.id);
      res.status(200).json({
        status: 200,
        message: "Category berhasil di hapus",
        success: true,
        // data: deletedCategory,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CategoryController();
