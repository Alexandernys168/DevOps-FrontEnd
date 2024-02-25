import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import "../../styles/home.css"
import {
    getUserByEmail,
    getUsersByRole,
    updateRolesInFirestore,
    updateUserWithPatientInfo, useAuthState
} from "../../authentication/auth";
import {Card, Typography, Button, Select, notification} from 'antd';
import axios from 'axios';

const {Title, Paragraph} = Typography;
const {Option} = Select;


import '../../styles/DataTable.css'
import '../../styles/expandable-events-row.css'
import DataTable, {TableColumn} from "react-data-table-component";


interface User {
    userId: string;
    email: string;
    firstName: string | null;
    roles: string[];
}

interface Patient {
    id: string;
    name: string;
    dateOfBirth: Date;
    emailFromPatient: string;
    phoneNumber: string;
}

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


const UserProfileForDoctor: React.FC = () => {
    const {email} = useParams<{ email: string }>();
    const [user, setUser] = useState<any>(null)
    const [patients, setPatients] = useState<Patient[] | undefined>();
    const [patientConfirmed, setPatientConfirmed] = useState<Patient | undefined>();
    const [selectedPatient, setSelectedPatient] = useState<string | undefined>();
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

                const response = await fetch(`http://localhost:8081/labresult/byPatient/${user?.name}`);

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
                        <button style={{textDecoration: 'underline'}}>More info</button>
                    </div>
                </Link>

        },
    ];


    useEffect(() => {

        const fetchUser = async () => {
            if (email) {
                const {user} = await getUserByEmail(email);
                setUser(user);
            }
        };
        fetchUser();
    }, [email]);

    useEffect(() => {
        // Fetch patients from your API and update the state
        const fetchPatients = async () => {
            try {
                //const response = await axios.get('http://localhost:8083/patients/events');
                const response = await fetch('http://localhost:8083/patients/events');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const rawData: string[] = await response.json();

                if (!rawData || !Array.isArray(rawData)) {
                    throw new Error('Invalid response format');
                }

                const parsedData = rawData.map((item, index) => {
                    try {
                        if (typeof item === 'object') {
                            // If it's already an object, no need to parse
                            return item;
                        } else {
                            // Parse the raw string and then parse the inner JSON
                            return JSON.parse(item);
                        }
                    } catch (parseError) {
                        if (parseError instanceof Error)
                            console.error(`Error parsing JSON at index ${index}:`, parseError.message);
                        console.log('Raw JSON string:', item); // Print the raw string for debugging
                        return null; // or handle the error as needed
                    }
                }).filter(item => item !== null) as Patient[];
                setPatients(parsedData);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []); // Fetch patients only once on component mount

    const handlePatientSelection = (value: string) => {
        setSelectedPatient(value);
    };

    const updateUser = async () => {
        try {
            if (email) {
                const {user} = await getUserByEmail(email);
                setUser(user);
            }
        } catch (error) {
            console.log('Error fetching updated user data:', error);
        }
    };

    const handleMakePatient = async (uid: string) => {
        try {
            if (selectedPatient) {

                if (user?.roles.includes('Patient')) {
                    notification.warning({
                        message: 'Role Update Warning',
                        description: 'User already has the Patient role.',
                    });
                } else {

                    const selectedPatientObject = patients?.find(patient => patient.id === selectedPatient);
                    if (selectedPatientObject) {
                        // Update Firestore with patient role and information
                        await updateRolesInFirestore(uid, ['Patient']);
                        await updateUserWithPatientInfo(uid, selectedPatientObject.id, selectedPatientObject.name,
                            selectedPatientObject.dateOfBirth, selectedPatientObject.phoneNumber);
                        await updateUser();

                        notification.success({
                            message: 'Patient Role Added',
                            description: `User ${user?.email} has been assigned the Patient role.`,
                        });
                    } else {
                        // Handle the case where the selected patient is not found
                        throw new Error('Selected patient not found.');
                    }
                }
            } else {
                notification.error({
                    message: 'Patient Selection Error',
                    description: 'Please select a patient before confirming the role.',
                });
            }
        } catch (error) {
            console.error('Error updating roles in Firestore:', error);
            notification.error({
                message: 'Role Update Error',
                description: 'An error occurred while updating roles in Firestore.',
            });
        }
    };

    const handleMakeDoctor = async (uid: string) => {
        try {
            if (user?.roles.includes('Doctor')) {
                notification.warning({
                    message: 'Role Update Warning',
                    description: 'User already has the Doctor role.',
                });
            } else {

                console.log("uid: " + uid);
                await updateRolesInFirestore(uid, ['Doctor']);
                await updateUser();
                notification.success({
                    message: 'Doctor Role Added',
                    description: `User ${user?.email} has been assigned the Doctor role.`,
                });
            }
        } catch (error) {
            console.error('Error updating roles in Firestore:', error);
            notification.error({
                message: 'Role Update Error',
                description: 'An error occurred while updating roles in Firestore.',
            });
        }
    };


    return (
        <div className="home-container">
            <div className="home-features">
                <div className="featuresContainer">
                    <div className="home-features1">
                        <div className="home-container2">
                            <h2 className="home-features-heading heading2">User Details</h2>
                        </div>
                        <div className="home-container3">
                            <Card title="User Information"
                                  style={{width: 300, backgroundColor: 'rgba(255, 255, 255, 0.65)'}}>
                                <Typography>
                                    <Title level={4}>{user?.firstName}</Title>
                                    <Paragraph>Email: {user?.email}</Paragraph>
                                    <Paragraph>Roles: {user?.roles.join(', ')}</Paragraph>
                                </Typography>
                            </Card>
                            {user?.roles.includes('Patient') && (
                                <Card title="Patient Information"
                                      style={{width: 300, backgroundColor: 'rgba(255, 255, 255, 0.65)'}}>
                                    <Typography>
                                        <Title level={4}>{user?.name}</Title>
                                        <Paragraph>Date of Birth: {user?.dateOfBirth ?
                                            new Date(user.dateOfBirth).toLocaleDateString() : 'N/A'}</Paragraph>
                                        <Paragraph>Phone number: {user?.phoneNumber}</Paragraph>
                                    </Typography>
                                </Card>
                            )}

                            <div style={{marginTop: '20px'}}>
                                {!user?.roles.includes('Patient') && !user?.roles.includes('Doctor') && (
                                    <Select
                                        placeholder="Select a patient"
                                        style={{width: 200, marginRight: '10px'}}
                                        onChange={handlePatientSelection}
                                        disabled={user?.roles.includes('Patient')}
                                    >
                                        {Array.isArray(patients) && patients.map((patient) => (
                                            <Option key={patient.id} value={patient.id}>
                                                {patient.name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                                {!user?.roles.includes('Patient') && !user?.roles.includes('Doctor') && (
                                    <Button type="primary" onClick={() => handleMakePatient(user?.userId)}>
                                        Confirm Patient Role
                                    </Button>
                                )}
                                {!user?.roles.includes('Doctor') && !user?.roles.includes('Patient') && (
                                    <Button type="primary" onClick={() => handleMakeDoctor(user?.userId)}
                                            style={{marginLeft: '10px'}}>
                                        Confirm Doctor Role
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-faq">
                <div className="faqContainer">
                    <div className='table-container'>
                    <div className="events-table-container" style={{paddingBottom:"2rem"}}>

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
                </div>


            </div>
            {/* Add other sections as needed */}
        </div>
    );
};

export default UserProfileForDoctor;



