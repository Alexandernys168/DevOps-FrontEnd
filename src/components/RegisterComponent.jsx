import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/LoginPageComponentStyle.css';

const RegisterComponent = () => {
    const [registrationInfo, setRegistrationInfo] = useState({
        username: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
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
            alert("Passwords don't match");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/länk/till/backend/här', {
                body: JSON.stringify(registrationInfo),

        });
            if (response.status === 200) { //same as HttpStatus.OK
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
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={registrationInfo.username}
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
                            value={registrationInfo.password}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
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
