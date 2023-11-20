"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsSchema = exports.reviewSchema = exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUserSchema = joi_1.default.object({
    full_name: joi_1.default.string(),
    email: joi_1.default.string().email(),
    phone_number: joi_1.default.string().min(10),
    password: joi_1.default.string(),
});
exports.reviewSchema = joi_1.default.object({
    rating: joi_1.default.number(),
    comment: joi_1.default.string(),
    user_id: joi_1.default.string(),
});
exports.eventsSchema = joi_1.default.object({
    destination: joi_1.default.string(),
    description: joi_1.default.string(),
    duration: joi_1.default.number(),
    start_date: joi_1.default.date(),
    price: joi_1.default.number(),
});
