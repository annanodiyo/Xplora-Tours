import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/eventsControllers";

const event_router = Router();

event_router.post("/createEvent", createEvent);
event_router.put("/updateEvent", updateEvent);
event_router.delete("/delete/:event_id", deleteEvent);
event_router.get("/allEvents", getEvents);

export default event_router;
