
import axios from 'axios';

const apiUrl = 'http://localhost:8081/labresult/register'; // Change this URL to your actual API endpoint
const apiUrlForPatients = 'http://localhost:8083/patients/register';

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
