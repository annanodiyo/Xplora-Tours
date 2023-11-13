"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (res, req, next) => {
    try {
        let token = req.headers["token"];
        if (!token) {
            res.status(404).json({ message: "access denied" });
        }
        const data = jsonwebtoken_1.default.verify(token, process.env.secret);
        req.information = data;
    }
    catch (error) {
        console.log(error);
    }
    next();
};
exports.verifyToken = verifyToken;
