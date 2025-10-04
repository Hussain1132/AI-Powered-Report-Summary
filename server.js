import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// mount routes
app.use("/api/report", reportRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  
});
