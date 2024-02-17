import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    Auth,

    updateProfile,
    onAuthStateChanged
    } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import {useEffect, useState} from "react";
import app from "./firebase";

export const auth = getAuth(app);
const firestore = getFirestore(app);

const authenticateUser = async (email:string, password:string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User authenticated:', user.email);
        return user;
    } catch (error) {
        if(error instanceof Error)
            console.error('Authentication failed:', error.message);
            throw error;
    }
};

const signOutUser = async () => {
    try {
        await signOut(auth); // Sign out the current user
        console.log('User signed out');
    } catch (error) {
        if(error instanceof Error)
        console.error('Sign out failed:', error.message);
        throw error;
    }
};

export { authenticateUser, signOutUser };



export const registerUser = async (email:string, password:string, firstName:string,defaultRole:string) => {
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
    const [dbUser, setDbUser] = useState<DbUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [userRoles, setUserRoles] = useState<string[]>([]);

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
                        const userData = docSnapshot.data() as DbUser;
                        setDbUser(userData);
                    }

                } catch (error) {
                    if(error instanceof Error)
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
export const updateRolesAndName = async (userId:string, email:string, firstName:string,roles:string[]) => {
    const userDocRef = doc(firestore, 'users', userId);

    // Check if the document already exists
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
        // If the document exists, update the roles
        await setDoc(userDocRef, { email, firstName, roles }, { merge: true });
    } else {
        // If the document doesn't exist, create it with the roles
        await setDoc(userDocRef, { email, firstName, roles });
    }
};
