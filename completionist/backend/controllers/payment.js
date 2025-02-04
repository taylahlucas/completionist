const authWrapper = require('../helpers/auth_wrapper');
const { response_code } = require('../helpers/response_code');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPayment = authWrapper({
  authFunction: async (req, res, token) => {
    // Use an existing Customer ID if this is a returning customer.
    const { amount, game } = req.body;

    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2024-11-20.acacia' },
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'gbp',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return res.status(response_code.SUCCESS).json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: process.env.STRIPE_TEST_TOKEN,
      game: game,
      amount: amount,
    });
  },
  onError: (res, err) => {
    console.log('Error creating payment intent:', err);
    res.status(500).json({ error: err.message });
  },
});

module.exports = { createPayment };
