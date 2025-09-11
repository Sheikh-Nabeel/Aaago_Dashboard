import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/livelocation' || location.pathname === '/';
  return (
    <div className="bg-[#013220] text-[#DDC104] min-h-screen">
      {!hideNavbar && <Navbar />}
      <div className="min-h-screen">{children}</div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/mlm" element={<Mlm />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/chatdetail" element={<ChatDetail />} />
        <Route path="/dispatch" element={<Dispatch />} />
        <Route path="/livelocation" element={<Livelocation />} />
        <Route path="/adminmanagement" element={<AdminManagement />} />
        <Route path="/drivermanagement" element={<DriverManagement />} />
        <Route path="/driverprofile" element={<DriverProfile />} />
        <Route path="/drivermonitoring" element={<DriverMonitoring />} />
        <Route path="/driverhistory" element={<DriverHistory />} />
        <Route path="/earningandpayouts" element={<EarningsAndPayouts />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/penalty" element={<Penalty />} />
        <Route path="/report" element={<Report />} />
        <Route path="/referraltree" element={<ReferralTree />} />
        <Route path="/customermanagement" element={<CustomerManagement />} />
        <Route path="/customerprofile" element={<CustomerProfile />} />
        <Route path="/customerhistory" element={<CustomerHistory />} />
        <Route path="/customerearningpayout" element={<CustomerEarningPayout />} />
        <Route path="/customermlm" element={<CustomerMLM />} />
        <Route path="/customerrating" element={<CustomerRatings />} />
        <Route path="/customercomplain" element={<CustomerComplain />} />
        <Route path="/customerreferraltree" element={<CustomerReferralTree />} />
        <Route path="/proposalmanagement" element={<ProposalManagement />} />
        <Route path="/agreementrecord" element={<AgreementRecord />} />
        <Route path="/marketplacecontrol" element={<MarketPlaceControl />} />
        <Route path="/overview" element={<OverView />} />
        <Route path="/fraudprofile/:id" element={<FraudProfile />} />
        <Route path="/autolockRulesPanel" element={<AutoLockRulesPanel />} />
        <Route path="/ruleeditorpanel" element={<RuleEditorPanel />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/paymentoverview" element={<PaymentOverview />} />
        <Route path="/walletadjustment" element={<WalletAdjustment />} />
        <Route path="/transactions" element={<WithdrawalManagement />} />
        <Route path="/walletfreezingrules" element={<WalletFreezingRule />} />
        <Route path="/transactionlog" element={<TransactionLog />} />
        <Route path="/alertnotification" element={<AlertAndSmartNotifi />} />
        <Route path="/unachievedpool" element={<UnachievedPoolManage />} />
        <Route path="/kycverification" element={<KYCVerificationTable />} />
        <Route path="/serviceProvider" element={<ServiceProvider />} />
        <Route path="/serviceProviderDetail/:id" element={<ServiceProviderDetail />} />
        <Route path="/driverhiring" element={<DriverHiring />} />
        <Route path="/driverhiringdetail/:id" element={<DriverHiringDetail />} />
        <Route path="/vendorreq" element={<VendorOnBordingReq />} />
        <Route path="/drawalRequest" element={<WithDrawalRequest />} />
        <Route path="/complainresolve" element={<ComplainResolution />} />
        <Route path="/complaindetail/:id" element={<ComplaintDetails />} />
        <Route path="/promocode" element={<PromoCode />} />
        <Route path="/promocodedetail/:id" element={<PromoCodeDetails />} />
        <Route path="/accountedit" element={<ManualAccountEdits />} />
        <Route path="/reviewandrating" element={<ReviewAndRating />} />
        <Route path="/reportanalytics" element={<ReportAnalytics />} />
        <Route path="/driverreport" element={<DriverReport />} />
        <Route path="/rideservicereport" element={<RideServiceReport />} />
        <Route path="/supportreport" element={<SupportReport />} />
        <Route path="/earningandcommission" element={<EarningAndCommission />} />
        <Route path="/approvalactivities" element={<ApprovalActivities />} />
        <Route path="/teammlmreport" element={<TeamMLMReport />} />
        <Route path="/withdrawalandtransaction" element={<WithdrawalTransactionLog />} />
        <Route path="/customreportgenerator" element={<CustomReportGenerator />} />
        <Route path="/customreporttable" element={<CustomReportTable />} />
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