import {storeLabResult, storePatient} from './SessionApi';

export const sendEventToApi = async (event: any) => {
    try {
        await storeLabResult(event);
        console.log('Event stored locally');
    } catch (error) {
        console.error('Error storing event:', error);
    }
};

export const sendPatientToApi = async (patient: any) => {
    try {
        await storePatient(patient);
        console.log('Patient stored locally');
    } catch (error) {
        console.error('Error storing patient:', error);
    }
};
