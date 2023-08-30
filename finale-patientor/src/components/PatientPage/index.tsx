import { Patient, Entry } from "../../types";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis } from "../../types";

interface PatientPageProps {
  patientId: string | undefined,
  diagnoses: Diagnosis[],
}
interface EntriesProps {
  entries: Entry[] | undefined,
  diagnoses: Diagnosis[],
}
interface EntryItemProps {
  entry: Entry | undefined,
  diagnoses: Diagnosis[],
}

interface DiagnosisCodesProps {
  codes: Array<string>,
  diagnoses: Diagnosis[],
}

const DiagnosisCodes =  (props: DiagnosisCodesProps) => {
  const codes = props.codes;
  return (
    <ul>
      {codes.map(code => {
        return <li key={code + String(Math.ceil(Math.random() * 10000))}>
          {code} {(props.diagnoses.find(diagnosis => diagnosis.code === code))?.name}
          </li>
      })}
    </ul>
  )
};

interface HospitalEntryProps {
  entry: Entry,
  style: object,
  diagnoses: Diagnosis[],
}

interface HealthCheckEntryProps {
  entry: Entry,
  style: object,
  diagnoses: Diagnosis[],
}

interface OccupationalHealthcareEntryProps {
  entry: Entry,
  style: object,
  diagnoses: Diagnosis[],
}

const HospitalEntry = (props: HospitalEntryProps) => {
  if (props.entry.type !== 'Hospital') {
    throw new Error;
  }
  return (
    <div style={props.style}>
      <p><strong>Hospital Entry</strong></p>
      <p>{props.entry.date}</p>
      <p>Discharge: {props.entry.discharge.date}</p>
      <p><em>{props.entry.description}</em></p>
      <p>diagnose by {props.entry.specialist}</p>
      {props.entry.diagnosisCodes 
      ? <DiagnosisCodes diagnoses={props.diagnoses} codes={props.entry.diagnosisCodes}/>
      : ''}
    </div>

  );
}


const HealthCheckEntry = (props: HealthCheckEntryProps) => {
  if (props.entry.type !== 'HealthCheck') {
    throw new Error;
  }
  return (
    <div style={props.style}>
      <p><strong>Health Check Entry</strong></p>
      <p>{props.entry.date}</p>
      <p>Rating: {props.entry.healthCheckRating}</p>
      <p><em>{props.entry.description}</em></p>
      <p>diagnose by {props.entry.specialist}</p>
      {props.entry.diagnosisCodes 
      ? <DiagnosisCodes diagnoses={props.diagnoses} codes={props.entry.diagnosisCodes}/>
      : ''}
    </div>

  );
}


const OccupationalHealthcareEntry = (props: OccupationalHealthcareEntryProps) => {
  if (props.entry.type !== 'OccupationalHealthcare') {
    throw new Error;
  }
   return (
    <div style={props.style}>
      <p><strong>Occupational Healthcare Entry</strong></p>
      <p>{props.entry.date}</p>
      <p><em>{props.entry.description}</em></p>
      <p>diagnose by {props.entry.specialist}</p>
      <p>Employer: {props.entry.employerName}</p>
      {props.entry.diagnosisCodes 
      ? <DiagnosisCodes diagnoses={props.diagnoses} codes={props.entry.diagnosisCodes}/>
      : ''}
    </div>

  );
}
const EntryItem = (props: EntryItemProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  const entry = props.entry;
  const EntryStyle = {
    border: "1px solid black",
    borderRadius: "5px"
  }
  if (entry === undefined) {
    return <p></p>
  }

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry diagnoses={props.diagnoses} entry={entry} style={EntryStyle}/>;
    case "HealthCheck":
      return <HealthCheckEntry diagnoses={props.diagnoses} entry={entry} style={EntryStyle}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry diagnoses={props.diagnoses} entry={entry} style={EntryStyle}/>
    default:
      assertNever(entry);
      return <p></p>
  }

  // if (!entry?.diagnosisCodes) {
  //   return (
  //     <li style={EntryStyle}>
  //       <p>{entry?.date}: {entry?.description}</p>
  //     </li>
  //   )
  // } else {
  //   return (
  //     <li style={EntryStyle}>
  //       <p>{entry?.date}: {entry?.description}</p>
  //       <DiagnosisCodes 
  //       codes={entry.diagnosisCodes}
  //       diagnoses={props.diagnoses}
  //        />
  //     </li>
  //   )
  // }
}

const Entries = (props: EntriesProps) => {
  return (
    <ul>
      <strong>entries</strong>
      {props.entries?.map(entry => {
        return (
          <EntryItem key={entry.id} 
          entry={entry}
          diagnoses={props.diagnoses}
          />
        )
      })}
    </ul>
  )
}

const PatientPage = (props: PatientPageProps) => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  const id = useParams().id

  useEffect(() => {
    axios.get('http://localhost:3001/api/patients/' + id).then(response => {
      setPatient(response.data)
    }).catch((error: unknown) => {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
    })
  }, []);

  return (
    <div>
      <h1>A patient's page</h1>
      <p>Name: {patient?.name}</p>
      <p>DOB: {patient?.dateOfBirth}</p>
      <p>Occupation: {patient?.occupation}</p>
      <p>{patient?.gender}</p>
      <Entries entries={patient?.entries} diagnoses={props.diagnoses} />
    </div>
  )
}

export default PatientPage