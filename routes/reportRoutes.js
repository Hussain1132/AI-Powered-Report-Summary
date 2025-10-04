import express from "express";
import { processReportHandler } from "../controllers/reportController.js";

const router = express.Router();

// POST /api/report/process
router.post("/process", processReportHandler);

export default router;
