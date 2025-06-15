export interface LabResult {
  id: string;
  patientId: string;
  result: string;
  registeredAt: number;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: any;
  emailFromPatient?: string;
  email?: string;
  phoneNumber: string;
}

const LAB_RESULTS_KEY = 'labResults';
const PATIENTS_KEY = 'patients';

function read<T>(key: string): T[] {
  const data = sessionStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, data: T[]): void {
  sessionStorage.setItem(key, JSON.stringify(data));
}

export async function storeLabResult(event: LabResult): Promise<void> {
  const results = read<LabResult>(LAB_RESULTS_KEY);
  results.push(event);
  write(LAB_RESULTS_KEY, results);
}

export async function storePatient(patient: Patient): Promise<void> {
  const patients = read<Patient>(PATIENTS_KEY);
  patients.push(patient);
  write(PATIENTS_KEY, patients);
}

export async function getLabResultsByPatient(patientId: string): Promise<LabResult[]> {
  const results = read<LabResult>(LAB_RESULTS_KEY);
  return results.filter(r => r.patientId === patientId);
}

export async function getLabResultById(id: string): Promise<LabResult[]> {
  const results = read<LabResult>(LAB_RESULTS_KEY);
  return results.filter(r => r.id === id);
}

export async function getAllLabResults(): Promise<string[]> {
  const results = read<LabResult>(LAB_RESULTS_KEY);
  return results.map(r => JSON.stringify(r));
}

export async function getAllPatients(): Promise<string[]> {
  const patients = read<Patient>(PATIENTS_KEY);
  return patients.map(p => JSON.stringify(p));
}
