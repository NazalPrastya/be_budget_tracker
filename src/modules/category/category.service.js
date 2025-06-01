const { Category } = require("../../../models");
const NotFound = require("../../errors/NotFoundError");

class CategoryService {
  async getAll() {
    const categories = await Category.findAll();
    return categories;
  }
  async getById(id) {
    const category = await Category.findByPk(id);
    return category;
  }
  async create(data) {
    const category = await Category.create(data);
    return category;
  }
  async update(id, data) {
    const category = await Category.findByPk(id);
    if (!category) throw new NotFound("Category not found");
    await category.update(data);
    return category;
  }

  async delete(id) {
    const category = await Category.findByPk(id);
    if (!category) throw new NotFound("Category not found");
    await category.destroy();
    return true;
  }
}

module.exports = new CategoryService();
