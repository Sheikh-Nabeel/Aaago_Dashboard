import React, { useState, useEffect } from 'react';
import Sidebar from '../../Home/Sidebar';
import LineChart from './LineChart';
import { FaUser } from "react-icons/fa";
import { RiUserStarFill } from "react-icons/ri";
import { TbUserQuestion } from "react-icons/tb";
import { PiSealQuestionBold } from "react-icons/pi";
import { LiaIdCardSolid } from "react-icons/lia";
import { MdPendingActions } from "react-icons/md";
import { MdCancel } from "react-icons/md";

import { FiFilter } from "react-icons/fi"; // ✅ your original filter icon
import SparklineCharts from './SparklineCharts';
import ReportNavbar from '../ReportNavbar';
import axiosInstance from '../../../services/axiosConfig';

const ReportAnalytics = () => {
  // State management
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [period, setPeriod] = useState('year');

  // Initialize default date range (current year)
  useEffect(() => {
    const now = new Date();
    const yearStart = new Date(now.getFullYear(), 0, 1);
    const yearEnd = new Date(now.getFullYear(), 11, 31);
    
    setStartDate(yearStart.toISOString().split('T')[0]);
    setEndDate(yearEnd.toISOString().split('T')[0]);
  }, []);

  // Fetch analytics data
  const fetchAnalyticsData = async () => {
    if (!startDate || !endDate) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Send just the date part before 'T' in ISO format
      const startISO = new Date(startDate).toISOString().split('T')[0];
      const endISO = new Date(endDate).toISOString().split('T')[0];
      
      console.log('API Request:', { period, startDate: startISO, endDate: endISO });
      
      const response = await axiosInstance.get('/analytics/users', {
        params: {
          period,
          startDate: startISO,
          endDate: endISO
        }
      });
      
      if (response.data.success) {
        setAnalyticsData(response.data.data);
      } else {
        setError('Failed to fetch analytics data');
      }
    } catch (err) {
      console.error('Error fetching analytics data:', err);
      setError(err.response?.data?.message || 'Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when dates or period change
  useEffect(() => {
    if (startDate && endDate) {
      fetchAnalyticsData();
    }
  }, [startDate, endDate, period]);

  // Handle date changes
  const handleDateChange = (type, value) => {
    if (type === 'start') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  // Handle period change and update date range accordingly
  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    
    const now = new Date();
    let newStartDate, newEndDate;
    
    switch (newPeriod) {
      case 'day':
        // Today - use current date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day
        newStartDate = today;
        newEndDate = new Date(today);
        break;
      case 'week':
        // Current week (Monday to Sunday)
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday
        newStartDate = startOfWeek;
        newEndDate = endOfWeek;
        break;
      case 'month':
        // Current month
        newStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
        newEndDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'year':
        // Current year
        newStartDate = new Date(now.getFullYear(), 0, 1);
        newEndDate = new Date(now.getFullYear(), 11, 31);
        break;
      default:
        return;
    }
    
    const startDateStr = newStartDate.toISOString().split('T')[0];
    const endDateStr = newEndDate.toISOString().split('T')[0];
    
    console.log(`Period changed to ${newPeriod}:`, { startDateStr, endDateStr });
    
    setStartDate(startDateStr);
    setEndDate(endDateStr);
  };

  // Prepare data for cards
  const getCardData = () => {
    if (!analyticsData?.summary) return [];
    
    const { summary } = analyticsData;
    
    return [
      {
        total: 'Total Users',
        percent: summary.totalUsers?.toLocaleString() || '0',
        chartData: [10, 20, 15, 30, 25, 35], // Default sparkline data
        Icon: FaUser,
      },
      {
        total: 'Active Users',
        percent: summary.activeUsers?.toLocaleString() || '0',
        chartData: [5, 10, 8, 12, 14, 18],
        Icon: RiUserStarFill,
      },
      {
        total: 'Verified KYC',
        percent: summary.verifiedKYC?.toLocaleString() || '0',
        chartData: [5, 15, 25, 35, 30, 40],
        Icon: LiaIdCardSolid,
      },
      {
        total: 'Unverified KYC',
        percent: summary.unverifiedKYC?.toLocaleString() || '0',
        chartData: [40, 35, 30, 25, 20, 15],
        Icon: PiSealQuestionBold,
      },
      {
        total: 'Pending KYC',
        percent: summary.pendingKYC?.toLocaleString() || '0',
        chartData: [20, 18, 16, 14, 12, 10],
        Icon: MdPendingActions,
      },
      {
        total: 'Rejected KYC',
        percent: summary.rejectedKYC?.toLocaleString() || '0',
        chartData: [5, 8, 12, 6, 9, 7],
        Icon: MdCancel,
      },
    ];
  };

  const cardData = getCardData();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className='flex-1 overflow-hidden'>
        <ReportNavbar />
        <div className=' mr-10 px-10 py-10 overflow-hidden'>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <div className="flex items-center gap-4 py-2 justify-between">
            {/* Period Selection */}
            <div className="flex items-center gap-2 text-yellow-400 text-sm">
              <label htmlFor="period">Period:</label>
              <select
                id="period"
                value={period}
                onChange={(e) => handlePeriodChange(e.target.value)}
                className="bg-transparent border border-yellow-400 text-yellow-400 px-2 py-1 rounded text-sm focus:outline-none"
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="flex items-center gap-2 text-yellow-400 text-sm">
              <label htmlFor="from">From:</label>
              <input
                type="date"
                id="from"
                value={startDate}
                onChange={(e) => handleDateChange('start', e.target.value)}
                className="bg-transparent border border-yellow-400 text-yellow-400 px-2 py-1 rounded text-sm focus:outline-none"
              />
              <label htmlFor="to">To:</label>
              <input
                type="date"
                id="to"
                value={endDate}
                onChange={(e) => handleDateChange('end', e.target.value)}
                className="bg-transparent border border-yellow-400 text-yellow-400 px-2 py-1 rounded text-sm focus:outline-none"
              />
            </div>
          </div>
          

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="text-yellow-400 text-lg">Loading analytics data...</div>
            </div>
          )}

          {/* Cards Grid */}
          {!loading && cardData.length > 0 && (
            <>
              {/* First Row: Total Users Card */}
              <div className='grid grid-cols-1 mb-6'>
                {cardData.slice(0, 1).map((item, index) => {
                  const IconComponent = item.Icon;
                  return (
                    <div
                      key={index}
                      className='flex flex-col gap-4 shadow-lg rounded-lg outline outline-black/20 px-5 py-5 bg-gradient-to-b from-[#038A59] to-[#013723] shadow-black/80'
                    >
                      <div className='flex gap-2 items-center'>
                        <IconComponent size={30} />
                        <p className='text-lg font-semibold m-0 tracking-wide'>{item.total}</p>
                      </div>
                      <h2 className='text-3xl font-bold'>{item.percent}</h2>
                      <SparklineCharts data={item.chartData} />
                    </div>
                  );
                })}
              </div>

              {/* Second Row: Remaining Cards */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {cardData.slice(1).map((item, index) => {
                  const IconComponent = item.Icon;
                  return (
                    <div
                      key={index}
                      className='flex flex-col gap-4 shadow-lg rounded-lg outline outline-black/20 px-5 py-5 bg-gradient-to-b from-[#038A59] to-[#013723] shadow-black/80'
                    >
                      <div className='flex gap-2 items-center'>
                        <IconComponent size={30} />
                        <p className='text-lg font-semibold m-0 tracking-wide'>{item.total}</p>
                      </div>
                      <h2 className='text-3xl font-bold'>{item.percent}</h2>
                      <SparklineCharts data={item.chartData} />
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Line Chart */}
          {!loading && analyticsData?.chartData && (
            <div className='pt-12'>
              <LineChart 
                chartData={analyticsData.chartData}
                period={period}
                onPeriodChange={handlePeriodChange}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ReportAnalytics;
