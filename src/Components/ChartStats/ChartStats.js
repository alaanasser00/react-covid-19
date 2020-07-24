import React, { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { Line } from 'react-chartjs-2';

import styles from './ChartStats.module.css'

const ChartStats = () => {
    // Retrieve Context Data
    const { 
        showWorldwideData,
        worldHistCases,
        worldHistDeaths,
        worldHistRecovered,
        countryHistCases, 
        countryHistDeaths, 
        countryHistRecovered 
    } = useContext(DataContext);
    const [countryHistChartCases,] = countryHistCases;
    const [countryHistChartDeaths,] = countryHistDeaths;
    const [countryHistChartRecovered,] = countryHistRecovered;
    const [showWorldwide,] = showWorldwideData;
    const [worldHistCasesChart,] = worldHistCases;
    const [worldHistDeathsChart,] = worldHistDeaths;
    const [worldHistRecoveredChart,] = worldHistRecovered;

    const data = {
        labels: showWorldwide ? Object.keys(worldHistCasesChart).slice(20,30) : Object.keys(countryHistChartCases).slice(20,30),
        datasets: [
            {
                label: "Cases",
                data: showWorldwide ? Object.values(worldHistCasesChart).slice(20,30) : Object.values(countryHistChartCases).slice(20,30),
                fill: false,
                borderColor: "#FFA000"
            },
            {
                label: "Deaths",
                data: showWorldwide ? Object.values(worldHistDeathsChart).slice(20,30) : Object.values(countryHistChartDeaths).slice(20,30),
                fill: false,
                borderColor: "#FB5151"
            },
            {
                label: "Recovered",
                data: showWorldwide ? Object.values(worldHistRecoveredChart).slice(20,30) : Object.values(countryHistChartRecovered).slice(20,30),
                fill: false,
                borderColor: "#75F257"
            }
        ]
    };

    const legend = {
        display: true,
        position: "bottom",
        labels: {
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontColor: '#18214D',
            fontSize: 16
        }
    };
    

    const options = {
        // responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                ticks: {
                    fontFamily: 'Lato',
                    fontColor: '#18214D',
                }
            }],
            yAxes: [{
                ticks: {
                    fontFamily: 'Lato',
                    fontColor: '#18214D',
                    beginAtZero: false,
                    maxTicksLimit: 8,
                }
            }]
        },
        onResize: function(chart, size) {
            if (size.width < 400) {
                chart.options.maintainAspectRatio = false
            }
            chart.update();
        },
    }


    return (
        <div className="card">
            <div className={styles.ChartStats}>
                <h2>Charts</h2>
                <div style={{ position: 'relative', height: "100%", minHeight: "300px"}}>
                    <Line data={data} legend={legend} options={options} />
                </div>
            </div>
        </div>
    )
}

export default ChartStats;