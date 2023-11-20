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
exports.getEvents = exports.deleteEvent = exports.updateEvent = exports.createEvent = void 0;
const validators_1 = require("../validators/validators");
const uuid_1 = require("uuid");
const dbhelpers_1 = __importDefault(require("../dbhelpers/dbhelpers"));
const sqlConfig_1 = require("../config/sqlConfig");
const mssql_1 = __importDefault(require("mssql"));
const dbhelper = new dbhelpers_1.default();
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { destination, description, duration, price, start_date } = req.body;
        let { error } = validators_1.eventsSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details });
        }
        const event_id = (0, uuid_1.v4)();
        let result = yield dbhelper.execute("createEvents", {
            event_id,
            destination,
            description,
            duration,
            price,
            start_date,
        });
        console.log(result);
        if (result) {
            return res.status(200).json({ message: "Event created successfully" });
        }
        else {
            return res.status(500).json({ message: "failed to create event" });
        }
    }
    catch (error) {
        console.error("Error creating event:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createEvent = createEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event_id = req.params.event_id;
        const { destination, description, duration, start_date, price } = req.body;
        const result = yield dbhelper.execute("updateEvent", {
            event_id,
            destination,
            description,
            duration,
            start_date,
            price,
        });
        console.log(result);
        if (result) {
            return res.status(200).json({
                message: "Event updated successfully",
            });
        }
        else {
            return res.status(404).json({
                message: "update failed",
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server error" });
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { event_id } = req.params;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let event = yield pool
            .request()
            .input("event_id", event_id)
            .execute("deleteEvent");
        const rowsAffected = event.rowsAffected[0];
        if (rowsAffected > 0) {
            return res
                .status(200)
                .json({ message: "Deleted successfully", rowsAffected });
        }
        else {
            return res.status(404).json({ error: "No event found to delete" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(202).json({ error: "request failed" });
    }
});
exports.deleteEvent = deleteEvent;
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let events = (yield pool.request().execute("fetchAllEvents")).recordset;
        //status logic
        const today = new Date();
        const eventsWithStatus = events.map((event) => {
            const eventStartDate = new Date(event.start_date);
            const eventEndDate = new Date(eventStartDate.getTime());
            eventEndDate.setDate(eventEndDate.getDate() + event.duration);
            if (eventStartDate <= today && today <= eventEndDate) {
                return Object.assign(Object.assign({}, event), { status: "Ongoing" });
            }
            else if (eventStartDate > today) {
                return Object.assign(Object.assign({}, event), { status: "Coming soon" });
            }
            else {
                return Object.assign(Object.assign({}, event), { status: "Past Event" });
            }
        });
        return res.status(200).json({
            events: eventsWithStatus,
        });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.getEvents = getEvents;
