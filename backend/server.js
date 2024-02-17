// server.js
const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51OeuDhLv1R7Sr7nh62vThApIkmJsfvbxHkQEwfyzAbFDJNhwnQGK7qwiES9wY36L1iMcTmUaWYUHGDnmAevrFU2200vrZEDWE9');
const requestIp = require('request-ip');

const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Endpoint to retrieve Stripe balance
app.post('/check-stripe-balance', async (req, res) => {
  const { connected_id } = req.body;
  const balance = await stripe.balance.retrieve({
    stripeAccount: `${connected_id}`,
  });
  res.json({
    balance: balance.available[0].amount
  })
})

// Endpoint to verify if connected account is enabled or disabled
app.post('/check-stripe-status', async (req, res) => {
  try {
    const { connected_id } = req.body;
    const account = await stripe.accounts.retrieve(connected_id);
    if (account.charges_enabled == true && account.payouts_enabled == true) {
      res.json({
        stripeIsActivated: true
      })
    } else {
      res.json({
        stripeIsActivated: false
      })
    }
  } catch (error) {
    console.log("Error Verifying Stripe Account: ", error);
  }
})

// Endpoint to create Stripe payment sheet
app.post('/payment-sheet', async (req, res) => {
  try {
    // Use an existing Customer ID if this is a returning customer.
    const { price, connected_id } = req.body;
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2023-10-16'}
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: 'usd',
      customer: customer.id,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter
      // is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
      application_fee_amount: price * 0.10,
      transfer_data: {
        destination: connected_id,
      },
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: 'pk_test_51OeuDhLv1R7Sr7nhN8rjyYe5JKa8AnUf1jB7wWVWoNaj5S9qcV4wUpyezRAZWC7muPbdG692QgAXd65mNeN9eQYz00yAtkUBbq'
    });

  } catch (error) {
    console.log("Payment Sheet Error", error);
  }
});

// Endpoint to create Stripe connected account; generates account link as well
app.post('/create-account', async (req, res) => {
  try {
    const { email } = req.body;

    const account = await stripe.accounts.create({
      type: 'express',
      email: email,
    })

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'https://www.berkeley.edu/', // Change this
      return_url: 'https://www.berkeley.edu/', // Change this
      type: 'account_onboarding'
    })

    const responseData = {
      url: accountLink.url,
      connected_id: account.id
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
