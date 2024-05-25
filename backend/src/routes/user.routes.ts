import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.model";

const router = express.Router();

// create new user
router.post("/", async (req: Request, res: Response) => {
  console.log("Hitted");
  try {
    // checking the user already exists or not
    const isUser = await User.findOne({ email: req.body.email });

    //   if doesn't exist save the user data
    if (!isUser) {
      new User(req.body).save();
    }

    // create JWT token
    const token = jwt.sign(
      { emial: req.body.email },
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

export default router;
