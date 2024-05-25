import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      email: string;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  // getting the token from headers
  const token = authorization?.split(" ")[1];

  // if token doesn't exists throwing an error
  if (!token) return res.status(401).json({ message: "Invalid Token" });

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    // if failed to verify throwing an error
    if (err) return res.status(401).json({ message: "Invalid Token" });

    const email = (decoded as JwtPayload).email;
    req.email = email;

    next();
  });
};
