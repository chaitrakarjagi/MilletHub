import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET);

router.post("/", async (req,res)=>{
  const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:[{
      price_data:{
        currency:"inr",
        product_data:{name:"Order"},
        unit_amount:req.body.amount*100
      },
      quantity:1
    }],
    mode:"payment",
    success_url:"http://localhost:5173/payment-success",
    cancel_url:"http://localhost:5173/cart"
  });

  res.json({ url: session.url });
});

export default router;
