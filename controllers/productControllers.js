// contains the controller layer for product operations 

const productsModel = require('../models/productModel');

async function getAllProducts(req, res, next) {
	try {
        // get all products from the model
		const products = await productsModel.getAll(); 
		res.json(products); // sends 200 by default
	} catch (err) {
		next(err); // pass to error handling function in the product routes
	}
}

async function getProductById(req, res, next) {
	try {
		const id = parseInt(req.params.id, 10); 
		const product = await productsModel.getById(id);
		if (!product) { // if no product found with the id, return 404
			return res.status(404).json({ error: 'Product not found' });
		}
		res.json(product);
	} catch (err) {
		next(err);
	}
}

async function createProduct(req, res, next) {
	try {
		const created = await productsModel.create(req.body);
		res.status(201).json(created); // sends 201 created status
	} catch (err) {
		next(err);
	}
}

async function updateProduct(req, res, next) {
	try {
		const id = parseInt(req.params.id, 10);
        const allowed = ['name', 'price', 'description', 'category', 'quantity'];
		const keys = Object.keys(req.body);

		// checks if there is at least one valid field to update
		if (keys.length === 0 || !keys.some(k => allowed.includes(k))) {
			return res.status(400).json({ error: 'Provide at least one valid field to update' });
		}

		// updates the product
		const updated = await productsModel.update(id, req.body);
		if (!updated) { // 404 if product with that id does not exist
			return res.status(404).json({ error: 'Product not found' });
		}
		res.json(updated); 
	} catch (err) {
		next(err);
	}
}

async function deleteProduct(req, res, next) {
	try {
		const id = parseInt(req.params.id, 10);
		const removed = await productsModel.remove(id);
		if (!removed) { // if id is not removed (does not exist), return 404
			return res.status(404).json({ error: 'Product not found' });
		} // if removed, return 200
		res.status(200).json({ message: 'Product deleted successfully' });
	} catch (err) {
		next(err);
	}
}

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};