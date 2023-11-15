import { Router } from "express";
import { createReview } from "../controllers/reviewsControllers";
// import { verifyToken } from "../middlewares/verifyTokens";
// import { verifyToken } from "../middlewares/verifyTokens";

const review_router = Router();
review_router.post("/createReview", createReview);

export default review_router;
