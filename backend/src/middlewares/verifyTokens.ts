import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../interfaces/userInterface";
dotenv.config();

export interface ExtendedUser extends Request {
  information?: User;
}

export const verifyToken = (
  res: Response,
  req: ExtendedUser,
  next: NextFunction
) => {
  try {
    let token = req.headers["token"] as string;
    if (!token) {
      res.status(404).json({ message: "access denied" });
    }
    const data = jwt.verify(token, process.env.secret as string) as User;
    req.information = data;
  } catch (error) {
    console.log(error);
  }
  next();
};
