
import axios from 'axios';

const apiUrl = 'http://localhost:8082/addlabresults'; // Change this URL to your actual API endpoint

export const sendEventToApi = async (event: any) => {
    try {
        const response = await axios.post(apiUrl, event);
        console.log('Event sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending event:', error);
    }
};
