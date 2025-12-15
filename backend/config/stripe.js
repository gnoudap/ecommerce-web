import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'your_stripe_key'
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export default stripe;
