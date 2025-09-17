const express = require('express');
require('dotenv').config();
const productsRouter = require('./routes/products'); 

// initialize express app
const app = express();
app.use(express.json());
app.use('/products', productsRouter);

// error handling 
app.use((err, req, res, next) => {
    console.error(err);
    // send error response, defaults to 500 if status is not set
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
}); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));