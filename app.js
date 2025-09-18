require('dotenv').config();
const express = require('express');
const productsRouter = require('./routes/productsRoutes');

const app = express();
app.use(express.json());
app.use('/products', productsRouter);

// health check endpoint para matest if the server is running
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;