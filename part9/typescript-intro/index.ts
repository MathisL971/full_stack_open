import express from "express";
const app = express();

import { calculator } from "./calculator";

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.post("calculator", (req, res) => {
  const { val1, val2, op } = req.body;
  const result = calculator(Number(val1), Number(val2), op);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
