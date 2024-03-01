import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import "../../styles/home.css"

import {Card, Typography, Button, Select, notification} from 'antd';
import axios from 'axios';

const {Title, Paragraph} = Typography;
const {Option} = Select;



interface Event {
    id: string;
    patientId: string;
    result: string;
    registeredAt: number;

}


const DetailedLabResult: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [user, setUser] = useState<any>(null)
    const [event, setEvent] = useState<Event | undefined>();


    useEffect(() => {
        // Fetch patients from your API and update the state
        const fetchLabResult = async () => {
            try {
                //const response = await axios.get('http://localhost:8083/patients/events');
                const response = await fetch(`https://labresult.app.cloud.cbh.kth.se/labresult/byLabId/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const rawData: Event[] = await response.json();

                if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
                    throw new Error('Invalid response format');
                }

                const parsedData: Event = rawData[0];
                console.log(parsedData);

                setEvent(parsedData);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchLabResult();
    }, []); // Fetch patients only once on component mount


    return (
        <div className="home-container">
            <div className="home-features">
                <div className="featuresContainer">
                    <div className="home-features1">
                        <div className="home-container2">
                            <h2 className="home-features-heading heading2">Lab Details</h2>
                        </div>
                        <div className="home-container3">
                            <Card title="Lab Result - detailed information"
                                  style={{width: 500, backgroundColor: 'rgba(255, 255, 255, 0.65)'}}>
                                <Typography>
                                    <Title level={4}>{event?.patientId}</Title>
                                    <Paragraph>Result: {event?.result}</Paragraph>
                                    <Paragraph>Registered at: {event?.registeredAt ?
                                        new Date(event.registeredAt).toLocaleDateString() : 'N/A'}</Paragraph>
                                </Typography>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            {/* Add other sections as needed */}
        </div>
    );
};

export default DetailedLabResult;



