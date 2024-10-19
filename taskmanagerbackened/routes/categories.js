const express = require('express');
const { createCategory , deleteCategory , getCategories } = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createCategory);
router.get('/', authMiddleware, getCategories);
router.delete('/', authMiddleware, deleteCategory);

module.exports = router;

