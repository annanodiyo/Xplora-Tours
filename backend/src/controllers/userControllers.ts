import { NextFunction, Request, Response, request } from "express";
import mssql from "mssql";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { sqlConfig } from "../config/sqlConfig";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../interfaces/userInterface";
// import { ExtendedUser } from "../middleware/verifyToken";
import Connection from "../dbhelpers/dbhelpers";
import { registerUserSchema } from "../validators/validators";
import { isEmpty } from "lodash";
import { ExtendedUser } from "../middlewares/verifyTokens";

const dbhelper = new Connection();

export const registerUser = async (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.headers);
  try {
    let { full_name, email, phone_number, password } = req.body;

    let { error } = registerUserSchema.validate(req.body);

    if (error) {
      return res.status(404).json({ error: error.details });
    }

    const emailTaken = (
      await dbhelper.query(`SELECT * FROM users WHERE email = '${email}'`)
    ).recordset;

    if (!isEmpty(emailTaken)) {
      return res.json({ error: "This email is already in use" });
    }

    let user_id = v4();

    const hashedPwd = await bcrypt.hash(password, 10);

    let result = dbhelper.execute("registerUser", {
      user_id,
      full_name,
      email,
      phone_number,
      password: hashedPwd,
    });

    console.log(result);

    return res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    // return res.json({
    //   error: error,
    // });
    console.log(error);
  }
};

export const getAllUsers = async (req: ExtendedUser, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    let users = (await pool.request().execute("fetchAllUsers")).recordset;

    return res.status(200).json({
      users: users,
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // console.log(req.body);

    const pool = await mssql.connect(sqlConfig);
    let user = await pool
      .request()
      .input("email", email)
      .input("password", password)
      .execute("loginUser");

    if (!user.recordset.length) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const { password: storedPassword, ...rest } = user.recordset[0];
    const correctPwd = await bcrypt.compare(password, storedPassword);
    if (!correctPwd) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(rest, process.env.secret as string, {
      expiresIn: "3600s",
    });
    console.log(token);

    return res.status(200).json({ message: "LogIn successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "server error" });
  }
};

export const checkUserCredentials = async (
  req: ExtendedUser,
  res: Response
) => {
  console.log(req.info);

  if (req.info) {
    return res.json({
      information: req.info,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    let { user_id } = req.params;
    // console.log(req);

    const pool = await mssql.connect(sqlConfig);
    const user = await pool
      .request()
      .input("user_id", user_id)
      .execute("deleteUser");

    const rowsAffected = user.rowsAffected[0];
    if (rowsAffected > 0) {
      return res
        .status(200)
        .json({ message: "Deleted successfully", rowsAffected });
    } else {
      return res.status(404).json({ error: "No user found to delete" });
    }
  } catch (error) {
    console.error(error);
    return res.status(202).json({ error: "request failed" });
  }
};
