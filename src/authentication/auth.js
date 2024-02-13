import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged
    } from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {useEffect, useState} from "react";
import app from "./firebase";

const auth = getAuth(app);

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



export const registerUser = async (email, password) => {
    try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;

        console.log("User is in auth: " + user);

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

export const useAuthState = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, loading };
};