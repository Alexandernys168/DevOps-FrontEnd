import React, {useEffect, useRef, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chart from 'chart.js/auto';
import { ThemeProvider, createTheme } from '@mui/material/styles';


interface CounterProps {
    label: string;
    value: number;
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
    const [graphData, setGraphData] = useState<number[]>([10, 20, 30, 40, 50]);
    const [graphQuery, setGraphQuery] = useState<string>(''); // State for the graph query
    const [userData, setUserData] = useState<number>(1000); // Mock user data
    const [eventData, setEventData] = useState<number>(50); // Mock event data
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const myChartRef = useRef<Chart | null>(null);

    //  const graphData = [60, 40, 80, 30, 70];

    const theme = createTheme({
        palette: {
            primary: {
                main: '#c9edf3',
            },
            secondary: {
                main: '#ffe4df'
            }
        },
    });

    const handleGenerateGraph = () => {
        // Check if myChart exists, and destroy it if it does
        if (myChartRef.current !== null) {
            myChartRef.current.destroy();
        }

        // Your code to generate or fetch data and create a new chart goes here
        const graphData = {
            labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
            datasets: [
                {
                    label: 'My Chart',
                    data: [60, 40, 80, 30, 70],
                    backgroundColor: ['red', 'blue', 'green', 'orange', 'purple'], // Add your own colors
                },
            ],
        };

        // Create a new canvas element
        const canvas = document.createElement('canvas');
        canvas.width = 50; // Set the width and height as per your requirement
        canvas.height = 50;

        // Append the canvas to the chart container
        if (chartContainerRef.current) {
            chartContainerRef.current.innerHTML = ''; // Clear previous charts
            chartContainerRef.current.appendChild(canvas);
        }

        // Create a new chart
        const ctx = canvas.getContext('2d');
        if (ctx) {
            myChartRef.current = new Chart(ctx, {
                type: 'bar',
                data: graphData,
                // ... other chart configurations
            });
        }
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
                    <Button variant="contained" color="primary" onClick={handleGenerateGraph} style={{marginRight: '1rem'}}>
                        Generate Chart
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleCloseChart}>
                        Close Chart
                    </Button>
                </Grid>
                <Counter label="Registered Users" value={userData} />
                <Counter label="Event Data" value={eventData} />
                <Grid item xs={12}>
                    <div ref={chartContainerRef} style={{ width: '20rem', height: '16rem' }}></div>
                </Grid>
            </Grid>
        </Container>
        </ThemeProvider>
    );
};

export default Dashboard;
