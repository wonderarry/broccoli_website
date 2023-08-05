import express from "express";
import { registerAgent, registerTeam } from '../controllers/register.js'
const router = express.Router();

router.post("/agent", registerAgent);
router.post("/team", registerTeam);

export default router;