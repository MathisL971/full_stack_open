import { useEffect, useState } from "react";
import { Patient, Diagnosis } from "../../../types";
import EntryCard from "./EntryCard/index";
import { useParams } from "react-router-dom";
import patientService from "../../../services/patients";
import NewEntryForm from "./NewEntryForm";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      patientService.getPatient(id).then((patient) => setPatient(patient));
    }
  }, []);

  if (!patient) {
    return <div>Could not find patient data</div>;
  }

  return (
    <div>
      <h1>{patient.name}</h1>
      <div>
        <p>
          SSN: {patient.ssn}
          <br />
          Occupation: {patient.occupation}
        </p>
      </div>
      <NewEntryForm patient={patient} setPatient={setPatient} />
      <div>
        <h2>Entries</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {patient.entries.map((entry) => {
            return (
              <EntryCard key={entry.id} entry={entry} diagnoses={diagnoses} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
