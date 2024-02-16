import React from 'react';
import '../styles/Loading.css'; // You can create a corresponding CSS file for styling

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Loading;
