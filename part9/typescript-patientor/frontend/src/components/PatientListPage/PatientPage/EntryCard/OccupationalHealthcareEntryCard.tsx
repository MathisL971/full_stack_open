import { Diagnosis, OccupationalHealthcareEntry } from "../../../../types";

interface OccupationalHealthcareEntryCardProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryCard = ({
  entry,
  diagnoses,
}: OccupationalHealthcareEntryCardProps) => {
  return (
    <div style={{ border: "solid 2px green", padding: "20px" }}>
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

export default OccupationalHealthcareEntryCard;
