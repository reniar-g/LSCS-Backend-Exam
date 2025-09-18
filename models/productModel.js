// contains functions to interact with the products table in the database

const pool = require('../config/database');

// gets all of the products
async function getAll() {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
}

// gets product by its id
async function getById(id) {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0] || null;
}

// creates a new product and returns the created product with its new id
async function create(product) {
    const { name, price, description = null, category = null, quantity = 0} = product;
    const [result] = await pool.query('INSERT INTO products (name, price, description, category, quantity) VALUES (?, ?, ?, ?, ?)',
        [name, price, description, category, quantity]
    );
    return getById(result.insertId)
}

// updates a product
async function update(id, fields) {
    const allowedFields = ['name', 'price', 'description', 'category', 'quantity'];
    
    // filter yung allowed na fields
    const entries = Object.entries(fields).filter(([key]) => allowedFields.includes(key));

    // if there is nothing to update, return the product as is
    if (entries.length === 0) {
        return getById(id); 
    }

    // dynamically gagawan ng sql query based on the fields na provided 
    const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
    const values = entries.map(([, value]) => value);

    const [result] = await pool.query(`UPDATE products SET ${setClause} WHERE id = ?`, [...values, id]);

    if (result.affectedRows === 0) {
        return null; // id does not exist
    }

    return getById(id);
}

// deletes a product by its id
async function remove(id) {
  const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

// export all functions
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};