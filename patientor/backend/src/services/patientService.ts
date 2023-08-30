import patients from "../../data/patients";
import { v1 as uuid } from 'uuid';

import { Patient, NewPatient, NonSensitivePatient, EntryWithoutId } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addNewEntry = (id: string, entry: EntryWithoutId) => {
  const patient = getPatient(id);
  const newEntry = {
    id: uuid(),
    ...entry
  };

  if (patient) {
    patient.entries.push(newEntry);
  }
};

const getPrivacyPatients = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (patient: NewPatient) => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPrivacyPatients,
  addPatient,
  getPatient,
  addNewEntry
};