import React from 'react';
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
import { setupAuthStateObserver } from './authentication/auth';
import {AuthenticatedRoute} from "./authentication/authenticadedRoute";



// Set up the authentication state observer
setupAuthStateObserver();

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Header />
                <div style={{ paddingTop: '96px' }}>
                    <Routes>
                        <Route path="/" element={<Home />}  />
                        <Route path="/health-events" element={<AuthenticatedRoute/>}>
                            <Route path="/health-events" element={<HealthEvents/>}/>
                        </Route>
                        <Route path="/dashboard" element={<AuthenticatedRoute/>}>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                        </Route>
                        <Route path="/login" element={<LoginPageComponent />}  />
                        <Route path="/register" element={<RegisterComponent/>}  />
                        <Route path="/populate" element={<AuthenticatedRoute/>}>
                            <Route path="/populate" element={<DataGenerationPage/>}/>
                        </Route>
                        {/* Route for NotFound - matches any unknown route */}
                        <Route path ="*" element={<NotFound />}  />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
