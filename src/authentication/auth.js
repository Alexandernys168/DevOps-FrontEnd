import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    Auth,
    updateProfile,
    onAuthStateChanged
    } from "firebase/auth";
import { getFirestore, collection, addDoc, doc,
    setDoc, getDoc, query, getDocs, where, updateDoc } from 'firebase/firestore';
import {useEffect, useState} from "react";
import app from "./firebase";

export const auth = getAuth(app);
const firestore = getFirestore(app);

const authenticateUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User authenticated:', user.email);
        return user;
    } catch (error) {
        console.error('Authentication failed:', error.message);
        throw error;
    }
};

const signOutUser = async () => {
    try {
        await signOut(auth); // Sign out the current user
        console.log('User signed out');
    } catch (error) {
        console.error('Sign out failed:', error.message);
        throw error;
    }
};

export { authenticateUser, signOutUser };



export const registerUser = async (email, password, firstName,defaultRole) => {
    try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;

        console.log("user uid: " + user.uid);
        // Set the default role for the new user
        await updateRolesAndName(user.uid, email, firstName,[defaultRole]);

        console.log('User is registered with default role:', user);

        return user;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error; // Re-throw the error to handle it in the component
    }
};

// Set up the onAuthStateChanged observer
export const setupAuthStateObserver = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            console.log('User is signed in:', user.uid);
            // You can use the user object to access user data
        } else {
            // User is signed out
            console.log('User is signed out');
        }
    });
};

interface DbUser {
    firstName: string;
    email: string;
    roles: string[];
}

export const useAuthState = () => {
    const [user, setUser] = useState(null);
    const [dbUser, setDbUser] = useState({ firstName: '', email: '', roles: [] });
    const [loading, setLoading] = useState(true);
    const [userRoles, setUserRoles] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            setLoading(false);

            if (user) {
                // Fetch user roles from Firestore based on user UID
                try {
                    const userDocRef = doc(firestore, 'users', user.uid);
                    const docSnapshot = await getDoc(userDocRef);

                    if (docSnapshot.exists()) {
                        setUserRoles(docSnapshot.data().roles || []);
                        const userData = docSnapshot.data();
                        setDbUser(userData);
                    }

                } catch (error) {
                    console.error('Error fetching user roles:', error.message);
                }
            } else {
                // User is signed out
                setUserRoles([]);
                setDbUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // Use another useEffect to log userRoles after the state is updated
    useEffect(() => {
        console.log("user role: " + userRoles);
    }, [userRoles]);

    return { user, loading, userRoles, dbUser };
};

// Helper function to update user roles in Firestore
export const updateRolesAndName = async (userId, email, firstName,roles) => {
    const userDocRef = doc(firestore, 'users', userId);

    // Check if the document already exists
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
        // If the document exists, update the roles
        await setDoc(userDocRef, { userId, email, firstName, roles }, { merge: true });
    } else {
        // If the document doesn't exist, create it with the roles
        await setDoc(userDocRef, { userId, email, firstName, roles });
    }
};

// Function to fetch user data based on specified roles or fetch all users
export const getUsersByRole = async (role = null) => {
    const users = [];
    const notFound = [];

    try {
        // Fetch all users if no role is specified
        if (!role) {
            const allUsersQuery = query(collection(firestore, 'users'));
            const allUsersSnapshot = await getDocs(allUsersQuery);

            allUsersSnapshot.forEach((doc) => {
                users.push(doc.data());
            });
        } else {
            // Fetch users based on the specified role
            const roleUsersQuery = query(collection(firestore, 'users'), where('roles', 'array-contains', role));
            const roleUsersSnapshot = await getDocs(roleUsersQuery);

            roleUsersSnapshot.forEach((doc) => {
                users.push(doc.data());
            });

            if (roleUsersSnapshot.size === 0) {
                notFound.push({ role });
            }
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }

    return { users, notFound };
};

// Update user roles in Firestore
export const updateRolesInFirestore = async (userId: string, newRoles: string[]) => {
    const userDocRef = doc(firestore, 'users', userId);

    try {
        // Check if the document already exists
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
            // If the document exists, ensure roles array is defined and then update the roles
            const currentRoles = docSnapshot.data()?.roles || [];
            const updatedRoles = Array.from(new Set([...currentRoles, ...newRoles])); // Remove duplicates

            await updateDoc(userDocRef, { roles: updatedRoles });
        } else {
            console.error(`User with ID ${userId} not found in Firestore.`);
            // Handle the case where the user document does not exist
        }
    } catch (error) {
        console.error('Error updating user roles in Firestore:', error.message);
        // Handle the error as needed
    }
};

export interface User {
    userId: string;
    email: string;
    firstName: string| null;
    roles: string[];
}

export const getUserByEmail = async (email: string) => {
    try {
        const userQuery = query(collection(firestore, 'users'), where('email', '==', email));
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.size === 1) {
            const user = userSnapshot.docs[0].data();
            console.log("user: " + user);



            return { user };
        } else {
            return { user: null };
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { user: null};
    }
};




