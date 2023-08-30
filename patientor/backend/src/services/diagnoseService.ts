import diagnoses from "../../data/diagnoses";
import { Diagnosis } from "../types";

export const getDiagnosisForCode = function(code: string): Diagnosis["name"] {
  const diagnally = diagnoses.find(diagnosis => diagnosis.code === code);
  if (diagnally) {
    return diagnally.name;
  } else {
    return '';
  }
};

