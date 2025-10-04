export function buildExtractPrompt(text) {
  return `
You are an assistant that extracts medical test entries (name, value, unit, status) from the given text.  
You must correct small typos but do *not* hallucinate extra tests.

Input text:
"""${text}"""

Output JSON with keys:
{
 "tests_raw": [
   "Name1 value unit (Status1)",
   "Name2 value unit (Status2)",
   ...
 ],
 "confidence": 0.8
}
`;
}

export function buildNormalizePrompt(tests_raw) {
  return `
You are an assistant that receives raw test strings and standardizes them.  
Input (an array of strings):
${JSON.stringify(tests_raw)}

You should output JSON in this format:
{
 "tests": [
   {"name":"Hemoglobin","value":10.2,"unit":"g/dL","status":"low","ref_range":{"low":12.0,"high":15.0}},
   ...
 ],
 "normalization_confidence": 0.85
}
Use common medical reference ranges (you may note uncertainties).
Do not add tests that were not in the input.
`;
}

export function buildSummaryPrompt(tests) {
  return `
You are an assistant that writes patient-friendly summary and explanation of medical test results.
Input:
${JSON.stringify(tests)}

Output JSON:
{
 "summary": "a short summary sentence",
 "explanations": [
    "Explanation for first test in plain language",
    "Explanation for next test", ...
 ]
}
Do not diagnose, just explain possible interpretations.
`;
}
