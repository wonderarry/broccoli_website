import { google, sheets_v4 } from "googleapis";
import { OsuMap, Mappool } from "../models/Mappool.js";
import { createSheetsInstance } from "../utility/createSheetsInstance.js";

export const getMappoolStages = async (req, res) => {
    try {
      const stages = await Mappool.find({}, 'order stage').sort('order');
      res.status(200).json(stages);
    } catch (error) {
      console.error("Error fetching mappool stages:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

export const getMappool = async (req, res) => {
    const stageId = req.params['stageId'];
    const result = await Mappool.findOne({ _id: stageId });
    res.status(200).json(result);
}

