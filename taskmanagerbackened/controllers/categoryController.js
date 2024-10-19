
const Category = require('../models/Category');

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = new Category({ name, user: req.user._id });
    await category.save();
    res.status(201).json({ message: 'Category created', category });
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id });
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching categories', error });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findOneAndDelete({ _id: id, user: req.user._id });
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting category', error });
  }
};

module.exports = { createCategory, getCategories, deleteCategory };
