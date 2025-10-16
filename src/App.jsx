import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkTokenValidity } from './features/slice/authSlice';
import ProtectedRoute from './Component/ProtectedRoute';
import tokenRefreshService from './services/tokenRefreshService';
import { Toaster } from 'react-hot-toast';
import Navbar from './Component/Navbar';
import Notifications from './Component/Notifications';
import Dispatch from './Component/DispatchCenter/Dispatch';
import DriverHistory from './Component/DriverManagement/DriverHistory';
import Livelocation from './Component/DispatchCenter/Livelocation';
import ChatDetail from './Component/MonitorChat/ChatDetail';
import CustomerManagement from './Component/CustomerManagement/CustomerManagement';
import CustomerProfile from './Component/CustomerManagement/CustomerProfile';
import CustomerHistory from './Component/CustomerManagement/CustomerHistory';
import CustomerEarningPayout from './Component/CustomerManagement/CustomerEarningPayout';
import CustomerRatings from './Component/CustomerManagement/CustomerRating';
import CustomerMLM from './Component/CustomerManagement/CustomerMLM';
import CustomerComplain from './Component/CustomerManagement/CustomerComplain';
import WebsiteUser from './Component/WebsiteUser/WebsiteUser';
import ProposalManagement from './Component/CareerManagment/ProposalManagement';
import AgreementRecord from './Component/CareerManagment/AgreementsRecord';
import MarketPlaceControl from './Component/CareerManagment/MarketPlaceControl';
import OverView from './Component/FraudDetection/overview/OverView';
import AutoLockRulesPanel from './Component/FraudDetection/autolockRulePanel/AutoLockRulesPanel';
import FraudProfile from './Component/FraudDetection/overview/FraudProfile';
import RuleEditorPanel from './Component/FraudDetection/RuleEditorPanel/RuleEditorPanel';
import Homepage from './Component/Home/Homepage';
import Mlm from './Component/mlm/Mlm';
import DriverManagement from './Component/DriverManagement/DriverManagement';
import DriverProfile from './Component/DriverManagement/DriverProfile';
import DriverMonitoring from './Component/DriverManagement/DriverMonitoring';
import EarningsAndPayouts from './Component/DriverManagement/EarningsAndPayouts';
import Ratings from './Component/DriverManagement/Ratings';
import Penalty from './Component/DriverManagement/Penalty';
import Report from './Component/DriverManagement/Report';
import Analytics from './Component/FraudDetection/analytics/Analytics';
import ReferralTree from './Component/DriverManagement/ReferralTree';
import PaymentOverview from './Component/WalletAndPayment/overview/PaymentOverview';
import WalletAdjustment from './Component/WalletAndPayment/WalletAdjustment/WalletAdjustment';
import WithdrawalManagement from './Component/WalletAndPayment/WithdrawalManagement/WithdrawalManagement';
import WalletFreezingRule from './Component/WalletAndPayment/WalletFreezingRule/WalletFreezingRule';
import TransactionLog from './Component/WalletAndPayment/Transactionlog/TransactionLog';
import AlertAndSmartNotifi from './Component/WalletAndPayment/Alertandsmartnotifi/AlertAndSmartNoti';
import UnachievedPoolManage from './Component/WalletAndPayment/UnachievedPoolManage/UnachievedPoolManage';
import KYCVerificationTable from './Component/AdminApproval/KYCVerificationTable';
import ServiceProvider from './Component/AdminApproval/ServiceProvider';
import ServiceProviderDetail from './Component/AdminApproval/ServiceProviderDetail';
import DriverHiring from './Component/AdminApproval/DriverHiring';
import DriverHiringDetail from './Component/AdminApproval/DriverHiringDetail';
import VendorOnBordingReq from './Component/AdminApproval/VendorOnBordingReq';
import WithDrawalRequest from './Component/AdminApproval/WithDrawalRequest';
import ComplainResolution from './Component/AdminApproval/ComplainResolution';
import ComplaintDetails from './Component/AdminApproval/ComplainDetails';
import PromoCode from './Component/AdminApproval/PromoCode';
import ManualAccountEdits from './Component/AdminApproval/ManualAccountEdits';
import PromoCodeDetails from './Component/AdminApproval/PromoCodeDetails';
import ReviewAndRating from './Component/ReviewAndRatings/ReviewAndRating';
import ReportAnalytics from './Component/Reports/Analytics/ReportAnalytics';
import DriverReport from './Component/Reports/DriverReport/DriverReport';
import RideServiceReport from './Component/Reports/RideServiceReport/RideServiceReport';
import SupportReport from './Component/Reports/SupportReport/SupportReport';
import EarningAndCommission from './Component/Reports/EarningAndCommission/EarningAndCommission';
import ApprovalActivities from './Component/Reports/ApprovalActivities/ApprovalActivities';
import TeamMLMReport from './Component/Reports/TeamMLMReport/TeamMLMReport';
import WithdrawalTransactionLog from './Component/Reports/WithdrawalAndTransactionLog/WithdrawalTransactionLog';
import CustomReportGenerator from './Component/Reports/CustomReportGenerator/CustomReportGenerator';
import CustomReportTable from './Component/Reports/CustomReportGenerator/CustomReportTable';
import CustomerReferralTree from './Component/CustomerManagement/CustomerReferralTree';
import Login from './Component/login/Login';
import AdminManagement from './Component/Add admin/AdminManagement';
import CustomerSupport from './Component/CustomerSupport/CustomerSupport';
import OfficialsAndFeed from './Component/OfficialsAndFeed/OfficialsAndFeed';
import BookingCharges from './Component/BookingCharges/BookingCharges';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/livelocation' || location.pathname === '/';
  return (
    <div className="bg-[#013220] text-[#DDC104] min-h-screen">
      {!hideNavbar && <Navbar />}
      <div className="min-h-screen">{children}</div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#1f2937',
            color: '#ffffff',
            border: '1px solid #374151',
          },
          success: {
            style: {
              background: '#065f46',
              color: '#ffffff',
            },
          },
          error: {
            style: {
              background: '#7f1d1d',
              color: '#ffffff',
            },
          },
        }}
      />
    </div>
  );
};

