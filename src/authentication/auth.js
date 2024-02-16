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



export const registerUser = async (email, password, defaultRole) => {
    try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;

        console.log("user uid: " + user.uid);
        // Set the default role for the new user
        await updateRoles(user.uid, email, [defaultRole]);

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

// Helper function to update user roles in Firestore
export const updateRoles = async (userId, email, roles) => {
    const userDocRef = doc(firestore, 'users', userId);

    // Check if the document already exists
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
        // If the document exists, update the roles
        await setDoc(userDocRef, { email, roles }, { merge: true });
    } else {
        // If the document doesn't exist, create it with the roles
        await setDoc(userDocRef, { email, roles });
    }
};