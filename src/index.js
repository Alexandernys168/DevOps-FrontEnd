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


// Set up the authentication state observer
setupAuthStateObserver();

const App: React.FC = () => {
    const {loading, user, userRoles} = useAuthState();
    const [currentUser, setCurrentUser] = useState(null);
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
            <div>
                <Header/>
                <div style={{paddingTop: '96px'}}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        {loading ? (
                            <Route path="/loading" element={<LoadingView />} />
                        ) : (
                            <>
                                {currentUser ? (
                                    <>
                                        {userRoles.includes('Admin') && (
                                            <>
                                                <Route path="/dashboard" element={<Dashboard />} />
                                                <Route path="/populate" element={<DataGenerationPage />} />
                                                <Route path="/health-events" element={<HealthEvents />} />
                                            </>
                                        )}
                                        {userRoles.includes('Patient') && (
                                            <Route path="/health-events" element={<HealthEvents />} />
                                        )}
                                        {userRoles.includes('Doctor') && (
                                            <Route path="/populate" element={<DataGenerationPage />} />
                                        )}
                                    </>
                                ) : (
                                    <Route path="/login" element={<LoginPageComponent />} />
                                )}
                                <Route path="/" element={<Home />} />
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
            </div>
        </Router>
    );
};

ReactDOM.render(<App/>, document.getElementById('app'));
