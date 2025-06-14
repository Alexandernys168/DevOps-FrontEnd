
import axios from 'axios';

const labResultBaseUrl = process.env.REACT_APP_LABRESULT_BASE_URL || '';
const patientBaseUrl = process.env.REACT_APP_PATIENT_BASE_URL || '';

const apiUrl = `${labResultBaseUrl}/labresult/register`;
const apiUrlForPatients = `${patientBaseUrl}/patients/register`;

export const sendEventToApi = async (event: any) => {
    try {
        const response = await axios.post(apiUrl, event);
        console.log('Event sent successfully:', response.data);

    } catch (error) {
        console.error('Error sending event:', error);

    }
};

export const sendPatientToApi = async (patient: any) => {
    try {
        const response = await axios.post(apiUrlForPatients, patient);
        console.log('Event sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending event:', error);
    }
};
