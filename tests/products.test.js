// Even after studying Jest and Supertest, I was still not really confident in writing the
// tests myself, with that some parts of this code were made with the help of ChatGPT.

const request = require('supertest'); 
const app = require('../app');       
const pool = require('../config/database'); 

// helper function to reset the products table before each test run
async function resetProducts() {
  await pool.query('DELETE FROM products');
}

describe('Products API Test', () => {
let id1, id2; // this will store the two created products this test will create

  beforeAll(async () => {
    await resetProducts();
  });

  // AI-ASSISTED: afterAll closes the pool so Jest process can exit cleanly
  afterAll(async () => {
    await pool.end();
  });

  // AI-ASSISTED TEST: Expect an empty array when database table has no rows
  test('GET /products (empty)', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  // creates a test for a product with minimal fields only
  test('POST /products (minimal fields)', async () => {
    const res = await request(app)
      .post('/products')
      .send({ name: 'IPhone 17', price: 57990.0});
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    id1 = res.body.id;
  });

  // creates a test for a product with all fields provided
  test('POST /products (all fields)', async () => {
    const res = await request(app)
      .post('/products')
      .send({
        name: 'IPhone Air',
        price: 72990.0,
        description: 'The thinnest iPhone ever',
        category: 'Phones',
        quantity: 5,
      });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('IPhone Air');
    id2 = res.body.id;
  });

  // AI-ASSISTED TEST: This will show at least the two created rows
  test('GET /products (after creation)', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

 // AI-ASSISTED TEST: Fetch existing product by ID
  test('GET /products/:id (existing)', async () => {
    const res = await request(app).get(`/products/${id1}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id1);
  });
  
  // AI-ASSISTED TEST: Not found path should return 404
  test('GET /products/:id (not found)', async () => {
    const res = await request(app).get('/products/999999');
    expect(res.status).toBe(404);
  });

  // AI-ASSISTED TEST: Partial update of multiple allowed fields
  test('PUT /products/:id (partial update)', async () => {
    const res = await request(app)
      .put(`/products/${id1}`)
      .send({ price: 47999.0, quantity: 10 });
    expect(res.status).toBe(200);
    expect(Number(res.body.price)).toBe(47999);
    expect(res.body.quantity).toBe(10);
  });

  // AI-GENERATED TEST: Invalid update body (no allowed fields) should trigger 400
  test('PUT /products/:id (invalid only fields)', async () => {
    const res = await request(app)
      .put(`/products/${id1}`)
      .send({ foo: 'bar' });
    expect(res.status).toBe(400);
  });

  // test for validation error when creating a product without the required name field
  test('POST /products (validation error - missing name)', async () => {
    const res = await request(app)
      .post('/products')
      .send({ price: 100 });
    expect(res.status).toBe(400);
  });

  // tests successful deletion of an existing product
  test('DELETE /products/:id (existing)', async () => {
    const res = await request(app).delete(`/products/${id2}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Product deleted successfully');
  });

  // if itatry idelete yung same product, it would return 404
  test('DELETE /products/:id (already deleted)', async () => {
    const res = await request(app).delete(`/products/${id2}`);
    expect(res.status).toBe(404);
  });
});