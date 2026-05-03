import express from "express";
import Stripe from "stripe";

const router = express.Router();

// Lazy initialize Stripe when needed
let stripe = null;
let stripeInitialized = false;

const getStripe = () => {
  if (!stripeInitialized) {
    if (!process.env.STRIPE_SECRET) {
      console.error("❌ STRIPE_SECRET environment variable not set");
      return null;
    }
    
    if (process.env.STRIPE_SECRET === "your_stripe_secret_key_here") {
      console.error("❌ STRIPE_SECRET is still a placeholder");
      return null;
    }

    try {
      stripe = new Stripe(process.env.STRIPE_SECRET);
      console.log("✅ Stripe initialized successfully");
      stripeInitialized = true;
    } catch (error) {
      console.error("❌ Stripe initialization error:", error.message);
      stripeInitialized = true; // Mark as attempted to avoid repeated errors
      return null;
    }
  }
  return stripe;
};

router.post("/", async (req, res) => {
  try {
    const stripeClient = getStripe();
    if (!stripeClient) {
      console.error("❌ Stripe not configured - STRIPE_SECRET missing or invalid");
      return res.status(503).json({ error: "Stripe not configured" });
    }

    if (!req.body.amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "inr",
          product_data: { name: "Order" },
          unit_amount: req.body.amount * 100
        },
        quantity: 1
      }],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL || "https://millethub-3sa5.onrender.com"}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL || "https://millethub-3sa5.onrender.com"}/cart`
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("❌ Payment error:", error.message);
    res.status(500).json({ error: error.message || "Payment processing failed" });
  }
});

export default router;
