require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_TEST_TOKEN);

stripe.products
  .create({
    name: 'Lrg Game Db',
    description: 'Progress tracking for large size game.',
  })
  .then(product => {
    stripe.prices
      .create({
        unit_amount: 399,
        currency: 'gbp',
        product: product.id,
      })
      .then(price => {
        console.log(
          'Success! Here is your Lrg Game Db product id: ' + product.id,
        );
        console.log(
          'Success! Here is your starter subscription price id: ' + price.id,
        );
      });
  });
