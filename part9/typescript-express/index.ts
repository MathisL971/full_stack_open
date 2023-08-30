import express from "express";
import { calculateBmi } from "../typescript-exercises/bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res.send("malformatted parameters");
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (!Number.isNaN(heightNum) && !Number.isNaN(weightNum)) {
    res.send({
      weightNum,
      heightNum,
      bmi: calculateBmi(heightNum, weightNum),
    });
  }

  res.send("malformatted parameters");
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
