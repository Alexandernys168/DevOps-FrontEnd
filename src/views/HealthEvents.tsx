import React, {useEffect, useState} from 'react';
import DataTable, {TableColumn} from 'react-data-table-component';
import {Link} from "react-router-dom";
import '../styles/DataTable.css'
import '../styles/expandable-events-row.css'
import {getAllLabResults} from '../services/SessionApi';


interface Event {
    id: string;
    patientId: string;
    result: string;
    registeredAt: number;

}


const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const rawData: string[] = await getAllLabResults();

                if (!rawData || !Array.isArray(rawData)) {
                    throw new Error('Invalid response format');
                }

                const parsedData = rawData
                    .map((str, index) => {
                        try {
                            return JSON.parse(str);
                        } catch (parseError) {
                            if (parseError instanceof Error)
                                console.error(`Error parsing JSON at index ${index}:`, parseError.message);
                            console.log('Raw JSON string:', str);
                            return null;
                        }
                    })
                    .filter(item => item !== null);
                setEvents(parsedData);
            } catch (error) {
                if (error instanceof Error) console.error('Error fetching data:', error.message);
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
            name: 'Username',
            selector: (row) => row.patientId,
            sortable: true,
        },
        {
            name: 'Result',
            selector: (row) => row.result,
            sortable: true,
        },
        {
            name: 'Registered At',
            selector: (row) => {
                console.log('Timestamp:', row.registeredAt);
                const date = new Date(row.registeredAt);
                console.log('Date object:', date);
                return `${date.toISOString().slice(0, 10)}`;
            },
            sortable: true,
        },
        {
            name: '',
            cell: (row) =>
                <Link to={`/health-events/${row.id}`}>
                    <div>
                        <button style={{textDecoration: 'underline' }}>More info</button>
                    </div>
                </Link>

        },
    ];

    return (

        <div className='table-container'>
            <div className="table-type">
                <p>Lab results history</p>
            </div>

            <div className="events-table-container">

                <DataTable
                    className="inner-events-table-container"
                    title="Events"
                    columns={columns}
                    data={events as any[]}
                    pagination
                    responsive
                    highlightOnHover
                    noHeader/>
            </div>

        </div>


    );
};

export default EventList;
