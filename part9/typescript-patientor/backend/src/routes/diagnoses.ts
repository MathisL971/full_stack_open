import express from "express";
const router = express.Router();
import diagnoseService from "../services/diagnoseService";

router.get("/", (_req, res) => {
  res.json(diagnoseService.getDiagnoses());
});

router.post("/", (_req, res) => {
  res.json(diagnoseService.addDiagnose());
});

export default router;
