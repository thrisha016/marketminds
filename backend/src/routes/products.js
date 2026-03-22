const express = require('express');
const { body } = require('express-validator');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes require authentication

router
  .route('/')
  .get(getProducts)
  .post(
    [
      body('name', 'Name is required').not().isEmpty(),
      body('category', 'Category is required').not().isEmpty(),
      body('price', 'Price is required and must be positive').isFloat({ min: 0 }),
      body('quantity', 'Quantity is required and must be non-negative').isInt({ min: 0 }),
      body('mfgDate', 'Manufacturing date must be valid ISO date').optional().isISO8601(),
      body('expiry', 'Expiry date must be valid ISO date').optional().isISO8601(),
      body('sku', 'SKU is required').not().isEmpty(),
      body('supplier', 'Supplier is required').not().isEmpty(),
    ],
    createProduct
  );

router
  .route('/:id')
  .get(getProduct)
  .put(
    [
      body('name', 'Name is required').optional().not().isEmpty(),
      body('category', 'Category is required').optional().not().isEmpty(),
      body('price', 'Price must be positive').optional().isFloat({ min: 0 }),
      body('quantity', 'Quantity must be non-negative').optional().isInt({ min: 0 }),
      body('mfgDate', 'Manufacturing date must be valid ISO date').optional().isISO8601(),
      body('expiry', 'Expiry date must be valid ISO date').optional().isISO8601(),
      body('sku', 'SKU is required').optional().not().isEmpty(),
      body('supplier', 'Supplier is required').optional().not().isEmpty(),
    ],
    updateProduct
  )
  .delete(deleteProduct);

module.exports = router;
