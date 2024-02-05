import data from "../data/diagnoses";
import { Diagnosis } from "../types/types";

const diagnoses: Diagnosis[] = data as Diagnosis[];

const getDiagnoses = () => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose,
};
