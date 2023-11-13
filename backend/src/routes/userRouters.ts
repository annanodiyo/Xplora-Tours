import { Router } from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/userControllers";
import { verifyToken } from "../middlewares/verifyTokens";
// import { verifyToken } from "../middlewares/verifyTokens";

const user_router = Router();
user_router.post("/register", registerUser);
user_router.post("/login", loginUser);
user_router.get("/getAllUsers", verifyToken, getAllUsers);
export default user_router;
