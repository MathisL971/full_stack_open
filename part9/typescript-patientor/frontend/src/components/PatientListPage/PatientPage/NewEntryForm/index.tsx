import { useState } from "react";
import patientService from "../../../../services/patients";
import axios from "axios";
import { Entry, Patient } from "../../../../types";

interface newEntryFormProps {
  patient: Patient;
  setPatient: (updatedPatient: Patient) => void;
}

const NewEntryForm = (props: newEntryFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [type, setType] = useState("");

  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");

  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [error, setError] = useState("");

  const { patient, setPatient } = props;

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();

      const entryObj = {
        type,
        date,
        description,
        specialist,
        diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(", ") : [],
      };

      switch (type) {
        case "Hospital":
          Object.assign(entryObj, {
            discharge: { criteria, dischargeDate },
          });
          break;
        case "HealthCheck":
          Object.assign(entryObj, {
            healthCheckRating: Number(healthCheckRating),
          });
          break;
        case "OccupationalHealthcare":
          Object.assign(entryObj, {
            employerName,
            sickLeave: {
              startDate,
              endDate,
            },
          });
          break;
        default:
          Object.assign(entryObj, {});
      }

      console.log(entryObj);

      const newEntry: Entry = await patientService.createPatientEntry(
        patient.id,
        entryObj
      );

      setPatient({ ...patient, entries: patient.entries.concat(newEntry) });

      setDescription("");
      setDate("");
      setDiagnosisCodes("");
      setHealthCheckRating("");
      setSpecialist("");
      setType("");
      setCriteria("");
      setDischargeDate("");
      setEmployerName("");
      setStartDate("");
      setEndDate("");
      setType("");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        setError("Unknown error");
      }
      setDescription("");
      setDate("");
      setDiagnosisCodes("");
      setHealthCheckRating("");
      setSpecialist("");
      setType("");
      setCriteria("");
      setDischargeDate("");
      setEmployerName("");
      setStartDate("");
      setEndDate("");
      setType("");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <form
      style={{
        border: "solid 2px black",
        borderRadius: "5px",
        padding: "0 20px 20px",
      }}
      onSubmit={handleFormSubmit}
    >
      <h2>New Entry</h2>
      {error && (
        <div
          style={{
            padding: "7px 15px",
            borderRadius: "5px",
            border: "solid 2px red",
            color: "red",
            marginBottom: "10px",
          }}
        >
          !! {error} !!
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <label style={{ fontSize: "small", color: "gray" }}>Date</label>
          <input
            type="date"
            style={{ fontSize: "large" }}
            value={date}
            onChange={({ target }) => setDate(target.value)}
          ></input>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <label style={{ fontSize: "small", color: "gray" }}>
            Description
          </label>
          <input
            style={{ fontSize: "large" }}
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          ></input>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <label style={{ fontSize: "small", color: "gray" }}>Specialist</label>
          <input
            style={{ fontSize: "large" }}
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          ></input>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <label style={{ fontSize: "small", color: "gray" }}>
            Diagnoses Codes
          </label>
          <input
            style={{ fontSize: "large" }}
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
          ></input>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <label style={{ fontSize: "small", color: "gray" }}>Entry Type</label>
          <select
            onChange={({ target }) => setType(target.value)}
            style={{ fontSize: "large", padding: "1px 0" }}
            value={type}
          >
            <option value={""} defaultValue={""}></option>
            <option value={"Hospital"}>Hospital</option>
            <option value={"HealthCheck"}>Health Check</option>
            <option value={"OccupationalHealthcare"}>
              Occupational Healthcare
            </option>
          </select>
        </div>
        {type === "Hospital" && (
          <>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <label style={{ fontSize: "small", color: "gray" }}>
                Discharge Date
              </label>
              <input
                type="date"
                style={{ fontSize: "large" }}
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
              ></input>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <label style={{ fontSize: "small", color: "gray" }}>
                Criteria
              </label>
              <input
                style={{ fontSize: "large" }}
                value={criteria}
                onChange={({ target }) => setCriteria(target.value)}
              ></input>
            </div>
          </>
        )}
        {type === "HealthCheck" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <label style={{ fontSize: "small", color: "gray" }}>
              Health Check Rating
            </label>
            <input
              style={{ fontSize: "large" }}
              value={healthCheckRating}
              onChange={({ target }) => setHealthCheckRating(target.value)}
            ></input>
          </div>
        )}
        {type === "OccupationalHealthcare" && (
          <>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <label style={{ fontSize: "small", color: "gray" }}>
                Employer Name
              </label>
              <input
                style={{ fontSize: "large" }}
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              ></input>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <label style={{ fontSize: "small", color: "gray" }}>
                Sick Leave
              </label>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "5px" }}
              >
                <input
                  type="date"
                  style={{ fontSize: "large", flexGrow: "1" }}
                  value={startDate}
                  onChange={({ target }) => setStartDate(target.value)}
                ></input>
                <input
                  type="date"
                  style={{ fontSize: "large", flexGrow: "1" }}
                  value={endDate}
                  onChange={({ target }) => setEndDate(target.value)}
                ></input>
              </div>
            </div>
          </>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          marginTop: "15px",
          justifyContent: "space-between",
        }}
      >
        <button
          type="button"
          style={{
            padding: "10px 15px",
            backgroundColor: "orange",
            border: "none",
            borderRadius: "4px",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={() => {
            setDescription("");
            setDate("");
            setDiagnosisCodes("");
            setHealthCheckRating("");
            setSpecialist("");
            setType("");
            setCriteria("");
            setDischargeDate("");
            setEmployerName("");
            setStartDate("");
            setEndDate("");
            setType("");
          }}
        >
          Clear
        </button>
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#1976d2",
            border: "none",
            borderRadius: "4px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewEntryForm;
