// import { plugins } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
}from "chart.js"
import { useEffect, useState } from 'react';
import axios from 'axios';


ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const BarChart=()=>{
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('/api/analytics/daily-checks');
              const data = response.data;
          
              // Process data for chart
              const labels = data.map(entry => entry._id); // Dates
              const counts = data.map(entry => entry.count); // Counts
          
              setChartData({
                labels,
                datasets: [
                  {
                    label: 'Daily Book Checks',
                    data: counts,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  },
                ],
              });
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          
    
        fetchData();
      }, []);
    const options = {
        indexAxis: "x",
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            positions: "left",
          },
          title:{
            dispaly:true,
            text:"Chart.js Horizontal"
          }
        },
      };
    
    return(

        <>
        <div className='w-[50%]'>

        <Bar data={chartData} options={options}/>
        </div>
        </>
    )
}