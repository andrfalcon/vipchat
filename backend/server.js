// server.js
const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51OeuDhLv1R7Sr7nh62vThApIkmJsfvbxHkQEwfyzAbFDJNhwnQGK7qwiES9wY36L1iMcTmUaWYUHGDnmAevrFU2200vrZEDWE9');
const requestIp = require('request-ip');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to create Stripe connected account
// Generates account link as well
app.post('/create-account', async (req, res) => {
  try {
    const { email } = req.body;

    const account = await stripe.accounts.create({
      type: 'express',
      email: email
    })

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'https://www.berkeley.edu/', // Change this
      return_url: 'https://www.berkeley.edu/', // Change this
      type: 'account_onboarding'
    })

    const responseData = {
      url: accountLink.url
    }
    res.json(responseData);
    console.log("Stripe account created successfully!");

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
})

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
