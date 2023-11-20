import { Request, Response } from "express";
import { eventsSchema } from "../validators/validators";
import { v4 } from "uuid";
import Connection from "../dbhelpers/dbhelpers";
import { sqlConfig } from "../config/sqlConfig";
import mssql from "mssql";
import { ExtendedUser } from "../middlewares/verifyTokens";
import { isEmpty } from "lodash";

const dbhelper = new Connection();

export const createEvent = async (req: Request, res: Response) => {
  try {
    let { destination, description, duration, price, start_date } = req.body;

    let { error } = eventsSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details });
    }

    const event_id = v4();

    let result = await dbhelper.execute("createEvents", {
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
    } else {
      return res.status(500).json({ message: "failed to create event" });
    }
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event_id = req.params.event_id;
    const { destination, description, duration, start_date, price } = req.body;
    const result = await dbhelper.execute("updateEvent", {
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
    } else {
      return res.status(404).json({
        message: "update failed",
      });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { event_id } = req.params;

    const pool = await mssql.connect(sqlConfig);
    let event = await pool
      .request()
      .input("event_id", event_id)
      .execute("deleteEvent");

    const rowsAffected = event.rowsAffected[0];
    if (rowsAffected > 0) {
      return res
        .status(200)
        .json({ message: "Deleted successfully", rowsAffected });
    } else {
      return res.status(404).json({ error: "No event found to delete" });
    }
  } catch (error) {
    console.error(error);
    return res.status(202).json({ error: "request failed" });
  }
};

export const getEvents = async (req: ExtendedUser, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    let events = (await pool.request().execute("fetchAllEvents")).recordset;

    //status logic
    const today = new Date();
    const eventsWithStatus = events.map((event) => {
      const eventStartDate = new Date(event.start_date);
      const eventEndDate = new Date(eventStartDate.getTime());
      eventEndDate.setDate(eventEndDate.getDate() + event.duration);

      if (eventStartDate <= today && today <= eventEndDate) {
        return { ...event, status: "Ongoing" };
      } else if (eventStartDate > today) {
        return { ...event, status: "Coming soon" };
      } else {
        return { ...event, status: "Past Event" };
      }
    });
    return res.status(200).json({
      events: eventsWithStatus,
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};
