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

// general middleware to handle validation results
function handleValidation(req, res, next) { 
	const errors = validationResult(req); 
	if (!errors.isEmpty()) { 
		return res.status(400).json({ errors: errors.array() }); 
	}
	next();
}

// GET /products (lists all products)
router.get('/', getAllProducts); 

// GET /products/:id (gets a product by its id)
router.get('/:id',
    // if value is not int or <= 0, magrereturn ng error code 400
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
		body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
		body('description').optional({ nullable: true }).isString().withMessage('Description must be a string'),
		body('category').optional({ nullable: true }).isString().withMessage('Category must be a string'),
		body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be an integer greater than or equal to 0'),
	],
	handleValidation,
	createProduct
);

// PUT /products/:id (updates a product by its id)
router.put(
	'/:id',
	[
		param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
		body('name').optional().isString().notEmpty().withMessage('Name must be a non-empty string'),
		body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a number > 0'),
		body('description').optional({ nullable: true }).isString().withMessage('Description must be a string'),
		body('category').optional({ nullable: true }).isString().withMessage('Category must be a string'),
		body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be an integer >= 0'),
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