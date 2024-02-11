import React, { useEffect, useRef, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chart from 'chart.js/auto';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { countOccurrences } from '../utils/utils';

interface CounterProps {
    label: string;
    value?: number;
}

const Counter: React.FC<CounterProps> = ({ label, value }) => {
    return (
        <Grid item xs={12} sm={6}>
            <div style={{ backgroundColor: '#c9edf3', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <Typography variant="h6">{label}</Typography>
                <Typography variant="subtitle1">{value}</Typography>
            </div>
        </Grid>
    );
};

const Dashboard: React.FC = () => {
    const [nrOfEventData, setNrOfEvents] = useState<number | undefined>();
    const [positiveResultData, setNrOfPositiveResults] = useState<number | undefined>();
    const [negativeResultData, setNrOfNegativeResults] = useState<number | undefined>();
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const myChartRef = useRef<Chart | null>(null);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#c9edf3',
            },
            secondary: {
                main: '#ffe4df',
            },
        },
    });

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8082/allevents');

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const rawData: string[] = await response.json();

            if (!rawData || !Array.isArray(rawData)) {
                throw new Error('Invalid response format');
            }

            // Parse the received strings into an array of Event objects
            const parsedData = rawData.map((str, index) => {
                try {
                    // Parse the raw string and then parse the inner JSON
                    const innerJson = JSON.parse(JSON.parse(str));
                    return innerJson;
                } catch (parseError) {
                    if (parseError instanceof Error)
                        console.error(`Error parsing JSON at index ${index}:`, parseError.message);
                    console.log('Raw JSON string:', str); // Print the raw string for debugging
                    return null; // or handle the error as needed
                }
            }).filter((item) => item !== null);

            // Calculate occurrences
            const occurrences = countOccurrences(parsedData);
            console.log('Occurrences:', occurrences);

            // Update state with calculated values
            setNrOfEvents(parsedData.length); // Assuming nr of event data is based on the total count
            setNrOfPositiveResults((occurrences.positive || 0) + (occurrences.positiv || 0)); // Update with the actual key you want to count
            setNrOfNegativeResults(occurrences.negative || 0);

        } catch (error) {
            if (error instanceof Error) console.error('Error fetching data:', error.message);
        }
    };

    const handleGenerateGraph = () => {
        // Fetch data and update state
        fetchData();
        // Your code to generate or fetch data and create a new chart goes here
        // ...
    };

    const handleCloseChart = () => {
        // Check if myChart exists, and destroy it if it does
        if (myChartRef.current !== null) {
            myChartRef.current.destroy();
        }

        // Clear the chart container
        if (chartContainerRef.current) {
            chartContainerRef.current.innerHTML = '';
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Dashboard</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleGenerateGraph} style={{ marginRight: '1rem' }}>
                            Generate Chart
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleCloseChart}>
                            Close Chart
                        </Button>
                    </Grid>
                    <Counter label="Total events" value={nrOfEventData} />
                    <Counter label="Positive results" value={positiveResultData} />
                    <Counter label="Negative results" value ={negativeResultData} />
                    <Grid item xs={12}>
                        <div ref={chartContainerRef} style={{ width: '20rem', height: '16rem' }}></div>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Dashboard;
