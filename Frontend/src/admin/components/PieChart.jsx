import  { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";
import axios from 'axios';

ChartJs.register(
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const PieChart = () => {
    const [pieChartData, setPieChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchPieChartData = async () => {
            try {
                const response = await axios.get('/users/total-over-time');
                const data = response.data;

                // Process data for pie chart
                const labels = data.map(entry => entry.category); // Categories
                const counts = data.map(entry => entry.count); // Counts

                setPieChartData({
                    labels,
                    datasets: [
                        {
                            label: 'User Categories',
                            data: counts,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching pie chart data:', error);
            }
        };

        fetchPieChartData();
    }, []);

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "User Categories",
            },
        },
    };

    return (
        <div className='w-[50%]'>
            <Pie data={pieChartData} options={pieChartOptions} />
        </div>
    );
};

export default PieChart;
