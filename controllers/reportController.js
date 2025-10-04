import { processReport } from "../services/reportPipeline.js";

export async function processReportHandler(req, res) {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "No input text provided" });
    }

    const result = await processReport(text);

    // if pipeline says unprocessed (e.g. due to hallucination or no tests)
    if (result.status && result.status !== "ok") {
      return res.json(result);
    }

    // else normal
    return res.json(result);

  } catch (err) {
    console.error("Error in processReportHandler:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
