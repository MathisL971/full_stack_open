import express from "express";
import cors from "cors";
import diaryRouter from "./routes/diaries";
const app = express();
app.use(express.json());
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  cors({
    origin: "http://localhost:5173", // specify the correct origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // enable cookies and HTTP authentication with credentials
    optionsSuccessStatus: 204, // respond with a 204 status code for preflight requests
  })
);

const PORT = 3000;

app.use("/api/diaries", diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
