import React from 'react';
import Chart from 'react-apexcharts';

const SparklineChart = ({ data }) => {
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
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 90, 100]
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
      data: data || [10, 20, 15, 30, 25, 40]
    }
  ];

  return (
    <Chart options={options} series={series} type="area" height={50} width="100%" />
  );
};

export default SparklineChart;
