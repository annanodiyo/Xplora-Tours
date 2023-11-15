"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewsControllers_1 = require("../controllers/reviewsControllers");
// import { verifyToken } from "../middlewares/verifyTokens";
// import { verifyToken } from "../middlewares/verifyTokens";
const review_router = (0, express_1.Router)();
review_router.post("/createReview", reviewsControllers_1.createReview);
exports.default = review_router;
