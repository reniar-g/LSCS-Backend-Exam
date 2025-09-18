// contains the routes for the products

const express = require('express');
const { body, param, validationResult } = require('express-validator');
const {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
} = require('../controllers/productControllers');

const router = express.Router();

// general middleware function to handle validation results
function handleValidation(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			error: 'Validation failed',
			details: errors.array().map(e => ({ field: e.path, message: e.msg }))
		});
	}
	next();
}

// GET /products (lists all products)
router.get('/', getAllProducts); 

// GET /products/:id (gets a product by its id)
router.get('/:id',
    [param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer')], 
    handleValidation,
    getProductById
);

// POST /products (creates a new product)
// required fields: name, price
// optional fields: description, category, quantity
router.post(
	'/',
	[
		body('name').isString().trim().notEmpty().withMessage('Name is required'),
		body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0').toFloat(),
		body('description').optional({ nullable: true }).isString().withMessage('Description must be a string').trim(),
		body('category').optional({ nullable: true }).isString().withMessage('Category must be a string').trim(),
		body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be an integer greater than or equal to 0').toInt(),
	],
	handleValidation,
	createProduct
);

// PUT /products/:id (updates a product by its id)
router.put(
	'/:id',
	[
		param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
		body('name').optional().isString().trim().notEmpty().withMessage('Name must be a non-empty string'),
		body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a number > 0').toFloat(),
		body('description').optional({ nullable: true }).isString().withMessage('Description must be a string').trim(),
		body('category').optional({ nullable: true }).isString().withMessage('Category must be a string').trim(),
		body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be an integer >= 0').toInt(),
	],
	handleValidation,
	updateProduct
);

// DELETE /products/:id (deletes a product by its id)
router.delete(
	'/:id',
	[param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer')],
	handleValidation,
	deleteProduct
);

module.exports = router;