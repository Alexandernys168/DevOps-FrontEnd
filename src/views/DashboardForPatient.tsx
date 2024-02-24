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
import {useAuthState} from "../authentication/auth";

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

interface LabResult {
    id: string;
    patientId: string;
    result: string;
    registeredAt: number;
}

const Dashboard: React.FC = () => {
    const [nrOfEventData, setNrOfEvents] = useState<number>();
    const [positiveResultData, setNrOfPositiveResults] = useState<number>();
    const [negativeResultData, setNrOfNegativeResults] = useState<number>();
    const [chartData, setChartData] = useState<any>(null);
    const [labResults, setLabResults] = useState<LabResult[]>([]);
    const {dbUser, loading} = useAuthState();


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

            // Check if dbUser is available
            if (!dbUser || loading) {
                // Handle the case where dbUser is not available yet
                console.log('dbUser is not available yet');
                return;
            }
            const response = await fetch(`http://localhost:8081/labresult/${dbUser.firstName}`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const rawData: LabResult[] = await response.json();

            if (!rawData || !Array.isArray(rawData)) {
                throw new Error('Invalid response format');
            }

            // Calculate occurrences
            const occurrences = countOccurrencesResult(rawData);
            console.log('Occurrences:', occurrences);

            // Update state with calculated values
            setNrOfEvents(rawData.length);
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
    }, [dbUser, loading]);


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
                        <Typography variant="h4">Dashboard for {dbUser.firstName}</Typography>
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
