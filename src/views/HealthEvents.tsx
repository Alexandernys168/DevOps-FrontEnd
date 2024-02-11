import React, {useEffect, useState} from 'react';
import DataTable, {TableColumn} from 'react-data-table-component';
import {Link} from "react-router-dom";
import '../styles/DataTable.css'
import '../styles/expandable-events-row.css'



interface Event {
    id: string;
    patientId: string;
    result: string;

    // Add other properties as needed
}


const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8082/allevents');

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const rawData: string[] = await response.json();

                if (!rawData || !Array.isArray(rawData)) {
                    throw new Error('Invalid response format');
                }

                // Parse the received strings into an array of Event objects
                const parsedData = rawData.map((str, index) => {
                    try {
                        // Parse the raw string and then parse the inner JSON
                        const innerJson = JSON.parse(JSON.parse(str));
                        return innerJson;
                    } catch (parseError) {
                        if (parseError instanceof Error)
                            console.error(`Error parsing JSON at index ${index}:`, parseError.message);
                        console.log('Raw JSON string:', str); // Print the raw string for debugging
                        return null; // or handle the error as needed
                    }
                }).filter(item => item !== null);

                setEvents(parsedData);
            } catch (error) {
                if (error instanceof Error)
                    console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);


    const columns: TableColumn<Event>[] = [
        {
            name: 'ID',
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row) => row.patientId,
            sortable: true,
        },
        {
            name: 'Result',
            selector: (row) => row.result,
            sortable: true,
        },
        {
            name: '',
            cell: (row) =>
                <Link to={`/event-details/${row.id}`}>
                    <div>
                        <button style={{textDecoration: 'underline' }}>More info</button>
                    </div>
                </Link>

        },
    ];

    return (

        <div className='table-container'>
            <div className="table-type">
                <p>Payment history</p>
            </div>

            <div className="events-table-container">

                <DataTable
                    className="inner-events-table-container"
                    title="Events"
                    columns={columns}
                    data={events}
                    pagination
                    responsive
                    highlightOnHover
                    noHeader/>
            </div>

        </div>


    );
};

export default EventList;
