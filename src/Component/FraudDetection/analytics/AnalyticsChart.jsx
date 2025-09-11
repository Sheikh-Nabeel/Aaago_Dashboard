import React from 'react';
import Chart from 'react-apexcharts';

const AnalyticsChart = ({ data }) => {
  const options = {
    chart: {
      type: 'area',
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth'
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.5,
        opacityTo: 0.1,
      }
    },
    colors: ['#FFD700'], // Yellow
    tooltip: {
      enabled: false
    }
  };

  const series = [
    {
      name: 'Trend',
      data: data
    }
  ];

  return <Chart options={options} series={series} type="area" height={60} width="100%" />;
};

export default AnalyticsChart;
