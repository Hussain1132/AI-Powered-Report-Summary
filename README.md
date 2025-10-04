# AI-Powered-Report-Summary

Report analysis and summary of medical reports with OCR and text inputs

## Setup

1. `git clone …`  
2. `npm install`  
3. Put your OpenAI key in `.env`  
4. `npm start` or `node server.js`

## API

- **POST /api/report/process**  
  Body:
  ```json
  { "text": "CBC: Hemglobin 10.2 g/dL (Low), WBC 11200 /uL (Hgh)" }

