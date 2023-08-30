import express from "express";
import diagnoses from "../../data/diagnoses";
// import patients from "../../data/patients";
import patientService from "../services/patientService";
import { EntryWithoutId } from "../types";
// import { getDiagnosisForCode } from "../services/diagnoseService";
import utils from '../utils';

const toNewPatient = utils.toNewPatient;
const parseNewEntry = utils.parseNewEntry;

const router = express.Router();

router.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.status(200).json('pong');
});

router.get('/patients', (_req, res) => {
  res.status(200).json(patientService.getPrivacyPatients());
});

router.get('/diagnoses', (_req, res) => {
  res.status(200).json(diagnoses);
});


router.get('/patients/:id', (req, res) => {
  res.status(200).json(patientService.getPatient(req.params.id));
});

router.post('/patients', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch(error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/patients/:id/entries', (req, res) => {
  try {
    if (parseNewEntry(req.body)) {
      patientService.addNewEntry(req.params.id, req.body as EntryWithoutId);
      res.json(req.body);
    }
   } catch(error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/diagnoses', (_req, res) => {
  console.log('someone pinged here');
  res.status(200).json(diagnoses);
});

export default router;