const AppRoutes = () => {
  const dispatch = useDispatch();

  // Check token validity on app load and periodically
  useEffect(() => {
    // Check token validity on app load
    dispatch(checkTokenValidity());
    
    // Start automatic token refresh service
    tokenRefreshService.startTokenRefreshCheck();
    
    // Check token validity every 5 minutes
    const interval = setInterval(() => {
      dispatch(checkTokenValidity());
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
      tokenRefreshService.stopTokenRefreshCheck();
    };
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
        <Route path="/mlm" element={<ProtectedRoute><Mlm /></ProtectedRoute>} />
        <Route path="/notification" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/chatdetail" element={<ProtectedRoute><ChatDetail /></ProtectedRoute>} />
        <Route path="/dispatch" element={<ProtectedRoute><Dispatch /></ProtectedRoute>} />
        <Route path="/livelocation" element={<ProtectedRoute><Livelocation /></ProtectedRoute>} />
        <Route path="/customersupport" element={<ProtectedRoute><CustomerSupport /></ProtectedRoute>} />
        <Route path="/websiteuser" element={<ProtectedRoute><WebsiteUser /></ProtectedRoute>} />
        <Route path="/adminmanagement" element={<ProtectedRoute><AdminManagement /></ProtectedRoute>} />
        <Route path="/drivermanagement" element={<ProtectedRoute><DriverManagement /></ProtectedRoute>} />
        <Route path="/driverprofile" element={<ProtectedRoute><DriverProfile /></ProtectedRoute>} />
        <Route path="/drivermonitoring" element={<ProtectedRoute><DriverMonitoring /></ProtectedRoute>} />
        <Route path="/driverhistory" element={<ProtectedRoute><DriverHistory /></ProtectedRoute>} />
        <Route path="/earningandpayouts" element={<ProtectedRoute><EarningsAndPayouts /></ProtectedRoute>} />
        <Route path="/ratings" element={<ProtectedRoute><Ratings /></ProtectedRoute>} />
        <Route path="/penalty" element={<ProtectedRoute><Penalty /></ProtectedRoute>} />
        <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
        <Route path="/referraltree" element={<ProtectedRoute><ReferralTree /></ProtectedRoute>} />
        <Route path="/customermanagement" element={<ProtectedRoute><CustomerManagement /></ProtectedRoute>} />
        <Route path="/customerprofile" element={<ProtectedRoute><CustomerProfile /></ProtectedRoute>} />
        <Route path="/customerhistory" element={<ProtectedRoute><CustomerHistory /></ProtectedRoute>} />
        <Route path="/customerearningpayout" element={<ProtectedRoute><CustomerEarningPayout /></ProtectedRoute>} />
        <Route path="/customermlm" element={<ProtectedRoute><CustomerMLM /></ProtectedRoute>} />
        <Route path="/customerrating" element={<ProtectedRoute><CustomerRatings /></ProtectedRoute>} />
        <Route path="/customercomplain" element={<ProtectedRoute><CustomerComplain /></ProtectedRoute>} />
        <Route path="/customerreferraltree" element={<ProtectedRoute><CustomerReferralTree /></ProtectedRoute>} />
        <Route path="/proposalmanagement" element={<ProtectedRoute><ProposalManagement /></ProtectedRoute>} />
        <Route path="/agreementrecord" element={<ProtectedRoute><AgreementRecord /></ProtectedRoute>} />
        <Route path="/marketplacecontrol" element={<ProtectedRoute><MarketPlaceControl /></ProtectedRoute>} />
        <Route path="/overview" element={<ProtectedRoute><OverView /></ProtectedRoute>} />
        <Route path="/fraudprofile/:id" element={<ProtectedRoute><FraudProfile /></ProtectedRoute>} />
        <Route path="/autolockRulesPanel" element={<ProtectedRoute><AutoLockRulesPanel /></ProtectedRoute>} />
        <Route path="/ruleeditorpanel" element={<ProtectedRoute><RuleEditorPanel /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/paymentoverview" element={<ProtectedRoute><PaymentOverview /></ProtectedRoute>} />
        <Route path="/walletadjustment" element={<ProtectedRoute><WalletAdjustment /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><WithdrawalManagement /></ProtectedRoute>} />
        <Route path="/walletfreezingrules" element={<ProtectedRoute><WalletFreezingRule /></ProtectedRoute>} />
        <Route path="/transactionlog" element={<ProtectedRoute><TransactionLog /></ProtectedRoute>} />
        <Route path="/alertnotification" element={<ProtectedRoute><AlertAndSmartNotifi /></ProtectedRoute>} />
        <Route path="/unachievedpool" element={<ProtectedRoute><UnachievedPoolManage /></ProtectedRoute>} />
        <Route path="/kycverification" element={<ProtectedRoute><KYCVerificationTable /></ProtectedRoute>} />
        <Route path="/serviceProvider" element={<ProtectedRoute><ServiceProvider /></ProtectedRoute>} />
        <Route path="/serviceProviderDetail/:id" element={<ProtectedRoute><ServiceProviderDetail /></ProtectedRoute>} />
        <Route path="/driverhiring" element={<ProtectedRoute><DriverHiring /></ProtectedRoute>} />
        <Route path="/driverhiringdetail/:id" element={<ProtectedRoute><DriverHiringDetail /></ProtectedRoute>} />
        <Route path="/vendorreq" element={<ProtectedRoute><VendorOnBordingReq /></ProtectedRoute>} />
        <Route path="/drawalRequest" element={<ProtectedRoute><WithDrawalRequest /></ProtectedRoute>} />
        <Route path="/complainresolve" element={<ProtectedRoute><ComplainResolution /></ProtectedRoute>} />
        <Route path="/complaindetail/:id" element={<ProtectedRoute><ComplaintDetails /></ProtectedRoute>} />
        <Route path="/promocode" element={<ProtectedRoute><PromoCode /></ProtectedRoute>} />
        <Route path="/promocodedetail/:id" element={<ProtectedRoute><PromoCodeDetails /></ProtectedRoute>} />
        <Route path="/accountedit" element={<ProtectedRoute><ManualAccountEdits /></ProtectedRoute>} />
        <Route path="/reviewandrating" element={<ProtectedRoute><ReviewAndRating /></ProtectedRoute>} />
        <Route path="/officialsandfeed" element={<ProtectedRoute><OfficialsAndFeed /></ProtectedRoute>} />
        <Route path="/bookingcharges" element={<ProtectedRoute><BookingCharges /></ProtectedRoute>} />
        <Route path="/bookingcharges/carcab" element={<ProtectedRoute><BookingCharges /></ProtectedRoute>} />
        <Route path="/bookingcharges/bike" element={<ProtectedRoute><BookingCharges /></ProtectedRoute>} />
        <Route path="/bookingcharges/carrecovery" element={<ProtectedRoute><BookingCharges /></ProtectedRoute>} />
        <Route path="/bookingcharges/shiftingmovers" element={<ProtectedRoute><BookingCharges /></ProtectedRoute>} />
        <Route path="/bookingcharges/appointmentservices" element={<ProtectedRoute><BookingCharges /></ProtectedRoute>} />
        <Route path="/reportanalytics" element={<ProtectedRoute><ReportAnalytics /></ProtectedRoute>} />
        <Route path="/driverreport" element={<ProtectedRoute><DriverReport /></ProtectedRoute>} />
        <Route path="/rideservicereport" element={<ProtectedRoute><RideServiceReport /></ProtectedRoute>} />
        <Route path="/supportreport" element={<ProtectedRoute><SupportReport /></ProtectedRoute>} />
        <Route path="/earningandcommission" element={<ProtectedRoute><EarningAndCommission /></ProtectedRoute>} />
        <Route path="/approvalactivities" element={<ProtectedRoute><ApprovalActivities /></ProtectedRoute>} />
        <Route path="/teammlmreport" element={<ProtectedRoute><TeamMLMReport /></ProtectedRoute>} />
        <Route path="/withdrawalandtransaction" element={<ProtectedRoute><WithdrawalTransactionLog /></ProtectedRoute>} />
        <Route path="/customreportgenerator" element={<ProtectedRoute><CustomReportGenerator /></ProtectedRoute>} />
        <Route path="/customreporttable" element={<ProtectedRoute><CustomReportTable /></ProtectedRoute>} />
      </Routes>
    </Layout>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;