import React, {useEffect, useState} from 'react';
import DataTable, {TableColumn} from 'react-data-table-component';
import {Link} from "react-router-dom";
import '../styles/DataTable.css'
import '../styles/expandable-events-row.css'
import {useAuthState} from "../authentication/auth";


interface Event {
    id: string;
    patientId: string;
    result: string;
    registeredAt: number;

}

interface LabResult {
    id: string;
    patientId: string;
    result: string;
    registeredAt: number;
}


const EventList: React.FC = () => {
    const [labResults, setLabResults] = useState<LabResult[]>([]);
    const {dbUser, loading} = useAuthState();

    useEffect(() => {
        const fetchData = async () => {
            try {

                // Check if dbUser is available
                if (!dbUser || loading) {
                    // Handle the case where dbUser is not available yet
                    console.log('dbUser is not available yet');
                    return;
                }

                const response = await fetch(`http://localhost:8081/labresult/${dbUser.firstName}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const rawData: LabResult[] = await response.json();

                if (!rawData || !Array.isArray(rawData)) {
                    throw new Error('Invalid response format');
                }

                setLabResults(rawData);
            } catch (error) {
                if (error instanceof Error)
                    console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [dbUser, loading]);


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
                <p>Lab results history</p>
            </div>

            <div className="events-table-container">

                <DataTable
                    className="inner-events-table-container"
                    title="Events"
                    columns={columns}
                    data={labResults as any[]}
                    pagination
                    responsive
                    highlightOnHover
                    noHeader/>
            </div>

        </div>


    );
};

export default EventList;
