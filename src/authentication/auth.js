import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile   } from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from './firebase';

const auth = getAuth();

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

export { authenticateUser };



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