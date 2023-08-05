import express from "express";
import { getAgentsList } from '../controllers/agents.js';
import checkIfUpdating from "../middleware/checkIfUpdating.js";

const router = express.Router();

router.get('/', checkIfUpdating, getAgentsList);

export default router;