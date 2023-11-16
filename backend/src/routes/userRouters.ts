import { Router } from "express";
import {
  checkUserCredentials,
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/userControllers";
import { verifyToken } from "../middlewares/verifyTokens";

const user_router = Router();
user_router.post("/register", registerUser);
user_router.post("/login", loginUser);
user_router.get("/allUsers", getAllUsers);
user_router.get("/checkCredentials", verifyToken, checkUserCredentials);
export default user_router;
