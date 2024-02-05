import patientEntries from "../data/patients";
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  NewEntry,
  Entry,
} from "../types/types";
import { v4 as uuidv4 } from "uuid";

const getPatients = (): Patient[] => {
  return patientEntries;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const addPatient = (newPatient: NewPatient): Patient => {
  const newPatientObj: Patient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: uuidv4(),
    ...newPatient,
  };

  patientEntries.push(newPatientObj);
  return newPatientObj;
};

const getPatient = (patientId: string): Patient | undefined => {
  const patient = patientEntries.find((p) => p.id === patientId);
  return patient;
};

const addPatientEntry = (userId: string, newEntry: NewEntry): Entry => {
  const patient: Patient | undefined = patientEntries.find(
    (p) => p.id === userId
  );
  if (patient) {
    const storedEntry: Entry = { id: uuidv4(), ...newEntry };
    patient.entries.push(storedEntry);
    return storedEntry;
  }

  throw new Error("Patient does not exist");
};

const patientService = {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addPatientEntry,
};
export default patientService;
