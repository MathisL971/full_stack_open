import {
  Gender,
  NewPatient,
  NewEntry,
  Diagnosis,
  HealthCheckRating,
  SickLeave,
  Discharge,
} from "./types/types";

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newPatient;
  }

  throw new Error("Missing request object attributes");
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  console.log(object);

  if (
    "date" in object &&
    "description" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "type" in object
  ) {
    const entryType = parseEntryType(object.type);
    console.log(entryType);

    let newEntry: NewEntry;

    switch (entryType) {
      case "Hospital":
        if ("discharge" in object) {
          newEntry = {
            type: entryType,
            date: parseDate(object.date),
            description: parseDescription(object.description),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            discharge: parseDischarge(object.discharge),
          };
          return newEntry;
        }
        break;
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          newEntry = {
            type: entryType,
            date: parseDate(object.date),
            description: parseDescription(object.description),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          return newEntry;
        }
        break;
      case "OccupationalHealthcare":
        if ("employerName" in object && "sickLeave" in object) {
          newEntry = {
            type: entryType,
            date: parseDate(object.date),
            description: parseDescription(object.description),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            employerName: parseName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave),
          };
          return newEntry;
        }
        break;
      default:
        throw new Error("Must select a specific entry type");
    }
  }

  throw new Error("Missing request object attributes");
};

const parseEntryType = (
  type: unknown
): "Hospital" | "HealthCheck" | "OccupationalHealthcare" => {
  if (!isString(type) || !isEntryType(type)) {
    throw new Error("Incorrect or missing entry type");
  }

  return type;
};

const isEntryType = (
  type: string
): type is "Hospital" | "HealthCheck" | "OccupationalHealthcare" => {
  return ["Hospital", "HealthCheck", "OccupationalHealthcare"].includes(type);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name.");
  }

  return name;
};

const parseDateOfBirth = (dob: unknown): string => {
  if (!isString(dob)) {
    throw new Error("Incorrect or missing date of birth.");
  }

  return dob;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn.");
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender.");
  }

  return gender;
};

const isGender = (text: string): text is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(text);
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing date of birth.");
  }

  return occupation;
};

const isString = (text: unknown): text is string => {
  return text instanceof String || typeof text === "string";
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error("Incorrect or missing date");
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseHealthCheckRating = (object: unknown): HealthCheckRating => {
  if (!isNumber(object) || !isHealthCheckRating(object)) {
    console.log("throwing error");
    throw new Error("Incorrect health check rating");
  }

  console.log("returning");
  return object;
};

const isNumber = (number: unknown): number is number => {
  const res = number instanceof Number || typeof number === "number";
  return res;
};

const isHealthCheckRating = (number: number): number is HealthCheckRating => {
  const res = Object.values(HealthCheckRating).includes(number);
  return res;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!isObject(sickLeave) || !isSickLeave(sickLeave)) {
    throw new Error("Incorrect or missing sick leave");
  }
  return sickLeave;
};

const isObject = (object: unknown): object is object => {
  const res = object instanceof Object || typeof object === "object";
  return res;
};

const isSickLeave = (object: object): object is SickLeave => {
  return (
    "startDate" in object &&
    isString(object.startDate) &&
    object.startDate.length !== 0 &&
    "endDate" in object &&
    isString(object.endDate) &&
    object.endDate.length !== 0
  );
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!isObject(discharge) || !isDischarge(discharge)) {
    throw new Error("Incorrect or missing discharge");
  }

  return discharge;
};

const isDischarge = (object: object): object is Discharge => {
  const res =
    "dischargeDate" in object &&
    isString(object.dischargeDate) &&
    object.dischargeDate.length !== 0 &&
    "criteria" in object &&
    isString(object.criteria) &&
    object.criteria.length !== 0;
  return res;
};
