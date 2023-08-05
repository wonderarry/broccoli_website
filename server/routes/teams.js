import express from "express";
import { getTeamsList } from '../controllers/teams.js';
import checkIfUpdating from "../middleware/checkIfUpdating.js";

const router = express.Router();

router.get('/', checkIfUpdating, getTeamsList);

export default router;
