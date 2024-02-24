import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {registerUser} from '../authentication/auth';
import axios from 'axios';

import '../styles/LoginPageComponentStyle.css';
import {setUserInfoCookie} from "../services/CookieService";
import {message} from "antd";

const RegisterComponent = () => {
    const [registrationInfo, setRegistrationInfo] = useState({
        firstName: '',
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setRegistrationInfo({
            ...registrationInfo,
            [name]: value,
        });
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (registrationInfo.password !== confirmPassword) {
            message.error("Passwords don't match");
            return;
        }

        try {
            // Call the registerUser function with email and password
            const user = await registerUser(
                registrationInfo.email,
                registrationInfo.password,
                registrationInfo.firstName,
                'User'
            );
            console.log("User is: " + user);

            // If registration is successful, set user info cookie and navigate
            if (user) {
                message.success('Registration successful!');
                navigate('/');

            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };


    return (
        <div className="inner-body-page">
            <Link to="/">
                <button>Go back to the homepage</button>
            </Link>
            <h1 className="text-center">Register</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label style={{marginBottom: "0px"}}>
                        First name:
                        <input
                            type="text"
                            name="firstName"
                            value={registrationInfo.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-field">
                    <label style={{marginBottom: "0px"}}>
                        Email:
                        <input
                            type="text"
                            name="email"
                            value={registrationInfo.email}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-field">
                    <label style={{marginBottom: "0px"}}>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={registrationInfo.password}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-field">
                    <label style={{marginBottom: "0px"}}>
                        Confirm Password:
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterComponent;
