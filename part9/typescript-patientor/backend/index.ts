import express from "express";
import cors from "cors";

import patientsRouter from "./src/routes/patients";
import diagnoseRouter from "./src/routes/diagnoses";

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.use("/api/patients", patientsRouter);
app.use("/api/diagnoses", diagnoseRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
