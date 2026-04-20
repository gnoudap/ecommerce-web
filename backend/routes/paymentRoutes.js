import express from 'express';
import stripe from '../config/stripe.js';
import { protect } from '../middleware/auth.js';
import Order from '../models/order.model.js';

const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', protect, async (req, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({ message: 'Payment service not configured' });
    }

    const { amount, orderId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: orderId || ''
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Webhook for Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ message: 'Payment service not configured' });
  }

  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!');
      
      const orderId = paymentIntent.metadata.orderId;
      if (orderId) {
          try {
              const order = await Order.findById(orderId);
              if (order) {
                  order.isPaid = true;
                  order.paidAt = Date.now();
                  order.paymentResult = {
                      id: paymentIntent.id,
                      status: paymentIntent.status,
                      update_time: new Date().toISOString(),
                      email_address: paymentIntent.receipt_email || ''
                  };
                  order.status = 'processing';
                  await order.save();
                  console.log(`Order ${orderId} updated to processing/paid`);
              }
          } catch(err) {
              console.error(`Error updating order ${orderId}: ${err.message}`);
          }
      }
      break;
    }
    case 'payment_intent.payment_failed':
      console.log('Payment failed!');
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

export default router;
