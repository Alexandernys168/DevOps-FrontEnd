import React, {useState} from 'react';
import {generateMockEvents, generateMockPatients} from '../components/MockDataGenerator';
import {sendEventToApi, sendPatientToApi} from '../services/ApiService';
import "../styles/LoginPageComponentStyle.css"
import {useAuthState} from "../authentication/auth";

const DataGenerationPage: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const [countForPatients, setCountForPatients] = useState<number>(0);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [feedbackForPatients, setFeedbackForPatients] = useState<String | null>(null);
    const { userRoles} = useAuthState();

    const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCount(Number(event.target.value));
    };

    const handleCountChangeForPatients = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountForPatients(Number(event.target.value));
    };

    const handleGenerateData = async () => {
        if (count <= 0 || !Number.isInteger(count)) {
            setFeedback('Please enter a valid positive integer for count.');
            return;
        }
        try {
            const mockData = generateMockEvents(count);
            // Loop through mockData and send each event individually
            for (const event of mockData) {
                await sendEventToApi(event);
            }
            console.log('All events sent successfully');
        } catch (error) {
            console.error('Error sending events:', error);
        }
    };

    const handleGenerateDataForPatients = async () => {
        if (countForPatients <= 0 || !Number.isInteger(countForPatients)) {
            setFeedbackForPatients('Please enter a valid positive integer for count.');
            return;
        }
        try {
            const mockData = generateMockPatients(countForPatients);
            // Loop through mockData and send each event individually
            for (const patient of mockData) {
                await sendPatientToApi(patient);
            }
            console.log('All events sent successfully');
        } catch (error) {
            console.error('Error sending events:', error);
        }
    };

    return (
        <div className="inner-body-page">
            <h1>Data Generation Page</h1>
            <div className="width-of-input">
                <h3>Lab Results Generator</h3>
                <label>
                    Enter the number of events to generate:
                    <input type="number" value={count} onChange={handleCountChange}/>
                </label>

                <button onClick={handleGenerateData}>Generate Data</button>
                {feedback && <p className="feedback-message">{feedback}</p>}
            </div>
            <div className="width-of-input">
                <h3>Patients Generator</h3>
                <label>
                    Enter the number of patients to generate:
                    <input type="number" value={countForPatients} onChange={handleCountChangeForPatients}/>
                </label>

                <button onClick={handleGenerateDataForPatients}>Generate Data</button>
                {feedbackForPatients && <p className="feedback-message">{feedbackForPatients}</p>}
            </div>
        </div>
    );
};

export default DataGenerationPage;
