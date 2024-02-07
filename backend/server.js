// server.js
const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51OeuDhLv1R7Sr7nh62vThApIkmJsfvbxHkQEwfyzAbFDJNhwnQGK7qwiES9wY36L1iMcTmUaWYUHGDnmAevrFU2200vrZEDWE9');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to create a product
app.post('/create-product', async (req, res) => {
  try {
    const { name, price } = req.body;

    // Create a product
    const product = await stripe.products.create({
      name,
    });

    // Create a price for the product
    const productPrice = await stripe.prices.create({
      unit_amount: price,
      currency: 'usd',
      product: product.id,
    });

    console.log('product created')

    res.json({ product, productPrice });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
