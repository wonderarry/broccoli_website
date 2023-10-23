import express from "express";
import { getMappool, getMappoolStages } from "../controllers/mappool.js";
import checkIfUpdating from "../middleware/checkIfUpdating.js";

const router = express.Router();

router.get('/', checkIfUpdating, getMappoolStages);
router.get('/stages/:stageId', checkIfUpdating, getMappool)

export default router;