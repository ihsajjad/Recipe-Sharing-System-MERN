import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import { verifyToken } from "../middleware/varifyToken";
import User from "../models/User.model";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// getting current user data
router.get(
  "/current-user",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const userData = await User.findOne({ email: req.email });

      res.json(userData);
    } catch (error) {
      console.log(__filename, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// user login
router.post("/", async (req: Request, res: Response) => {
  try {
    // checking the user already exists or not
    const isUser = await User.findOne({ email: req.body.email });

    //   if doesn't exist save the user data
    if (!isUser) {
      new User(req.body).save();
    }

    // create JWT token
    const token = jwt.sign(
      { email: req.body.email },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.json({ token });
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// create payment intent
router.post(
  "/create-payment-intent",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const amount = parseInt(req.body.amount ? req.body.amount : "0");

      // creating payment intent based on the amount
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          userEmail: req.email,
        },
      });

      // if failed to create payment intent
      if (!paymentIntent) {
        return res
          .status(500)
          .json({ message: "Failed to create payment intent" });
      }

      res.json({ clientSecret: paymentIntent.client_secret, amount });
    } catch (error) {
      console.log(__filename, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
