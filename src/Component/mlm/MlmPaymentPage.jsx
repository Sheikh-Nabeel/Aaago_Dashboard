import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMLMDashboard, updateMLMDistributions, resetMlmState } from '../../features/Mlm/mlmSlice';
import toast from 'react-hot-toast';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IoIosArrowDown } from 'react-icons/io';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, ChartDataLabels);

const MLMPaymentPage = () => {
  const dispatch = useDispatch();
  const { dashboard, loading, error, success } = useSelector((state) => state.mlm);
  const [validationError, setValidationError] = useState(null);
  const [sortBy, setSortBy] = useState('All');

  const [formData, setFormData] = useState({
    ddr: '',
    crr: '',
    bbr: '',
    hlr: '',
    regionalAmbassador: '',
    porparleTeam: '',
    rop: '',
    companyOperations: '',
    technologyPool: '',
    foundationPool: '',
    publicShare: '',
    netProfit: '',
    ddrLevel1: '',
    ddrLevel2: '',
    ddrLevel3: '',
    ddrLevel4: '',
    gc: '',
    la: '',
    ceo: '',
    coo: '',
    cmo: '',
    cfo: '',
    cto: '',
    chro: '',
    topTeamPerform: '',
    winner: '',
    fighter: '',
    operationExpense: '',
    organizationEvent: '',
    chairmanFounder: '',
    shareholder1: '',
    shareholder2: '',
    shareholder3: '',
  });

  useEffect(() => {
    dispatch(fetchMLMDashboard());
  }, [dispatch]);

  useEffect(() => {
    if (dashboard && dashboard.percentageConfiguration) {
      const newFormData = {
        ddr: dashboard.percentageConfiguration.ddr || '',
        crr: dashboard.percentageConfiguration.crr || '',
        bbr: dashboard.percentageConfiguration.bbr || '',
        hlr: dashboard.percentageConfiguration.hlr || '',
        regionalAmbassador: dashboard.percentageConfiguration.regionalAmbassador || '',
        porparleTeam: dashboard.percentageConfiguration.porparleTeam || '',
        rop: dashboard.percentageConfiguration.rop || '',
        companyOperations: dashboard.percentageConfiguration.companyOperations || '',
        technologyPool: dashboard.percentageConfiguration.technologyPool || '',
        foundationPool: dashboard.percentageConfiguration.foundationPool || '',
        publicShare: dashboard.percentageConfiguration.publicShare || '',
        netProfit: dashboard.percentageConfiguration.netProfit || '',
        ddrLevel1: dashboard.percentageConfiguration.ddrSubDistribution?.level1 || '',
        ddrLevel2: dashboard.percentageConfiguration.ddrSubDistribution?.level2 || '',
        ddrLevel3: dashboard.percentageConfiguration.ddrSubDistribution?.level3 || '',
        ddrLevel4: dashboard.percentageConfiguration.ddrSubDistribution?.level4 || '',
        gc: dashboard.percentageConfiguration.porparleTeamSubDistribution?.gc || '',
        la: dashboard.percentageConfiguration.porparleTeamSubDistribution?.la || '',
        ceo: dashboard.percentageConfiguration.porparleTeamSubDistribution?.ceo || '',
        coo: dashboard.percentageConfiguration.porparleTeamSubDistribution?.coo || '',
        cmo: dashboard.percentageConfiguration.porparleTeamSubDistribution?.cmo || '',
        cfo: dashboard.percentageConfiguration.porparleTeamSubDistribution?.cfo || '',
        cto: dashboard.percentageConfiguration.porparleTeamSubDistribution?.cto || '',
        chro: dashboard.percentageConfiguration.porparleTeamSubDistribution?.chro || '',
        topTeamPerform: dashboard.percentageConfiguration.porparleTeamSubDistribution?.topTeamPerform || '',
        winner: dashboard.percentageConfiguration.topTeamPerformSubDistribution?.winner || '',
        fighter: dashboard.percentageConfiguration.topTeamPerformSubDistribution?.fighter || '',
        operationExpense: dashboard.percentageConfiguration.companyOperationsSubDistribution?.operationExpense || '',
        organizationEvent: dashboard.percentageConfiguration.companyOperationsSubDistribution?.organizationEvent || '',
        chairmanFounder: dashboard.percentageConfiguration.publicShareSubDistribution?.chairmanFounder || '',
        shareholder1: dashboard.percentageConfiguration.publicShareSubDistribution?.shareholder1 || '',
        shareholder2: dashboard.percentageConfiguration.publicShareSubDistribution?.shareholder2 || '',
        shareholder3: dashboard.percentageConfiguration.publicShareSubDistribution?.shareholder3 || '',
      };
      setFormData(newFormData);
      console.log('Initialized formData:', newFormData);
    }
  }, [dashboard]);

  useEffect(() => {
    if (success) {
      toast.success('Distributions updated successfully!');
      dispatch(fetchMLMDashboard()); // Refresh dashboard to reflect updates
      dispatch(resetMlmState());
    }
    if (validationError || error) {
      toast.error(validationError || error);
      const timer = setTimeout(() => {
        setValidationError(null);
        dispatch(resetMlmState());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, validationError, error, dispatch]);

  const handleChange = (e) => {
    const value = e.target.value === '' ? '' : Number(parseFloat(e.target.value).toFixed(2));
    setFormData({ ...formData, [e.target.name]: value });
    setValidationError(null);
    console.log('Form data changed:', { [e.target.name]: value });
  };

  const validateForm = () => {
    const mainFields = ['ddr', 'crr', 'bbr', 'hlr', 'regionalAmbassador', 'porparleTeam', 'rop', 'companyOperations', 'technologyPool', 'foundationPool', 'publicShare', 'netProfit'];
    const ddrFields = ['ddrLevel1', 'ddrLevel2', 'ddrLevel3', 'ddrLevel4'];
    const ptFields = ['gc', 'la', 'ceo', 'coo', 'cmo', 'cfo', 'cto', 'chro', 'topTeamPerform'];
    const ttFields = ['winner', 'fighter'];
    const coFields = ['operationExpense', 'organizationEvent'];
    const psFields = ['chairmanFounder', 'shareholder1', 'shareholder2', 'shareholder3'];

    const numericFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        value === ''
          ? (dashboard?.percentageConfiguration[key] ||
             dashboard?.percentageConfiguration.ddrSubDistribution?.[`level${key.match(/\d+/)}`] ||
             dashboard?.percentageConfiguration.porparleTeamSubDistribution?.[key] ||
             dashboard?.percentageConfiguration.topTeamPerformSubDistribution?.[key] ||
             dashboard?.percentageConfiguration.companyOperationsSubDistribution?.[key] ||
             dashboard?.percentageConfiguration.publicShareSubDistribution?.[key] ||
             0)
          : Number(value),
      ])
    );

    for (const [key, value] of Object.entries(numericFormData)) {
      if (isNaN(value) || value < 0) {
        return `Invalid value for ${key.toUpperCase()}: must be a non-negative number`;
      }
    }

    const mainTotal = mainFields.reduce((sum, field) => sum + (numericFormData[field] || 0), 0);
    if (Math.abs(mainTotal - 100) > 0.01) {
      return `Main distribution percentages must sum to 100% (current: ${mainTotal.toFixed(2)}%)`;
    }

    if (numericFormData.ddr > 0) {
      const ddrTotal = ddrFields.reduce((sum, field) => sum + (numericFormData[field] || 0), 0);
      if (Math.abs(ddrTotal - numericFormData.ddr) > 0.01) {
        return `DDR sub-distributions must sum to DDR total (${numericFormData.ddr}%): current ${ddrTotal.toFixed(2)}%`;
      }
    }

    if (numericFormData.porparleTeam > 0) {
      const ptTotal = ptFields.reduce((sum, field) => sum + (numericFormData[field] || 0), 0);
      if (Math.abs(ptTotal - numericFormData.porparleTeam) > 0.01) {
        return `Porparle Team sub-distributions must sum to porparleTeam total (${numericFormData.porparleTeam}%): current ${ptTotal.toFixed(2)}%`;
      }
    }

    if (numericFormData.topTeamPerform > 0) {
      const ttTotal = ttFields.reduce((sum, field) => sum + (numericFormData[field] || 0), 0);
      if (Math.abs(ttTotal - numericFormData.topTeamPerform) > 0.01) {
        return `Top Team Performance sub-distributions must sum to topTeamPerform total (${numericFormData.topTeamPerform}%): current ${ttTotal.toFixed(2)}%`;
      }
    }

    if (numericFormData.companyOperations > 0) {
      const coTotal = coFields.reduce((sum, field) => sum + (numericFormData[field] || 0), 0);
      if (Math.abs(coTotal - numericFormData.companyOperations) > 0.01) {
        return `Company Operations sub-distributions must sum to companyOperations total (${numericFormData.companyOperations}%): current ${coTotal.toFixed(2)}%`;
      }
    }

    if (numericFormData.publicShare > 0) {
      const psTotal = psFields.reduce((sum, field) => sum + (numericFormData[field] || 0), 0);
      if (Math.abs(psTotal - numericFormData.publicShare) > 0.01) {
        return `Public Share sub-distributions must sum to publicShare total (${numericFormData.publicShare}%): current ${psTotal.toFixed(2)}%`;
      }
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setValidationError(validationError);
      console.log('Validation error:', validationError);
      return;
    }

    const payload = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value === '' ? 0 : Number(value)])
    );
    console.log('Submitting payload:', payload);
    dispatch(updateMLMDistributions(payload));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    // TODO: Implement sorting logic for transactions based on sortBy
  };

  const mainDistributionData = {
    labels: ['DDR', 'CRR', 'BBR', 'HLR', 'Reg. Ambassador', 'Porparle Team', 'ROP', 'Comp. Operations', 'Tech. Pool', 'Found. Pool', 'Public Share', 'Net Profit'],
    datasets: [
      {
        label: 'Main Distribution (%)',
        data: [
          dashboard?.percentageConfiguration?.ddr || 0,
          dashboard?.percentageConfiguration?.crr || 0,
          dashboard?.percentageConfiguration?.bbr || 0,
          dashboard?.percentageConfiguration?.hlr || 0,
          dashboard?.percentageConfiguration?.regionalAmbassador || 0,
          dashboard?.percentageConfiguration?.porparleTeam || 0,
          dashboard?.percentageConfiguration?.rop || 0,
          dashboard?.percentageConfiguration?.companyOperations || 0,
          dashboard?.percentageConfiguration?.technologyPool || 0,
          dashboard?.percentageConfiguration?.foundationPool || 0,
          dashboard?.percentageConfiguration?.publicShare || 0,
          dashboard?.percentageConfiguration?.netProfit || 0,
        ],
        backgroundColor: '#038A59',
        borderColor: '#013723',
        borderWidth: 1,
      },
    ],
  };

  const ddrDistributionData = {
    labels: ['Level 1', 'Level 2', 'Level 3', 'Level 4'],
    datasets: [
      {
        label: 'DDR Sub-Distribution (%)',
        data: [
          dashboard?.percentageConfiguration?.ddrSubDistribution?.level1 || 0,
          dashboard?.percentageConfiguration?.ddrSubDistribution?.level2 || 0,
          dashboard?.percentageConfiguration?.ddrSubDistribution?.level3 || 0,
          dashboard?.percentageConfiguration?.ddrSubDistribution?.level4 || 0,
        ],
        backgroundColor: ['#038A59', '#04A66A', '#06C27B', '#08DE8C'],
        borderColor: '#013723',
        borderWidth: 1,
      },
    ],
  };

  const sectionTotalsData = {
    labels: ['DDR', 'CRR', 'BBR', 'HLR', 'Reg. Ambassador', 'Porparle Team', 'ROP', 'Comp. Operations', 'Tech. Pool', 'Found. Pool', 'Public Share', 'Net Profit'],
    datasets: [
      {
        label: 'Section Totals (AED)',
        data: [
          dashboard?.sectionTotals?.ddr || 0,
          dashboard?.sectionTotals?.crr || 0,
          dashboard?.sectionTotals?.bbr || 0,
          dashboard?.sectionTotals?.hlr || 0,
          dashboard?.sectionTotals?.regionalAmbassador || 0,
          dashboard?.sectionTotals?.porparleTeam || 0,
          dashboard?.sectionTotals?.rop || 0,
          dashboard?.sectionTotals?.companyOperations || 0,
          dashboard?.sectionTotals?.technologyPool || 0,
          dashboard?.sectionTotals?.foundationPool || 0,
          dashboard?.sectionTotals?.publicShare || 0,
          dashboard?.sectionTotals?.netProfit || 0,
        ],
        backgroundColor: '#DDC104',
        borderColor: '#013723',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#013220] text-[#DDC104] p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center tracking-wide">MLM Payment Management Dashboard</h1>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-[#DDC104] border-t-transparent rounded-full" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {!loading && !error && dashboard && (
          <div className="space-y-8">
            {/* Overview Section */}
            <div className="bg-gradient-to-b from-[#038A59] to-[#013723] rounded-lg shadow-lg outline outline-black/20 shadow-black/80 p-6 transform hover:scale-105 transition duration-300">
              <h2 className="text-2xl font-semibold mb-6 tracking-wide">Financial Overview</h2>
              <div className="flex justify-around items-center flex-wrap gap-6">
                <div className="bg-[#013723] p-4 rounded-lg shadow w-60 overflow-hidden">
                  <p className="text-lg font-semibold tracking-wide">Total MLM Amount</p>
                  <p className="text-2xl font-bold text-[#DDC104] truncate">{dashboard.totalMLMAmount} AED</p>
                </div>
                <div className="bg-[#013723] p-4 rounded-lg shadow w-60 overflow-hidden">
                  <p className="text-lg font-semibold tracking-wide">Total Earnings</p>
                  <p className="text-2xl font-bold text-[#DDC104] truncate">{dashboard.totalEarnings} AED</p>
                </div>
                <div className="bg-[#013723] p-4 rounded-lg shadow w-60 overflow-hidden">
                  <p className="text-lg font-semibold tracking-wide">Total Transactions</p>
                  <p className="text-2xl font-bold text-[#DDC104] truncate">{dashboard.totalTransactions}</p>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 tracking-wide">Section Totals (AED)</h3>
                <div className="bg-[#013723] p-4 rounded-lg">
                  <Bar
                    data={sectionTotalsData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { display: false },
                        tooltip: { backgroundColor: '#013723', titleFont: { size: 14 }, bodyFont: { size: 12 } },
                        datalabels: {
                          display: true,
                          color: '#013723',
                          font: { weight: 'bold', size: 12 },
                          formatter: (value, context) => {
                            const percentage = (value / dashboard.totalMLMAmount * 100).toFixed(2);
                            return `${percentage}%`;
                          },
                          anchor: 'center',
                          align: 'center',
                        },
                      },
                      scales: {
                        y: { beginAtZero: true, title: { display: true, text: 'Amount (AED)', color: '#DDC104', font: { size: 14 } } },
                        x: { title: { display: true, text: 'Category', color: '#DDC104', font: { size: 14 } } },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Distribution Visualizations */}
            <div className="bg-gradient-to-b from-[#038A59] to-[#013723] rounded-lg shadow-lg outline outline-black/20 shadow-black/80 p-6 transform hover:scale-105 transition duration-300">
              <h2 className="text-2xl font-semibold mb-6 tracking-wide">Distribution Breakdown</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 tracking-wide">Main Distributions (%)</h3>
                  <Doughnut
                    data={mainDistributionData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: 'right', labels: { color: '#DDC104', font: { size: 12 } } },
                        tooltip: { backgroundColor: '#013723', titleFont: { size: 14 }, bodyFont: { size: 12 } },
                        datalabels: {
                          display: true,
                          color: '#DDC104',
                          font: { weight: 'bold', size: 12 },
                          formatter: (value) => `${value.toFixed(2)}%`,
                          anchor: 'center',
                          align: 'center',
                        },
                      },
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 tracking-wide">DDR Sub-Distributions (%)</h3>
                  <Doughnut
                    data={ddrDistributionData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: 'right', labels: { color: '#DDC104', font: { size: 12 } } },
                        tooltip: { backgroundColor: '#013723', titleFont: { size: 14 }, bodyFont: { size: 12 } },
                        datalabels: {
                          display: true,
                          color: '#DDC104',
                          font: { weight: 'bold', size: 12 },
                          formatter: (value) => `${value.toFixed(2)}%`,
                          anchor: 'center',
                          align: 'center',
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-gradient-to-b from-[#038A59] to-[#013723] rounded-lg shadow-lg outline outline-black/20 shadow-black/80 p-6 transform hover:scale-105 transition duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold tracking-wide">Recent Transactions</h2>
                <div className="flex items-center">
                  <label htmlFor="sortBy" className="text-sm mr-2">Sort by:</label>
                  <div className="relative">
                    <select
                      id="sortBy"
                      value={sortBy}
                      onChange={handleSortChange}
                      className="bg-transparent text-sm text-[#DDC104] focus:outline-none appearance-none pr-8"
                    >
                      <option className="bg-yellow-300 text-black" value="All">All</option>
                      <option className="bg-yellow-300 text-black" value="Daily">Daily</option>
                      <option className="bg-yellow-300 text-black" value="Weekly">Weekly</option>
                      <option className="bg-yellow-300 text-black" value="Monthly">Monthly</option>
                    </select>
                    <IoIosArrowDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#DDC104]" />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-[#013723] rounded-lg shadow">
                  <thead>
                    <tr className="bg-[#038A59]">
                      <th className="px-6 py-3 text-left text-sm font-medium tracking-wide">User</th>
                      <th className="px-6 py-3 text-left text-sm font-medium tracking-wide">Amount</th>
                      <th className="px-6 py-3 text-left text-sm font-medium tracking-wide">Ride ID</th>
                      <th className="px-6 py-3 text-left text-sm font-medium tracking-wide">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.recentTransactions.map((tx, index) => (
                      <tr key={index} className="border-b border-[#013723] hover:bg-[#038A59]/50">
                        <td className="px-6 py-4">
                          {tx.userId?.firstName && tx.userId?.lastName
                            ? `${tx.userId.firstName} ${tx.userId.lastName}`
                            : tx.userId?._id || 'Unknown User'}
                        </td>
                        <td className="px-6 py-4">{tx.amount} AED</td>
                        <td className="px-6 py-3">{tx.rideId}</td>
                        <td className="px-6 py-4">{new Date(tx.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Update Distributions Form */}
            <div className="bg-gradient-to-b from-[#038A59] to-[#013723] rounded-lg shadow-lg outline outline-black/20 shadow-black/80 p-6 transform hover:scale-105 transition duration-300">
              <h2 className="text-2xl font-semibold mb-6 tracking-wide">Update MLM Distributions</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 tracking-wide">Main Distributions (%)</h3>
                  {['ddr', 'crr', 'bbr', 'hlr', 'regionalAmbassador', 'porparleTeam', 'rop', 'companyOperations', 'technologyPool', 'foundationPool', 'publicShare', 'netProfit'].map(
                    (key) => (
                      <div key={key} className="mb-4">
                        <label htmlFor={key} className="block text-sm font-medium mb-1 tracking-wide">
                          {key.toUpperCase()}
                        </label>
                        <input
                          id={key}
                          type="number"
                          name={key}
                          value={formData[key]}
                          onChange={handleChange}
                          className="w-full p-2 border border-[#013723] rounded-lg bg-[#013723] text-[#DDC104] focus:outline-none focus:ring-2 focus:ring-[#DDC104] transition duration-200"
                          step="0.01"
                          min="0"
                          max="100"
                          placeholder="Enter percentage"
                          aria-required="true"
                        />
                      </div>
                    )
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 tracking-wide">Sub-Distributions (%)</h3>
                  {['ddrLevel1', 'ddrLevel2', 'ddrLevel3', 'ddrLevel4', 'gc', 'la', 'ceo', 'coo', 'cmo', 'cfo', 'cto', 'chro', 'topTeamPerform', 'winner', 'fighter'].map((key) => (
                    <div key={key} className="mb-4">
                      <label htmlFor={key} className="block text-sm font-medium mb-1 tracking-wide">
                        {key.toUpperCase()}
                      </label>
                      <input
                        id={key}
                        type="number"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="w-full p-2 border border-[#013723] rounded-lg bg-[#013723] text-[#DDC104] focus:outline-none focus:ring-2 focus:ring-[#DDC104] transition duration-200"
                        step="0.01"
                        min="0"
                        placeholder="Enter percentage"
                        aria-required="true"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 tracking-wide">Other Configurations</h3>
                  {['operationExpense', 'organizationEvent', 'chairmanFounder', 'shareholder1', 'shareholder2', 'shareholder3'].map((key) => (
                    <div key={key} className="mb-4">
                      <label htmlFor={key} className="block text-sm font-medium mb-1 tracking-wide">
                        {key.toUpperCase()}
                      </label>
                      <input
                        id={key}
                        type="number"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="w-full p-2 border border-[#013723] rounded-lg bg-[#013723] text-[#DDC104] focus:outline-none focus:ring-2 focus:ring-[#DDC104] transition duration-200"
                        step="0.01"
                        min="0"
                        placeholder="Enter percentage"
                        aria-required="true"
                      />
                    </div>
                  ))}
                </div>
                <div className="col-span-1 md:col-span-3">
                  <button
                    type="submit"
                    className="w-full bg-[#DDC104] text-[#013723] px-6 py-3 rounded-lg font-semibold tracking-wide hover:bg-[#e8d34a] focus:outline-none focus:ring-2 focus:ring-[#DDC104] transition duration-200 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Distributions'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MLMPaymentPage;