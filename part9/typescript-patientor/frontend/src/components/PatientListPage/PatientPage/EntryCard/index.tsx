import { Entry, Diagnosis } from "../../../../types";
import HealthCheckEntryCard from "./HealthCheckEntryCard";
import HospitalEntryCard from "./HospitalEntryCard";
import OccupationalHealthcareEntryCard from "./OccupationalHealthcareEntryCard";

interface EntryCardProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryCard = ({ entry, diagnoses }: EntryCardProps) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryCard entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheckEntryCard entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryCard entry={entry} diagnoses={diagnoses} />
      );
    default:
      return <div>Invalid entry type</div>;
  }
};

export default EntryCard;
