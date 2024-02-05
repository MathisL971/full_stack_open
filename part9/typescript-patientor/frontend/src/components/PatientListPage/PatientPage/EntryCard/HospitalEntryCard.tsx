import { Diagnosis, HospitalEntry } from "../../../../types";

interface HospitalEntryCardProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryCard = ({ entry, diagnoses }: HospitalEntryCardProps) => {
  return (
    <div style={{ border: "solid 2px red", padding: "20px" }}>
      Date: {entry.date}
      <br />
      Description: {entry.description}
      <br />
      {entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 && (
        <ul>
          {entry.diagnosisCodes.map((dc) => {
            const diagnosis = diagnoses.find((d) => d.code === dc);
            return (
              <li key={dc}>
                {dc}:{" "}
                {diagnosis
                  ? diagnosis.name
                  : "No diagnosis found for this code"}
              </li>
            );
          })}
        </ul>
      )}
      Diagnosed by {entry.specialist}
    </div>
  );
};

export default HospitalEntryCard;
