"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReview = void 0;
const validators_1 = require("../validators/validators");
const dbhelpers_1 = __importDefault(require("../dbhelpers/dbhelpers"));
const uuid_1 = require("uuid");
const dbhelper = new dbhelpers_1.default();
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // GET DATA FROM FRONTEND
        const { rating, comment, user_id } = req.body;
        // VALIDATION OF FRONTEND DATA
        let { error } = validators_1.reviewSchema.validate(req.body);
        if (error) {
            console.log(error);
            return res.status(404).json({ error: error.details });
        }
        // const pool = await dbhelper.getConnection();
        const review_id = (0, uuid_1.v4)();
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
    }
    catch (error) { }
});
exports.createReview = createReview;
