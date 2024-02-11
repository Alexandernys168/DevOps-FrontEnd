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

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Header />
                <div style={{ paddingTop: '96px' }}>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<HealthEvents/>} path="/health-events" />
                        <Route element={<Dashboard />} path="/dashboard" />
                        <Route element={<LoginPageComponent />} path="/login" />
                        <Route element={<RegisterComponent/>} path="/register" />
                        <Route element={<DataGenerationPage/>} path="/populate"/>
                        {/* Route for NotFound - matches any unknown route */}
                        <Route element={<NotFound />} path ="*" />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
