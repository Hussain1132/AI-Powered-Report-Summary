import { extractTests } from "./ocrService.js";
import { normalizeTests } from "./normalizeService.js";
import { generateSummary } from "./summaryService.js";

export async function processReport(text) {
  try {
    // Step 1: extract raw tests
    const extracted = await extractTests(text);
    if (!extracted.tests_raw || extracted.tests_raw.length === 0) {
      return { status: "unprocessed", reason: "no tests found" };
    }

    // Step 2: normalize
    const normalized = await normalizeTests(extracted.tests_raw);
    if (!normalized.tests || normalized.tests.length === 0) {
      return { status: "unprocessed", reason: "could not normalize" };
    }

    // Step 3: summary
    const summaryObj = await generateSummary(normalized.tests);

    return {
      tests: normalized.tests,
      summary: summaryObj.summary,
      explanations: summaryObj.explanations,
      status: "ok"
    };
  } catch (error) {
    console.error("Process report error:", error);
    return { status: "error", reason: error.message };
  }
}
