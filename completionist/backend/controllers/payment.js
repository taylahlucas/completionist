const { dynamoDbDocClient } = require('../client');
const { QueryCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const authWrapper = require('../helpers/auth_wrapper');
const { response_code } = require('../helpers/response_code');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var params = {
  TableName: process.env.AWS_TABLE_NAME,
};

const updateStripeId = async (userId, customerId) => {
  params = {
    ...params,
    Key: {
      userId: userId,
    },
    UpdateExpression: 'set customerId = :customerId',
    ConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
      ':customerId': customerId,
    },
  };

  await dynamoDbDocClient.send(new UpdateCommand(params));
  console.log(`Stripe Id for User with ID ${userId} updated successfully`);
  return customerId;
};

const createPayment = authWrapper({
  authFunction: async (req, res, token) => {
    const userId = req.params.userId;
    const stripeAuthHeader = req.headers['x-secondary-auth'];
    const { amount, game } = req.body;

    params = {
      ...params,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };
    const response = await dynamoDbDocClient.send(new QueryCommand(params));

    if (!response.Items.length) {
      console.log('Error finding user:', err);
      return res
        .status(response_code.NO_USER_FOUND)
        .json({ error: err.message });
    }

    const user = response.Items[0];

    // Use an existing Customer ID if this is a returning customer.
    let customerId;
    if (!user.customerId) {
      const customer = await stripe.customers.create();
      customerId = await updateStripeId(userId, customer.id);
      await stripe.customers.update(customerId, {
        name: user.username,
        email: user.email,
      });
    } else {
      customerId = user.customerId;
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customerId },
      { apiVersion: '2024-11-20.acacia' },
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'gbp',
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return res.status(response_code.SUCCESS).json({
      token: token,
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customerId,
      publishableKey: process.env.STRIPE_TEST_TOKEN,
      game: game,
      amount: amount,
    });
  },
  onError: (res, err) => {
    console.log('Error creating payment intent:', err);
    return res.status(500).json({ error: err.message });
  },
});

module.exports = { createPayment };
