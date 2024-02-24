import React, {useEffect, useState} from 'react';
import DataTable, {TableColumn} from 'react-data-table-component';
import {Link} from "react-router-dom";
import '../styles/DataTable.css'
import '../styles/expandable-events-row.css'
import '../styles/informationStyles.css'
import {getUsersByRole, updateRolesInFirestore} from "../authentication/auth";


interface User {
    userId: string;
    email: string;
    firstName: string | null;
    roles: string[];
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<{ [email: string]: string[] }>({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsersResult = await getUsersByRole();

                // Extract the 'users' array from the result
                const allUsers = allUsersResult.users;

                setUsers(allUsers);
            } catch (error) {
                console.log('Error fetching user data:', error);
            }
        };

        // Call the fetchUsers function once when the component mounts
        fetchUsers();
    }, []);

    const updateUsersList = async () => {
        try {
            const allUsersResult = await getUsersByRole();

            // Extract the 'users' array from the result
            const allUsers = allUsersResult.users;

            setUsers(allUsers);
        } catch (error) {
            console.log('Error fetching updated user data:', error);
        }
    };

    const handleMakePatient = async (uid: string) => {
        try {

            console.log("uid: " + uid);
            await updateRolesInFirestore(uid, ['Patient']);
            await updateUsersList();
        } catch (error) {
            console.error('Error updating roles in Firestore:', error);
        }
    };

    const handleMakeDoctor = async (uid: string) => {
        try {
            console.log("uid: " + uid);
            await updateRolesInFirestore(uid, ['Doctor']);
            await updateUsersList();
        } catch (error) {
            console.error('Error updating roles in Firestore:', error);
        }
    };


    const columns: TableColumn<User>[] = [
        {
            name: 'Email',
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row) => row.firstName ?? "",
            sortable: true,
        },
        {
            name: 'Result',
            selector: (row) => row.roles.join(", "),
            sortable: true,
        },
        {
            name: '',
            cell: (row) =>
                <Link to={`/users/${row.email}`}>
                    <div>
                        <button style={{textDecoration: 'underline'}}>More info</button>
                    </div>
                </Link>

        },
    ];

    return (


                <div className="featuresContainer">
                    <div className="home-features2">
                        <div className="home-container2">
                            <h2 className="home-features-heading heading2">User List for Admin</h2>
                        </div>

                            <div className='table-container'>


                                <div className="events-table-container">

                                    <DataTable
                                        className="inner-events-table-container"
                                        title="Events"
                                        columns={columns}
                                        data={users as User[]}
                                        pagination
                                        responsive
                                        highlightOnHover
                                        noHeader/>
                                </div>

                            </div>
                        </div>
                    </div>





    );
};

export default UserList;
