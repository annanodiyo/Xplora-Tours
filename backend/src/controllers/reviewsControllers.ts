import { Request, Response } from "express";
import { reviewSchema } from "../validators/validators";
import Connection from "../dbhelpers/dbhelpers";
import mssql from "mssql";
import { sqlConfig } from "../config/sqlConfig";
import { v4 } from "uuid";
const dbhelper = new Connection();

export const createReview = async (req: Request, res: Response) => {
  try {
    // GET DATA FROM FRONTEND
    const { rating, comment, user_id } = req.body;

    // VALIDATION OF FRONTEND DATA
    let { error } = reviewSchema.validate(req.body);

    if (error) {
      console.log(error);

      return res.status(404).json({ error: error.details });
    }

    // const pool = await dbhelper.getConnection();
    const review_id = v4();

    let result = dbhelper.execute("createReview", {
      review_id,
      rating,
      comment,
      user_id,
    });

    console.log(result);

    return res.status(200).json({
      message: "Review created successfully",
    });
  } catch (error) {}
};
