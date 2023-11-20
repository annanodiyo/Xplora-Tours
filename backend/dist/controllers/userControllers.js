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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.checkUserCredentials = exports.loginUser = exports.getAllUsers = exports.registerUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sqlConfig_1 = require("../config/sqlConfig");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { ExtendedUser } from "../middleware/verifyToken";
const dbhelpers_1 = __importDefault(require("../dbhelpers/dbhelpers"));
const validators_1 = require("../validators/validators");
const lodash_1 = require("lodash");
const dbhelper = new dbhelpers_1.default();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    console.log(req.headers);
    try {
        let { full_name, email, phone_number, password } = req.body;
        let { error } = validators_1.registerUserSchema.validate(req.body);
        if (error) {
            return res.status(404).json({ error: error.details });
        }
        const emailTaken = (yield dbhelper.query(`SELECT * FROM users WHERE email = '${email}'`)).recordset;
        if (!(0, lodash_1.isEmpty)(emailTaken)) {
            return res.json({ error: "This email is already in use" });
        }
        let user_id = (0, uuid_1.v4)();
        const hashedPwd = yield bcrypt_1.default.hash(password, 10);
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
    }
    catch (error) {
        // return res.json({
        //   error: error,
        // });
        console.log(error);
    }
});
exports.registerUser = registerUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let users = (yield pool.request().execute("fetchAllUsers")).recordset;
        return res.status(200).json({
            users: users,
        });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.getAllUsers = getAllUsers;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // console.log(req.body);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let user = yield pool
            .request()
            .input("email", email)
            .input("password", password)
            .execute("loginUser");
        if (!user.recordset.length) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const _a = user.recordset[0], { password: storedPassword } = _a, rest = __rest(_a, ["password"]);
        const correctPwd = yield bcrypt_1.default.compare(password, storedPassword);
        if (!correctPwd) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign(rest, process.env.secret, {
            expiresIn: "3600s",
        });
        console.log(token);
        return res.status(200).json({ message: "LogIn successful", token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "server error" });
    }
});
exports.loginUser = loginUser;
const checkUserCredentials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.info);
    if (req.info) {
        return res.json({
            information: req.info,
        });
    }
});
exports.checkUserCredentials = checkUserCredentials;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user_id } = req.params;
        // console.log(req);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const user = yield pool
            .request()
            .input("user_id", user_id)
            .execute("deleteUser");
        const rowsAffected = user.rowsAffected[0];
        if (rowsAffected > 0) {
            return res
                .status(200)
                .json({ message: "Deleted successfully", rowsAffected });
        }
        else {
            return res.status(404).json({ error: "No user found to delete" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(202).json({ error: "request failed" });
    }
});
exports.deleteUser = deleteUser;
