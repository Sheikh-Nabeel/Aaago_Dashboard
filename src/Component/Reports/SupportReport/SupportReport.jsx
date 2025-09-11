import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import IssueTableChart from './IssueTableChart';
import Sidebar from '../../Home/Sidebar';
import ReportNavbar from '../ReportNavbar';

ChartJS.register(ArcElement, Tooltip, Legend);

const SupportReport = () => {
  const data = {
    labels: ['Total Tickets Raised', 'Open Tickets', 'In Progress Tickets', 'Closed Tickets'],
    datasets: [
      {
        data: [12500, 1000, 12500, 1000],
        backgroundColor: ['#ffffff', '#1E1EFF', '#FFD700', '#00FF00'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = data.labels[tooltipItem.dataIndex];
            const value = data.datasets[0].data[tooltipItem.dataIndex];
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
   <div className="flex min-h-screen">
      <Sidebar />
      <div className='flex-1 overflow-hidden'>
        <ReportNavbar />
    <div style={{  color: 'yellow', padding: '40px', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>Complaint Tickets</h3>

      {/* Horizontal Layout */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Chart with center text */}
        <div style={{ position: 'relative', width: '300px', height: '300px' }}>
          <Doughnut data={data} options={options} />

          {/* Centered Text */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'yellow',
              fontWeight: 'bold',
              fontSize: '16px',
              textAlign: 'center',
              pointerEvents: 'none', // Allow interaction with chart
              lineHeight: '1.2',
            }}
          >
            Complaint<br />Tickets
          </div>
        </div>

        {/* Labels on right */}
        <div style={{ marginLeft: '30px', textAlign: 'left', lineHeight: '1.8' }}>
          <p><span style={{ color: '#ffffff' }}>●</span> Total Tickets Raised</p>
          <p><span style={{ color: '#1E1EFF' }}>●</span> Open Tickets</p>
          <p><span style={{ color: '#FFD700' }}>●</span> In Progress Tickets</p>
          <p><span style={{ color: '#00FF00' }}>●</span> Closed Tickets</p>
        </div>
      </div>
    </div>
    <IssueTableChart/>
    </div>
    </div>
   
  );
};

export default SupportReport;
