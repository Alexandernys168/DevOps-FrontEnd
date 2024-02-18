import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route,

} from 'react-router-dom';

import './styles/style.css';
import Home from './views/home';
import NotFound from './views/not-found';
import Dashboard from './views/Dashboard';
import Header from './components/Header';
import LoginPageComponent from './components/LoginPageComponent';
import HealthEvents from "./views/HealthEvents";
import RegisterComponent from "./components/RegisterComponent";
import DataGenerationPage from "./views/DataGenerationPage";
import './authentication/firebase'
import {auth, setupAuthStateObserver, useAuthState} from './authentication/auth';
import {AuthenticatedRoute} from "./authentication/authenticadedRoute";
import LoadingView from "./views/loadingView";
import DataGenerationPageForPatient from "./views/DataGenerationPageForPatient";
import HealthEventsForPatient from "./views/HealthEventsForPatient";
import DashboardForPatient from "./views/DashboardForPatient";
import { getToken, getMessaging, onMessage } from "firebase/messaging";
import { messaging } from "./authentication/firebase"
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Message from "./components/Message";


// Set up the authentication state observer
setupAuthStateObserver();

const App: React.FC = () => {
    const {loading, user, dbUser, userRoles} = useAuthState();
    const [currentUser, setCurrentUser] = useState(null);
    const {REACT_APP_VAPID_KEY } = process.env;


    onMessage(messaging, (payload) => {
        toast(<Message notification={payload.notification} />);
    });
    async function requestPermission() {
        //requesting permission using Notification API
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: REACT_APP_VAPID_KEY,
            });

            //We can send token to server
            console.log("Token generated : ", token);
        } else if (permission === "denied") {
            //notifications are blocked
            alert("You denied for the notification");
        }
    }

    useEffect(() => {
        requestPermission();
    }, []);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                if (user) {
                    // If user is available from useAuthState, use it directly
                    setCurrentUser(user);
                } else {
                    // Fetch the current user once if not available
                    const currentUser = auth.currentUser;
                    if (currentUser) {
                        setCurrentUser(currentUser);
                        console.log('Current user:', currentUser);
                    }
                    // Additional logic if needed
                }
            } catch (error) {
                if (error instanceof Error)
                    console.error('Error fetching current user:', error.message);
                // Handle error if needed
            }
        };
        if (!loading) {
            // Only fetch the current user if authentication state is loaded
            fetchCurrentUser();
        }
    }, [loading, user]);

    return (

        <Router>
            <>

                <Header/>

                <div style={{paddingTop: '96px'}}>
                    <ToastContainer position="top-left"/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        {loading ? (
                            <Route path="/loading" element={<LoadingView/>}/>
                        ) : (
                            <>
                                {currentUser ? (
                                    <>
                                        {userRoles.includes('Admin') && (
                                            <>
                                                <Route path="/dashboard" element={<Dashboard/>}/>
                                                <Route path="/populate" element={<DataGenerationPage/>}/>
                                                <Route path="/health-events" element={<HealthEvents/>}/>
                                            </>
                                        )}
                                        {userRoles.includes('Patient') && (
                                            <>
                                                <Route path="/health-events" element={<HealthEventsForPatient/>}/>
                                                <Route path="/populate" element={<DataGenerationPageForPatient/>}/>
                                                <Route path="/dashboard" element={<DashboardForPatient/>}/>
                                            </>
                                        )}
                                        {userRoles.includes('Doctor') && (
                                            <Route path="/populate" element={<DataGenerationPage/>}/>
                                        )}
                                    </>
                                ) : (
                                    <Route path="/login" element={<LoginPageComponent/>}/>
                                )}
                                <Route path="/" element={<Home/>}/>
                            </>
                        )}


                        <Route path="/login" element={<LoginPageComponent/>}/>
                        <Route path="/register" element={<RegisterComponent/>}/>

                        {/*
                            <Route path="/dashboard" element={<AuthenticatedRoute/>}>
                                <Route path="/dashboard" element={<Dashboard/>}/>
                            </Route>
                        */}

                        {/*
                            <Route path="/health-events" element={<AuthenticatedRoute/>}>
                                <Route path="/health-events" element={<HealthEvents/>}/>
                            </Route>
                        */}


                        {/*
                        <Route path="/populate" element={<AuthenticatedRoute/>}>
                            <Route path="/populate" element={<DataGenerationPage/>}/>
                        </Route>
                        */}

                        {/* Route for NotFound - matches any unknown route */}
                        <Route path="*" element={<NotFound/>}/>

                    </Routes>

                </div>

            </>
        </Router>
    );
};

ReactDOM.render(<App/>, document.getElementById('app'));
