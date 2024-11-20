const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentSession = async (req, res) => {
  const { plan } = req.body;

  const plans = {
    basic: 500, // $5.00
    premium: 1000, // $10.00
  };

  if (!plans[plan]) return res.status(400).json({ message: 'Invalid plan' });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: plan.charAt(0).toUpperCase() + plan.slice(1) + ' Plan' },
            unit_amount: plans[plan],
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/dashboard?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPaymentSession };
