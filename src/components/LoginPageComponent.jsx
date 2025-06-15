import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setUserInfoCookie } from '../services/CookieService';
import { authenticateUser } from '../authentication/auth';

import '../styles/LoginPageComponentStyle.css'

const LoginPageComponent = () => {
    const [createdUserObject, setCreatedUserObject] = useState({
        username: '',
        password: '',
        role: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCreatedUserObject({
            ...createdUserObject,
            [name]: value,
        });
    };

    const handleSubmit = async (formSubmitEvent) => {
        formSubmitEvent.preventDefault();

        try {
            // Call the authenticateUser function with email and password
            const user = await authenticateUser(
                createdUserObject.username,
                createdUserObject.password
            );

            // If authentication is successful, set user info cookie and navigate
            if (user) {
                navigate('/');
            }
        } catch (error) {
            console.error('Authentication error:', error);
        }
    };


    return (
        <div className="inner-body-page">
            <Link to="/">
                <button>Go back to the homepage</button>
            </Link>
            <h1 className="text-center">Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={createdUserObject.username}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={createdUserObject.password}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
export default LoginPageComponent;