import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import "../../styles/home.css"
import {getUserByEmail, getUsersByRole, updateRolesInFirestore} from "../../authentication/auth";
import {Card, Typography, Button, Select, notification} from 'antd';
import axios from 'axios';

const {Title, Paragraph} = Typography;
const {Option} = Select;


interface User {
    userId: string;
    email: string;
    firstName: string | null;
    roles: string[];
}


const UserProfile: React.FC = () => {
    const {email} = useParams<{ email: string }>();
    const [user, setUser] = useState<any>(null)
    const [patients, setPatients] = useState<string[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<string | null>(null);


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
                const response = await axios.get('your-api-endpoint/patients');
                setPatients(response.data);
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
                    // Call your API to get patient information based on selectedPatient
                    const patientInfo = await axios.get(`your-api-endpoint/patients/${selectedPatient}`);

                    // Update Firestore with patient role and information
                    await updateRolesInFirestore(uid, ['Patient']);
                    await updateUser();

                    notification.success({
                        message: 'Patient Role Added',
                        description: `User ${user?.email} has been assigned the Patient role.`,
                    });
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
                            <div style={{marginTop: '20px'}}>
                                {!user?.roles.includes('Patient') && !user?.roles.includes('Doctor') && (
                                <Select
                                    placeholder="Select a patient"
                                    style={{width: 200, marginRight: '10px'}}
                                    onChange={handlePatientSelection}
                                    disabled={user?.roles.includes('Patient')}
                                >
                                    {patients.map((patient) => (
                                        <Option key={patient} value={patient}>
                                            {patient}
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
                                    <Button type="primary" onClick={() => handleMakeDoctor(user?.userId)} style={{ marginLeft: '10px' }}>
                                        Confirm Doctor Role
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Add other sections as needed */}
        </div>
    );
};

export default UserProfile;



