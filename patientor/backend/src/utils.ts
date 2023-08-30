import {NewPatient, Gender} from './types';

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isSSN = (): boolean => {
  return true;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn) || !isSSN()) {
    throw new Error('Incorrect or missing SSN');
  }
  return ssn;
}

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation ' + occupation);
  }
  return occupation;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object &&
   'ssn' in object && 'gender' in object && "occupation" in object)  {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
};

function parseDescription(description: unknown) {
  if (!description || typeof description !== 'string') {
    throw new Error('Incorrect or missing description ' + description);
  }
  return description;
}

function parseSpecialist(specialist: unknown) {
  if (!specialist || typeof specialist !== 'string') {
    throw new Error('Incorrect or missing specialist ' + specialist);
  }
  return specialist;
}
// function parseDiagnosisCodes(description: unknown) {
//   return description;
// }

function isDischarge(discharge: unknown): boolean {
  if (typeof discharge === 'object' && discharge !== null) {
    const keys = Object.keys(discharge);
    if (keys.includes('date')
     && keys.includes('criteria')) {
      return true;
     }
  }
  return false;
}

function parseDischarge(discharge: unknown) {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge ' + discharge);
  }
  return discharge;
}
function parseEmployerName(employerName: unknown) {
  if (!employerName) {
    throw new Error('Incorrect or missing employerName ' + employerName);
  }
  return employerName;
}
function parseHealthCheckRating(healthCheckRating: unknown) {
  if (!healthCheckRating) {
    throw new Error('Incorrect or missing healthCheckRating ' + healthCheckRating);
  }
  return healthCheckRating;
}

const parseNewEntry = function(object: unknown): boolean {
  if (!object || typeof object !== 'object' || !('type' in object)) {
    throw new Error('Incorrect or missing data');
  }
  if ('description' in object && 'date' in object &&
    'specialist' in object)  {
    parseDescription(object.description);
    parseSpecialist(object.specialist);
    parseDate(object.date);
  } else {
    throw new Error('Incorrect or missing data');
  }
  // if ('diagnosisCodes' in object) {
  //   parseDiagnosisCodes(object.diagnosisCodes);
  // } 
  switch(object.type) {
    case 'Hospital':
      if (!('discharge' in object)) {
        throw new Error('Hospital missing discharge');
      }
      parseDischarge(object.discharge);
      break;
    case "OccupationalHealthcare":
      if (!('employerName' in object)) {
        throw new Error('missing occupation in occupationalHealthcare entry.');
      }
      parseEmployerName(object.employerName);
      break;
    case "HealthCheck":
      if (!('healthCheckRating' in object)) {
        throw new Error('missing rating in health check entry.');
      }
      parseHealthCheckRating(object.healthCheckRating);
      break;
    default:
      throw new Error;
  }
  return true;

};

// const toNewEntry = (object: unknown): EntryWithoutId => {
//   if (!object || typeof object !== 'object' || !('type' in object)) {
//     throw new Error('Incorrect or missing data');
//   }
//   let newEntry;
//   if ('description' in object && 'date' in object &&
//   'specialist' in object)  {
//   switch(object.type) {
//     case 'Hospital':
//       newEntry = {
//         description: parseDescription(object.description),
//         date: parseDate(object.date),
//         specialist: parseSpecialist(object.specialist),
//         diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
//       };
//       break;
//     case "OccupationalHealthcare":
//       newEntry = {};
//       break;
//     case "HealthCheck":
//       newEntry = {};
//       break;
//     default:
//       throw new Error;
//   }
//   return newEntry;
// };


export default {toNewPatient, parseNewEntry};


