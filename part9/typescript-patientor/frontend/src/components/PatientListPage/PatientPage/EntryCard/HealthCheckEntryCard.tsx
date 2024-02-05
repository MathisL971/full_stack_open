import { Diagnosis, HealthCheckEntry } from "../../../../types";

interface HealthCheckEntryCardProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntryCard = ({
  entry,
  diagnoses,
}: HealthCheckEntryCardProps) => {
  return (
    <div style={{ border: "solid 2px blue", padding: "20px" }}>
      Date: {entry.date}
      <br />
      Description: {entry.description}
      <br />
      Rating: {entry.healthCheckRating}
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

export default HealthCheckEntryCard;
