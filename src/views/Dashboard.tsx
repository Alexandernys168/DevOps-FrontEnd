import React, { useRef, useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { countOccurrencesResult } from '../utils/utils';

interface CounterProps {
    label: string;
    value: number | undefined;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);





const Counter: React.FC<CounterProps> = ({ label, value }) => {
    return (
        <Grid item xs={12} sm={6}>
            <div
                style={{
                    backgroundColor: '#c9edf3',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                }}
            >
                <Typography variant="h6">{label}</Typography>
                <Typography variant="subtitle1">{value}</Typography>
            </div>
        </Grid>
    );
};

const Dashboard: React.FC = () => {
    const [nrOfEventData, setNrOfEvents] = useState<number>();
    const [positiveResultData, setNrOfPositiveResults] = useState<number>();
    const [negativeResultData, setNrOfNegativeResults] = useState<number>();
    const [chartData, setChartData] = useState<any>(null);


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
            const response = await fetch('https://labresult.app.cloud.cbh.kth.se/labresult/allevents');

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const rawData: string[] = await response.json();

            if (!rawData || !Array.isArray(rawData)) {
                throw new Error('Invalid response format');
            }

            // Parse the received strings into an array of Event objects
            const parsedData = rawData
                .map((str, index) => {
                    try {
                        // Parse the raw string and then parse the inner JSON
                        return JSON.parse(str);
                    } catch (parseError) {
                        if (parseError instanceof Error)
                            console.error(`Error parsing JSON at index ${index}:`, parseError.message);
                        console.log('Raw JSON string:', str); // Print the raw string for debugging
                        return null; // or handle the error as needed
                    }
                })
                .filter((item) => item !== null);

            // Calculate occurrences
            const occurrences = countOccurrencesResult(parsedData);
            console.log('Occurrences:', occurrences);

            // Update state with calculated values
            setNrOfEvents(parsedData.length);
            setNrOfPositiveResults(occurrences.positive);
            setNrOfNegativeResults(occurrences.negative);
            setChartData({
                labels: ['Results'],
                datasets: [
                    {
                        label: 'Positive',
                        data: [occurrences.positive],
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        label: 'Negative',
                        data: [occurrences.negative],
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
            });
        } catch (error) {
            if (error instanceof Error) console.error('Error fetching data:', error.message);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);


    const labels = ['Positive', 'Negative'];


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Experimental chart idea',
            },
        },
    };




    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Dashboard</Typography>
                    </Grid>
                    <Counter label="Total events" value={nrOfEventData} />
                    <Counter label="Positive results" value={positiveResultData} />
                    <Counter label="Negative results" value={negativeResultData} />
                    <Grid item xs={10}>
                        {chartData && <Bar options={options} data={chartData} />}
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Dashboard;
