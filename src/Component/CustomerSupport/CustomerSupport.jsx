import React, { useState, useEffect } from 'react';
import { MdPriorityHigh, MdOutlineLowPriority, MdSearch, MdRefresh, MdTrendingUp } from 'react-icons/md';
import { FaExclamationTriangle, FaEye, FaEdit, FaUserPlus } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { BiFilterAlt } from 'react-icons/bi';
import Sidebar from '../Home/Sidebar';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

// Validation arrays
const validPriorities = ["low", "medium", "high", "urgent"];
const validCategories = [
  "technical",
  "billing",
  "account",
  "booking",
  "payment",
  "driver",
  "vehicle",
  "mlm",
  "general",
  "other"
];

const CustomerSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
    search: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalTickets: 0,
    limit: 10
  });
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    ticketId: '',
    assignedTo: '',
    internalNote: ''
  });
  const [agents, setAgents] = useState([]);
  const [assignmentLoading, setAssignmentLoading] = useState(false);
  const [responseData, setResponseData] = useState({
    message: '',
    isInternal: false
  });
  const [responseLoading, setResponseLoading] = useState(false);
  const [responses, setResponses] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [showStatistics, setShowStatistics] = useState(false);
  const [statisticsLoading, setStatisticsLoading] = useState(false);
  const [ticketView, setTicketView] = useState('all'); // 'all', 'assigned', 'unassigned'
  const [assignedTickets, setAssignedTickets] = useState([]);
  const [unassignedTickets, setUnassignedTickets] = useState([]);
  const [ticketResponses, setTicketResponses] = useState([]);
  const [responsesLoading, setResponsesLoading] = useState(false);
  const [responsesPagination, setResponsesPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResponses: 0
  });
  const [showResponsesModal, setShowResponsesModal] = useState(false);
  const [selectedTicketForResponses, setSelectedTicketForResponses] = useState(null);
  const [escalatedTickets, setEscalatedTickets] = useState([]);
  const [escalatedPagination, setEscalatedPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalTickets: 0
  });
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [escalationData, setEscalationData] = useState({
    ticketId: '',
    escalateTo: '',
    reason: ''
  });
  const [escalationLoading, setEscalationLoading] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  
  // Note Modal States
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteData, setNoteData] = useState({ ticketId: '', newStatus: '', note: '' });
  
  // Priority Change Modal States
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [priorityData, setPriorityData] = useState({ ticketId: '', currentPriority: '', newPriority: '', reason: '' });

  // API Functions
  const fetchTickets = async (page = pagination.currentPage, resetPage = false) => {
    try {
      setLoading(true);
      const baseUrl = 'http://localhost:3001/api';
      const currentPage = resetPage ? 1 : page;
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: pagination.limit.toString()
      });
      
      if (filters.priority !== 'all') params.append('priority', filters.priority);
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      
      const response = await axios.get(`${baseUrl}/support/tickets?${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        setTickets(response.data.data.tickets);
        setPagination({
          ...response.data.data.pagination,
          limit: pagination.limit
        });
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const escalateTicket = async (ticketId, escalateTo, reason) => {
    try {
      const baseUrl = 'http://localhost:3001/api';
      const response = await axios.patch(`${baseUrl}/support/tickets/${ticketId}/escalate`, {
        escalateTo,
        reason
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      console.error('Error escalating ticket:', error);
      throw error;
    }
  };

  const fetchAdminsAndSuperadmins = async () => {
    try {
      const baseUrl = 'http://localhost:3001/api';
      const response = await axios.get(`${baseUrl}/user/admins-and-superadmins`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        return response.data.users;
      }
    } catch (error) {
      console.error('Error fetching admins and superadmins:', error);
      throw error;
    }
  };



  // Filter handlers
  const handleFilterChange = (filterType, value) => {
    setFilterLoading(true);
    setFilters(prev => ({ ...prev, [filterType]: value }));
    // Reset to first page when filters change
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    // Trigger new API call with updated filters
    setTimeout(() => {
      fetchTickets(1, true);
      setFilterLoading(false);
    }, 100);
  };

  const handleLimitChange = (newLimit) => {
    setFilterLoading(true);
    setPagination(prev => ({ ...prev, limit: parseInt(newLimit), currentPage: 1 }));
    // Trigger new API call with updated limit
    setTimeout(() => {
      fetchTickets(1, true);
      setFilterLoading(false);
    }, 100);
  };

  const handlePageChange = (newPage) => {
    setLoading(true);
    setPagination(prev => ({ ...prev, currentPage: newPage }));
    fetchTickets(newPage);
  };

  const fetchEscalatedTickets = async (page = 1, limit = 10, priority = '', category = '', sortOrder = 'desc') => {
    try {
      setLoading(true);
      const baseUrl = 'http://localhost:3001/api';
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortOrder
      });
      
      if (priority) params.append('priority', priority);
      if (category) params.append('category', category);
      
      const response = await axios.get(`${baseUrl}/support/escalated-tickets?${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        setEscalatedTickets(response.data.data.tickets);
        setEscalatedPagination(response.data.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching escalated tickets:', error);
      toast.error('Failed to fetch escalated tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTicketDetails = async (ticketId) => {
    try {
      const baseUrl = 'http://localhost:3001/api';
      const response = await axios.get(`${baseUrl}/support/tickets/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        setSelectedTicket(response.data.data.ticket);
        setShowDetailModal(true);
        // Fetch responses for this ticket
        fetchTicketResponses(ticketId);
      }
    } catch (error) {
      console.error('Error fetching ticket details:', error);
    }
  };

  const updateTicketStatus = async (ticketId, status, internalNote = '') => {
    try {
      const baseUrl = 'http://localhost:3001/api';
      const response = await axios.patch(`${baseUrl}/support/tickets/${ticketId}/status`, {
        status,
        internalNote
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        // Refresh tickets list
        fetchTickets(pagination.currentPage);
        // Update selected ticket if modal is open
        if (selectedTicket && selectedTicket._id === ticketId) {
          setSelectedTicket(response.data.data.ticket);
        }
        toast.success('Ticket status updated successfully!');
      }
    } catch (error) {
      console.error('Error updating ticket status:', error);
      toast.error('Failed to update ticket status');
    }
  };

  const handleNoteSubmit = () => {
    updateTicketStatus(noteData.ticketId, noteData.newStatus, noteData.note);
    setShowNoteModal(false);
    setNoteData({ ticketId: '', newStatus: '', note: '' });
  };

  const updateTicketPriority = async (ticketId, priority, reason = '') => {
    try {
      const baseUrl = 'http://localhost:3001/api';
      const response = await axios.patch(`${baseUrl}/support/tickets/${ticketId}/priority`, {
        priority,
        reason
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        // Refresh tickets list
        fetchTickets(pagination.currentPage);
        // Update selected ticket if modal is open
        if (selectedTicket && selectedTicket._id === ticketId) {
          setSelectedTicket(response.data.data.ticket);
        }
        toast.success('Ticket priority updated successfully!');
      }
    } catch (error) {
      console.error('Error updating ticket priority:', error);
      toast.error('Failed to update ticket priority');
    }
  };

  const handlePrioritySubmit = () => {
    updateTicketPriority(priorityData.ticketId, priorityData.newPriority, priorityData.reason);
    setShowPriorityModal(false);
    setPriorityData({ ticketId: '', currentPriority: '', newPriority: '', reason: '' });
  };

  const assignTicket = async (ticketId, assignedTo, internalNote = '') => {
    try {
      const baseUrl = 'http://localhost:3001/api';
      const response = await axios.patch(`${baseUrl}/support/tickets/${ticketId}/assign`, {
        agentId: assignedTo,
        internalNote
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        // Refresh tickets list
        fetchTickets(pagination.currentPage);
        // Update selected ticket if modal is open
        if (selectedTicket && selectedTicket._id === ticketId) {
          setSelectedTicket(response.data.data.ticket);
        }
        return response.data;
      }
    } catch (error) {
      console.error('Error assigning ticket:', error);
      throw error;
    }
  };

  const addTicketResponse = async (ticketId, message, isInternal = false) => {
    try {
      const baseUrl = 'http://localhost:3001/api';
      const response = await axios.post(`${baseUrl}/support/tickets/${ticketId}/responses`, {
        message,
        isInternal
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        // Refresh ticket details if modal is open
        if (selectedTicket && selectedTicket._id === ticketId) {
          fetchTicketDetails(ticketId);
        }
        return response.data;
      }
    } catch (error) {
      console.error('Error adding ticket response:', error);
      throw error;
    }
  };

  const fetchTicketStatistics = async () => {
    try {
      const baseUrl = 'http://localhost:3001/api';
      const response = await axios.get(`${baseUrl}/support/statistics`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error('Error fetching ticket statistics:', error);
      throw error;
    }
  };

  const fetchAgents = async () => {
    try {
      const baseUrl = 'http://localhost:3001/api';
      // Assuming there's an endpoint to get agents/admins
      const response = await axios.get(`${baseUrl}/users/agents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        setAgents(response.data.data.agents || []);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
      // Fallback: create mock agents for demo
      setAgents([
        { _id: '68c43cb5ca115ce2e7e9ec0d', firstName: 'Ahmad', lastName: '', email: 'daniiiraja776@gmail.com' },
        { _id: '68c43cb5ca115ce2e7e9ec0e', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
        { _id: '68c43cb5ca115ce2e7e9ec0f', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' }
      ]);
    }
  };

  const fetchAssignedTickets = async (page = 1) => {
    try {
      setLoading(true);
      const baseUrl = 'http://localhost:3001/api';
      const response = await axios.get(`${baseUrl}/support/my-assigned-tickets?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        setAssignedTickets(response.data.data.tickets);
        if (ticketView === 'assigned') {
          setTickets(response.data.data.tickets);
          setPagination(response.data.data.pagination);
        }
      }
    } catch (error) {
      console.error('Error fetching assigned tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnassignedTickets = async (page = 1) => {
    try {
      setLoading(true);
      const baseUrl = 'http://localhost:3001/api';
      const response = await axios.get(`${baseUrl}/support/unassigned-tickets?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        setUnassignedTickets(response.data.data.tickets);
        if (ticketView === 'unassigned') {
          setTickets(response.data.data.tickets);
          setPagination(response.data.data.pagination);
        }
      }
    } catch (error) {
      console.error('Error fetching unassigned tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTicketResponses = async (ticketId, page = 1) => {
    try {
      setResponsesLoading(true);
      const baseUrl = 'http://localhost:3001/api';
      const response = await axios.get(`${baseUrl}/support/tickets/${ticketId}/responses?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        setTicketResponses(response.data.data.responses);
        setResponsesPagination(response.data.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching ticket responses:', error);
      toast.error('Failed to fetch ticket responses. Please try again.');
    } finally {
      setResponsesLoading(false);
    }
  };

  const handleAssignTicket = async () => {
    if (!assignmentData.assignedTo) {
      toast.error('Please select an agent');
      return;
    }

    try {
      setAssignmentLoading(true);
      await assignTicket(assignmentData.ticketId, assignmentData.assignedTo, assignmentData.internalNote);
      setShowAssignmentModal(false);
      setAssignmentData({ ticketId: '', assignedTo: '', internalNote: '' });
      toast.success('Ticket assigned successfully!');
      refreshCurrentView();
    } catch (error) {
      toast.error('Failed to assign ticket. Please try again.');
    } finally {
      setAssignmentLoading(false);
    }
  };

  const openAssignModal = (ticketId) => {
    setAssignmentData({ ...assignmentData, ticketId });
    setShowAssignModal(true);
    if (agents.length === 0) {
      fetchAgents();
    }
  };

  const handleAddResponse = async () => {
    if (!responseData.message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    try {
      setResponseLoading(true);
      await addTicketResponse(selectedTicket._id, responseData.message, responseData.isInternal);
      setResponseData({ message: '', isInternal: false });
      // Refresh responses
      fetchTicketResponses(selectedTicket._id);
      toast.success('Response added successfully!');
    } catch (error) {
      toast.error('Failed to add response. Please try again.');
    } finally {
      setResponseLoading(false);
    }
  };

  const handleShowStatistics = async () => {
    try {
      setStatisticsLoading(true);
      const stats = await fetchTicketStatistics();
      setStatistics(stats);
      setShowStatistics(true);
    } catch (error) {
      toast.error('Failed to fetch statistics. Please try again.');
    } finally {
      setStatisticsLoading(false);
    }
  };

  const handleEscalateTicket = async () => {
    try {
      setEscalationLoading(true);
      await escalateTicket(escalationData.ticketId, escalationData.escalateTo, escalationData.reason);
      setShowEscalationModal(false);
      setEscalationData({ ticketId: '', escalateTo: '', reason: '' });
      toast.success('Ticket escalated successfully!');
      refreshCurrentView();
    } catch (error) {
      toast.error('Failed to escalate ticket. Please try again.');
    } finally {
      setEscalationLoading(false);
    }
  };

  const openEscalationModal = (ticketId) => {
    setEscalationData({ ...escalationData, ticketId });
    setShowEscalationModal(true);
  };

  const openPriorityModal = (ticketId, currentPriority) => {
    setPriorityData({ ...priorityData, ticketId, currentPriority });
    setShowPriorityModal(true);
  };



  const openAssignmentModal = async (ticketId) => {
    try {
      const adminsList = await fetchAdminsAndSuperadmins();
      setAdmins(adminsList);
      setAssignmentData({ ...assignmentData, ticketId });
      setShowAssignmentModal(true);
    } catch (error) {
      toast.error('Failed to load admins. Please try again.');
    }
  };

  const handleTicketViewChange = (view) => {
    setTicketView(view);
    switch (view) {
      case 'all':
        fetchTickets();
        break;
      case 'assigned':
        if (assignedTickets.length > 0) {
          setTickets(assignedTickets);
        } else {
          fetchAssignedTickets();
        }
        break;
      case 'unassigned':
        if (unassignedTickets.length > 0) {
          setTickets(unassignedTickets);
        } else {
          fetchUnassignedTickets();
        }
        break;
      case 'escalated':
        if (escalatedTickets.length > 0) {
          setTickets(escalatedTickets);
          setPagination(escalatedPagination);
        } else {
          fetchEscalatedTickets();
        }
        break;
      default:
        fetchTickets();
    }
  };

  const refreshCurrentView = () => {
    switch (ticketView) {
      case 'assigned':
        fetchAssignedTickets();
        break;
      case 'unassigned':
        fetchUnassignedTickets();
        break;
      case 'escalated':
        fetchEscalatedTickets();
        break;
      default:
        fetchTickets();
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchAssignedTickets();
    fetchUnassignedTickets();
  }, []);

  // Effect to handle filter and pagination changes
  useEffect(() => {
    if (ticketView === 'all') {
      fetchTickets();
    } else if (ticketView === 'assigned') {
      fetchAssignedTickets();
    } else if (ticketView === 'unassigned') {
      fetchUnassignedTickets();
    } else if (ticketView === 'escalated') {
      fetchEscalatedTickets();
    }
  }, [filters, pagination.currentPage, pagination.limit, ticketView]);

  // Helper Functions
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <MdPriorityHigh className="text-red-500" size={20} />;
      case 'medium':
        return <FaExclamationTriangle className="text-yellow-500" size={16} />;
      case 'low':
        return <MdOutlineLowPriority className="text-green-500" size={20} />;
      default:
        return <MdOutlineLowPriority className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'text-red-400 bg-red-900/20 border-red-400';
      case 'in-progress':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-400';
      case 'resolved':
        return 'text-green-400 bg-green-900/20 border-green-400';
      case 'closed':
        return 'text-gray-400 bg-gray-900/20 border-gray-400';
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-400';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filters.status === 'all' || ticket.status === filters.status;
    const matchesPriority = filters.priority === 'all' || ticket.priority === filters.priority;
    const matchesCategory = filters.category === 'all' || ticket.category === filters.category;
    const matchesSearch = filters.search === '' || 
      ticket.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
      ticket.ticketId.toLowerCase().includes(filters.search.toLowerCase()) ||
      `${ticket.user.firstName} ${ticket.user.lastName}`.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesCategory && matchesSearch;
  });

  return (
    <div className="flex bg-[#013220] text-yellow-400 min-h-screen">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#f59e0b',
            border: '1px solid #059669',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <Sidebar />
      
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-[#1a4a2e] to-[#2d5a3d] p-6 rounded-xl border border-yellow-400/20 shadow-lg">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">Customer Support</h1>
            <p className="text-gray-400 mt-1">Manage and track customer tickets efficiently</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleShowStatistics}
              disabled={statisticsLoading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-400 transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <BiFilterAlt size={20} />
              {statisticsLoading ? 'Loading...' : 'Statistics'}
            </button>
            <button
              onClick={refreshCurrentView}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#013220] rounded-lg hover:from-yellow-300 hover:to-yellow-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
            >
              <MdRefresh size={20} />
              Refresh
            </button>
          </div>
        </div>

        {/* Ticket View Tabs */}
        <div className="flex gap-3 mb-8 bg-[#1a4a2e] p-2 rounded-xl border border-yellow-400/20">
          <button
            onClick={() => handleTicketViewChange('all')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
              ticketView === 'all'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#013220] shadow-lg'
                : 'text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300'
            }`}
          >
            All Tickets
          </button>
          <button
            onClick={() => handleTicketViewChange('assigned')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
              ticketView === 'assigned'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#013220] shadow-lg'
                : 'text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300'
            }`}
          >
            My Assigned <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs ml-2">{assignedTickets.length}</span>
          </button>
          <button
            onClick={() => handleTicketViewChange('unassigned')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
              ticketView === 'unassigned'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#013220] shadow-lg'
                : 'text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300'
            }`}
          >
            Unassigned <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs ml-2">{unassignedTickets.length}</span>
          </button>
          <button
            onClick={() => handleTicketViewChange('escalated')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
              ticketView === 'escalated'
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-[#013220] shadow-lg'
                : 'text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300'
            }`}
          >
            Escalated <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs ml-2">{escalatedTickets.length}</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-r from-[#1a4a2e] to-[#2d5a3d] border border-yellow-400/30 rounded-xl p-6 mb-8 shadow-lg">
          {filterLoading && (
            <div className="flex items-center gap-2 mb-4 text-yellow-300">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400"></div>
              <span className="text-sm">Applying filters...</span>
            </div>
          )}
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-400/20 rounded-lg">
                <BiFilterAlt size={20} className="text-yellow-400" />
              </div>
              <span className="font-semibold text-lg text-yellow-300">Filters:</span>
            </div>
            
            <div className="flex items-center gap-3 bg-[#013220] border border-yellow-400/30 rounded-lg px-4 py-2 focus-within:border-yellow-400 transition-colors">
              <MdSearch size={20} className="text-yellow-400" />
              <input
                type="text"
                placeholder="Search tickets by ID, subject, or user..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="bg-transparent text-white placeholder-gray-400 focus:outline-none flex-1 min-w-[200px]"
              />
            </div>

            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="bg-[#013220] border border-yellow-400/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400 transition-colors hover:border-yellow-400/50 cursor-pointer"
            >
              <option value="all" className="bg-[#013220]">All Status</option>
              <option value="open" className="bg-[#013220]">Open</option>
              <option value="in-progress" className="bg-[#013220]">In Progress</option>
              <option value="resolved" className="bg-[#013220]">Resolved</option>
              <option value="closed" className="bg-[#013220]">Closed</option>
            </select>

            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="bg-[#013220] border border-yellow-400/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400 transition-colors hover:border-yellow-400/50 cursor-pointer"
            >
              <option value="all" className="bg-[#013220]">All Priority</option>
              {validPriorities.map(priority => (
                <option key={priority} value={priority} className="capitalize bg-[#013220]">
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="bg-[#013220] border border-yellow-400/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400 transition-colors hover:border-yellow-400/50 cursor-pointer"
            >
              <option value="all" className="bg-[#013220]">All Categories</option>
              {validCategories.map(category => (
                <option key={category} value={category} className="capitalize bg-[#013220]">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          {/* Items per page selector */}
          <div className="flex flex-col">
            <label className="text-yellow-300 text-sm font-medium mb-2">Items per page</label>
            <select
              value={pagination.limit}
              onChange={(e) => handleLimitChange(e.target.value)}
              className="bg-[#013220] border border-yellow-400/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400 transition-colors hover:border-yellow-400/50 cursor-pointer"
            >
              <option value={10} className="bg-[#013220]">10</option>
              <option value={25} className="bg-[#013220]">25</option>
              <option value={50} className="bg-[#013220]">50</option>
              <option value={100} className="bg-[#013220]">100</option>
            </select>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-gradient-to-br from-[#1a4a2e] to-[#2d5a3d] border border-yellow-400/30 rounded-xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mb-4"></div>
              <p className="text-yellow-300 font-medium">Loading tickets...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#013220]">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold tracking-wide">Ticket ID</th>
                      <th className="px-6 py-4 text-left font-bold tracking-wide">Customer</th>
                      <th className="px-6 py-4 text-left font-bold tracking-wide">Subject</th>
                      <th className="px-6 py-4 text-left font-bold tracking-wide">Priority</th>
                      <th className="px-6 py-4 text-left font-bold tracking-wide">Status</th>
                      <th className="px-6 py-4 text-left font-bold tracking-wide">Category</th>
                      <th className="px-6 py-4 text-left font-bold tracking-wide">Created</th>
                      <th className="px-6 py-4 text-left font-bold tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="px-4 py-8 text-center text-gray-400">
                          No tickets found
                        </td>
                      </tr>
                    ) : (
                      filteredTickets.map((ticket) => (
                        <tr key={ticket._id} className="border-b border-yellow-400/20 hover:bg-gradient-to-r hover:from-yellow-400/5 hover:to-green-400/5 transition-all duration-200 group">
                          <td className="px-4 py-4 font-mono text-sm font-medium text-yellow-300">{ticket.ticketId}</td>
                          <td className="px-4 py-4">
                            <div>
                              <div className="font-medium text-white group-hover:text-yellow-300 transition-colors">{ticket.user.firstName} {ticket.user.lastName}</div>
                              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{ticket.user.email}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="max-w-xs truncate font-medium" title={ticket.subject}>
                              {ticket.subject}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              {getPriorityIcon(ticket.priority)}
                              <span className="capitalize font-medium">{ticket.priority}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusColor(ticket.status)}`}>
                              {ticket.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </td>
                          <td className="px-4 py-4 capitalize font-medium">{ticket.category}</td>
                          <td className="px-4 py-4 text-sm text-gray-300">{formatDate(ticket.createdAt)}</td>
                          <td className="px-4 py-4">
                            <div className="flex gap-1">
                              <button
                                onClick={() => fetchTicketDetails(ticket._id)}
                                className="p-2 text-blue-400 hover:text-white hover:bg-blue-500 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg border border-blue-400/30 hover:border-blue-500"
                                title="View Details"
                              >
                                <FaEye size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedTicket(ticket);
                                  setShowDetailModal(true);
                                }}
                                className="p-2 text-green-400 hover:text-white hover:bg-green-500 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg border border-green-400/30 hover:border-green-500"
                                title="Quick Edit"
                              >
                                <FaEdit size={14} />
                              </button>
                              <button
                                onClick={() => openAssignmentModal(ticket._id)}
                                className="p-2 text-yellow-400 hover:text-black hover:bg-yellow-400 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg border border-yellow-400/30 hover:border-yellow-400"
                                title="Assign Ticket"
                              >
                                <FaUserPlus size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedTicketForResponses(ticket);
                                  setShowResponsesModal(true);
                                  fetchTicketResponses(ticket._id);
                                }}
                                className="p-2 text-purple-400 hover:text-white hover:bg-purple-500 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg border border-purple-400/30 hover:border-purple-500"
                                title="View Responses"
                              >
                                <IoMdTime size={14} />
                              </button>
                              <button
                                onClick={() => openEscalationModal(ticket._id)}
                                className="p-2 text-red-400 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg border border-red-400/30 hover:border-red-500"
                                title="Escalate Ticket"
                              >
                                <MdTrendingUp size={14} />
                              </button>
                              <button
                                onClick={() => openPriorityModal(ticket._id, ticket.priority)}
                                className="p-2 text-orange-400 hover:text-white hover:bg-orange-500 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg border border-orange-400/30 hover:border-orange-500"
                                title="Change Priority"
                              >
                                <MdPriorityHigh size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-between items-center p-4 border-t border-yellow-400/20">
                  <div className="text-sm text-gray-400">
                    Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to {Math.min(pagination.currentPage * pagination.limit, pagination.totalTickets)} of {pagination.totalTickets} tickets
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="px-3 py-1 bg-yellow-400 text-[#013220] rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-300 transition-colors"
                    >
                      Previous
                    </button>
                    
                    {/* Page Numbers */}
                    <div className="flex gap-1">
                      {(() => {
                        const pages = [];
                        const maxVisible = 5;
                        let start = Math.max(1, pagination.currentPage - Math.floor(maxVisible / 2));
                        let end = Math.min(pagination.totalPages, start + maxVisible - 1);
                        
                        if (end - start + 1 < maxVisible) {
                          start = Math.max(1, end - maxVisible + 1);
                        }
                        
                        for (let i = start; i <= end; i++) {
                          pages.push(
                            <button
                              key={i}
                              onClick={() => handlePageChange(i)}
                              className={`px-3 py-1 rounded transition-colors ${
                                i === pagination.currentPage
                                  ? 'bg-yellow-400 text-[#013220] font-medium'
                                  : 'bg-[#013220] text-yellow-400 border border-yellow-400/30 hover:bg-yellow-400/10'
                              }`}
                            >
                              {i}
                            </button>
                          );
                        }
                        return pages;
                      })()}
                    </div>
                    
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      className="px-3 py-1 bg-yellow-400 text-[#013220] rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-300 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Ticket Detail Modal */}
        {showDetailModal && selectedTicket && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#013220] border border-yellow-400 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Ticket Details - {selectedTicket.ticketId}</h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-yellow-400/30 pb-2">Customer Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {selectedTicket.user.firstName} {selectedTicket.user.lastName}</p>
                      <p><span className="font-medium">Email:</span> {selectedTicket.user.email}</p>
                      <p><span className="font-medium">Phone:</span> {selectedTicket.user.phoneNumber}</p>
                    </div>
                  </div>

                  {/* Ticket Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-yellow-400/30 pb-2">Ticket Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Subject:</span> {selectedTicket.subject}</p>
                      <p><span className="font-medium">Category:</span> {selectedTicket.category}</p>
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Priority:</span>
                        {getPriorityIcon(selectedTicket.priority)}
                        <span className="capitalize">{selectedTicket.priority}</span>
                      </p>
                      <p><span className="font-medium">Created:</span> {formatDate(selectedTicket.createdAt)}</p>
                      <p><span className="font-medium">Last Updated:</span> {formatDate(selectedTicket.updatedAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold border-b border-yellow-400/30 pb-2 mb-4">Description</h3>
                  <p className="bg-[#1a4a2e] p-4 rounded border border-yellow-400/20">{selectedTicket.description}</p>
                </div>

                {/* Status Update */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold border-b border-yellow-400/30 pb-2 mb-4">Update Status</h3>
                  <div className="flex gap-4 items-center">
                    <select
                      value={selectedTicket.status}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        setNoteData({ ticketId: selectedTicket._id, newStatus, note: '' });
                        setShowNoteModal(true);
                      }}
                      className="bg-[#1a4a2e] border border-yellow-400/50 rounded px-3 py-2 focus:outline-none focus:border-yellow-400"
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                    <span className={`px-3 py-1 rounded-full text-sm border whitespace-nowrap ${getStatusColor(selectedTicket.status)}`}>
                      Current: {selectedTicket.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Internal Notes */}
                {selectedTicket.internalNotes && selectedTicket.internalNotes.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold border-b border-yellow-400/30 pb-2 mb-4">Internal Notes</h3>
                    <div className="space-y-2">
                      {selectedTicket.internalNotes.map((note, index) => (
                        <div key={index} className="bg-[#1a4a2e] p-3 rounded border border-yellow-400/20">
                          <p className="text-sm">{note.note}</p>
                          <p className="text-xs text-gray-400 mt-1">{formatDate(note.addedAt)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ticket Responses */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold border-b border-yellow-400/30 pb-2 mb-4">Responses</h3>
                  
                  {/* Existing Responses */}
                  <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                    {responses.length > 0 ? (
                      responses.map((response, index) => (
                        <div key={index} className={`p-3 rounded border ${
                          response.isInternal 
                            ? 'bg-[#1a4a2e] border-yellow-400/20' 
                            : 'bg-[#0f3a1f] border-green-400/20'
                        }`}>
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium text-yellow-400">
                              {response.respondent?.firstName} {response.respondent?.lastName}
                            </span>
                            <div className="flex items-center gap-2">
                              {response.isInternal && (
                                <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded">
                                  Internal
                                </span>
                              )}
                              <span className="text-xs text-gray-400">
                                {formatDate(response.createdAt)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm">{response.message}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm italic">No responses yet</p>
                    )}
                  </div>

                  {/* Add New Response */}
                  <div className="border-t border-yellow-400/30 pt-4">
                    <h4 className="text-md font-medium text-yellow-400 mb-3">Add Response</h4>
                    <div className="space-y-3">
                      <textarea
                        value={responseData.message}
                        onChange={(e) => setResponseData({ ...responseData, message: e.target.value })}
                        placeholder="Type your response here..."
                        className="w-full bg-[#1a4a2e] border border-yellow-400/50 rounded px-3 py-2 focus:outline-none focus:border-yellow-400 text-yellow-400 resize-none"
                        rows={3}
                      />
                      
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={responseData.isInternal}
                            onChange={(e) => setResponseData({ ...responseData, isInternal: e.target.checked })}
                            className="rounded border-yellow-400/50 bg-[#1a4a2e] text-yellow-400 focus:ring-yellow-400"
                          />
                          <span className="text-yellow-400">Internal response (not visible to customer)</span>
                        </label>
                        
                        <button
                          onClick={handleAddResponse}
                          disabled={responseLoading || !responseData.message.trim()}
                          className="px-4 py-2 bg-yellow-400 text-[#013220] rounded hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {responseLoading ? 'Adding...' : 'Add Response'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assignment Modal */}
        {showAssignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#013220] border border-yellow-400 rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-yellow-400">Assign Ticket</h2>
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setAssignmentData({ ticketId: '', assignedTo: '', internalNote: '' });
                  }}
                  className="text-gray-400 hover:text-yellow-400 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {/* Agent Selection */}
                <div>
                  <label className="block text-sm font-medium text-yellow-400 mb-2">
                    Select Agent
                  </label>
                  <select
                    value={assignmentData.assignedTo}
                    onChange={(e) => setAssignmentData({ ...assignmentData, assignedTo: e.target.value })}
                    className="w-full bg-[#1a4a2e] border border-yellow-400/50 rounded px-3 py-2 focus:outline-none focus:border-yellow-400 text-yellow-400"
                    required
                  >
                    <option value="">Choose an agent...</option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.firstName} {agent.lastName} ({agent.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Internal Note */}
                <div>
                  <label className="block text-sm font-medium text-yellow-400 mb-2">
                    Internal Note (Optional)
                  </label>
                  <textarea
                    value={assignmentData.internalNote}
                    onChange={(e) => setAssignmentData({ ...assignmentData, internalNote: e.target.value })}
                    placeholder="Add any internal notes about this assignment..."
                    className="w-full bg-[#1a4a2e] border border-yellow-400/50 rounded px-3 py-2 focus:outline-none focus:border-yellow-400 text-yellow-400 resize-none"
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowAssignModal(false);
                      setAssignmentData({ ticketId: '', assignedTo: '', internalNote: '' });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-400 text-gray-400 rounded hover:bg-gray-400/10 transition-colors"
                    disabled={assignmentLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAssignTicket}
                    disabled={assignmentLoading || !assignmentData.assignedTo}
                    className="flex-1 px-4 py-2 bg-yellow-400 text-[#013220] rounded hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {assignmentLoading ? 'Assigning...' : 'Assign Ticket'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Escalation Modal */}
        {showEscalationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#013220] border border-red-400 rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-red-400">Escalate Ticket</h2>
                <button
                  onClick={() => {
                    setShowEscalationModal(false);
                    setEscalationData({ ticketId: '', escalateTo: '', reason: '' });
                  }}
                  className="text-gray-400 hover:text-red-400 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Alert Info */}
                <div className="bg-red-900/20 border border-red-400/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-400">
                    <FaExclamationTriangle size={16} />
                    <span className="text-sm font-medium">Escalation Notice</span>
                  </div>
                  <p className="text-sm text-red-300 mt-2">
                    This ticket will be escalated to a higher authority. Please provide clear reasoning for the escalation.
                  </p>
                </div>

                {/* Escalate To */}
                <div>
                  <label className="block text-sm font-medium text-red-400 mb-2">
                    Escalate To (Agent ID) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={escalationData.escalateTo}
                    onChange={(e) => setEscalationData({ ...escalationData, escalateTo: e.target.value.trim() })}
                    placeholder="Enter agent ID to escalate to..."
                    className="w-full bg-[#1a4a2e] border border-red-400/50 rounded-lg px-4 py-3 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 text-red-400 transition-all duration-200"
                    required
                  />
                  {escalationData.escalateTo && escalationData.escalateTo.length < 3 && (
                    <p className="text-red-400 text-xs mt-1">Agent ID must be at least 3 characters long</p>
                  )}
                </div>

                {/* Escalation Reason */}
                <div>
                  <label className="block text-sm font-medium text-red-400 mb-2">
                    Escalation Reason <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={escalationData.reason}
                    onChange={(e) => setEscalationData({ ...escalationData, reason: e.target.value })}
                    placeholder="Explain why this ticket needs to be escalated...\n\nExample reasons:\n• Complex technical issue requiring specialist\n• Customer complaint requiring management attention\n• Urgent priority escalation\n• Policy exception needed"
                    className="w-full bg-[#1a4a2e] border border-red-400/50 rounded-lg px-4 py-3 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 text-red-400 resize-none transition-all duration-200"
                    rows={6}
                    required
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-red-400 text-xs">
                      {escalationData.reason.length < 10 && escalationData.reason.length > 0 ? 
                        'Please provide more detailed reasoning' : ''}
                    </p>
                    <span className="text-xs text-gray-400">
                      {escalationData.reason.length}/500
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-red-400/20">
                  <button
                    onClick={() => {
                      setShowEscalationModal(false);
                      setEscalationData({ ticketId: '', escalateTo: '', reason: '' });
                    }}
                    className="flex-1 px-6 py-3 border border-gray-400/50 text-gray-400 rounded-lg hover:bg-gray-400/10 hover:border-gray-400 transition-all duration-200 font-medium"
                    disabled={escalationLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEscalateTicket}
                    disabled={escalationLoading || !escalationData.escalateTo || escalationData.escalateTo.length < 3 || !escalationData.reason || escalationData.reason.length < 10}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-red-500/25"
                  >
                    {escalationLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Escalating...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <MdTrendingUp size={18} />
                        Escalate Ticket
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assignment Modal */}
        {showAssignmentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#013220] border border-yellow-400 rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-yellow-400">Assign Ticket</h2>
                <button
                  onClick={() => {
                    setShowAssignmentModal(false);
                    setAssignmentData({ ticketId: '', assignedTo: '' });
                  }}
                  className="text-gray-400 hover:text-yellow-400 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Info */}
                <div className="bg-yellow-900/20 border border-yellow-400/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <FaUserPlus size={16} />
                    <span className="text-sm font-medium">Ticket Assignment</span>
                  </div>
                  <p className="text-sm text-yellow-300 mt-2">
                    Select an admin or superadmin to assign this ticket to.
                  </p>
                </div>

                {/* Assign To */}
                <div>
                  <label className="block text-sm font-medium text-yellow-400 mb-2">
                    Assign To <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={assignmentData.assignedTo}
                    onChange={(e) => setAssignmentData({ ...assignmentData, assignedTo: e.target.value })}
                    className="w-full bg-[#1a4a2e] border border-yellow-400/50 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-yellow-400 transition-all duration-200"
                    required
                  >
                    <option value="">Select admin or superadmin...</option>
                    {admins.map((admin) => (
                      <option key={admin._id} value={admin._id}>
                        {admin.firstName} {admin.lastName} ({admin.username}) - {admin.role.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-yellow-400/20">
                  <button
                    onClick={() => {
                      setShowAssignmentModal(false);
                      setAssignmentData({ ticketId: '', assignedTo: '' });
                    }}
                    className="flex-1 px-6 py-3 border border-gray-400/50 text-gray-400 rounded-lg hover:bg-gray-400/10 hover:border-gray-400 transition-all duration-200 font-medium"
                    disabled={assignmentLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAssignTicket}
                    disabled={assignmentLoading || !assignmentData.assignedTo}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#013220] rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-yellow-500/25"
                  >
                    {assignmentLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#013220]/30 border-t-[#013220] rounded-full animate-spin"></div>
                        Assigning...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <FaUserPlus size={18} />
                        Assign Ticket
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Modal */}
        {showStatistics && statistics && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#013220] border border-yellow-400 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-yellow-400">Ticket Statistics</h2>
                <button
                  onClick={() => setShowStatistics(false)}
                  className="text-gray-400 hover:text-yellow-400 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Overview Cards */}
                <div className="bg-[#1a4a2e] border border-yellow-400/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">Total Tickets</h3>
                  <p className="text-3xl font-bold text-white">{statistics.overview.totalTickets}</p>
                </div>
                
                <div className="bg-[#1a4a2e] border border-green-400/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Open Tickets</h3>
                  <p className="text-3xl font-bold text-white">{statistics.overview.openTickets}</p>
                </div>
                
                <div className="bg-[#1a4a2e] border border-red-400/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-400 mb-2">Unassigned</h3>
                  <p className="text-3xl font-bold text-white">{statistics.overview.unassignedTickets}</p>
                </div>
                
                <div className="bg-[#1a4a2e] border border-blue-400/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Avg Resolution (hrs)</h3>
                  <p className="text-3xl font-bold text-white">{statistics.overview.avgResolutionTimeHours}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Status Statistics */}
                <div className="bg-[#1a4a2e] border border-yellow-400/30 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">Status Distribution</h3>
                  <div className="space-y-3">
                    {statistics.statusStats.map((stat, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="capitalize text-gray-300">{stat._id.replace('-', ' ')}</span>
                        <span className="font-bold text-yellow-400">{stat.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Priority Statistics */}
                <div className="bg-[#1a4a2e] border border-yellow-400/30 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">Priority Distribution</h3>
                  <div className="space-y-3">
                    {statistics.priorityStats.map((stat, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {getPriorityIcon(stat._id)}
                          <span className="capitalize text-gray-300">{stat._id}</span>
                        </div>
                        <span className="font-bold text-yellow-400">{stat.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Statistics */}
                <div className="bg-[#1a4a2e] border border-yellow-400/30 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">Category Distribution</h3>
                  <div className="space-y-3">
                    {statistics.categoryStats.map((stat, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="capitalize text-gray-300">{stat._id}</span>
                        <span className="font-bold text-yellow-400">{stat.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agent Workload */}
                <div className="bg-[#1a4a2e] border border-yellow-400/30 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">Agent Workload</h3>
                  <div className="space-y-3">
                    {statistics.agentWorkload.map((agent, index) => (
                      <div key={index} className="border-b border-yellow-400/20 pb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-gray-300">{agent.agentName}</span>
                          <span className="font-bold text-yellow-400">{agent.ticketCount} tickets</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">{agent.agentEmail}</span>
                          <span className="text-red-400">{agent.highPriorityCount} high priority</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowStatistics(false)}
                  className="px-6 py-2 bg-yellow-400 text-[#013220] rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ticket Responses Modal */}
        {showResponsesModal && selectedTicketForResponses && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#013220] border border-yellow-400 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-yellow-400">
                  Responses for Ticket #{selectedTicketForResponses.ticketNumber}
                </h2>
                <button
                  onClick={() => {
                    setShowResponsesModal(false);
                    setSelectedTicketForResponses(null);
                    setTicketResponses([]);
                  }}
                  className="text-gray-400 hover:text-yellow-400 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Ticket Info */}
              <div className="bg-[#1a4a2e] border border-yellow-400/30 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-gray-400 text-sm">Subject:</span>
                    <p className="text-yellow-400 font-medium">{selectedTicketForResponses.subject}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Status:</span>
                    <p className={`font-medium ${getStatusColor(selectedTicketForResponses.status)}`}>
                      {selectedTicketForResponses.status.replace('-', ' ').toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Priority:</span>
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(selectedTicketForResponses.priority)}
                      <span className="text-white capitalize">{selectedTicketForResponses.priority}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Responses List */}
              <div className="space-y-4 mb-6">
                {responsesLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="text-yellow-400">Loading responses...</div>
                  </div>
                ) : ticketResponses.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No responses found for this ticket.
                  </div>
                ) : (
                  ticketResponses.map((response) => (
                    <div
                      key={response._id}
                      className={`border rounded-lg p-4 ${
                        response.responseType === 'system'
                          ? 'bg-blue-900/20 border-blue-400/30'
                          : response.responseType === 'agent'
                          ? 'bg-green-900/20 border-green-400/30'
                          : 'bg-gray-900/20 border-gray-400/30'
                      }`}
                    >
                      {/* Response Header */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            response.responseType === 'system'
                              ? 'bg-blue-600 text-white'
                              : response.responseType === 'agent'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-600 text-white'
                          }`}>
                            {response.responseType.toUpperCase()}
                          </div>
                          {response.isAutomated && (
                            <div className="px-2 py-1 rounded text-xs font-medium bg-purple-600 text-white">
                              AUTOMATED
                            </div>
                          )}
                          {response.isInternal && (
                            <div className="px-2 py-1 rounded text-xs font-medium bg-red-600 text-white">
                              INTERNAL
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-400">
                            {formatDate(response.createdAt)}
                          </div>
                          {response.respondent && (
                            <div className="text-xs text-yellow-400">
                              {response.respondent.firstName} {response.respondent.lastName}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Response Message */}
                      <div className="text-white">
                        {response.message}
                      </div>

                      {/* Response Metadata */}
                      {(response.automationTrigger || response.isEdited) && (
                        <div className="mt-3 pt-3 border-t border-gray-600 text-xs text-gray-400">
                          {response.automationTrigger && (
                            <div>Trigger: {response.automationTrigger}</div>
                          )}
                          {response.isEdited && (
                            <div>Edited at: {formatDate(response.editedAt)}</div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              {responsesPagination.totalPages > 1 && (
                <div className="flex justify-center gap-2 mb-6">
                  <button
                    onClick={() => fetchTicketResponses(selectedTicketForResponses._id, responsesPagination.currentPage - 1)}
                    disabled={!responsesPagination.hasPrevPage || responsesLoading}
                    className="px-3 py-1 bg-yellow-400 text-[#013220] rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 text-yellow-400">
                    Page {responsesPagination.currentPage} of {responsesPagination.totalPages}
                  </span>
                  <button
                    onClick={() => fetchTicketResponses(selectedTicketForResponses._id, responsesPagination.currentPage + 1)}
                    disabled={!responsesPagination.hasNextPage || responsesLoading}
                    className="px-3 py-1 bg-yellow-400 text-[#013220] rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Close Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setShowResponsesModal(false);
                    setSelectedTicketForResponses(null);
                    setTicketResponses([]);
                  }}
                  className="px-6 py-2 bg-yellow-400 text-[#013220] rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Note Modal */}
        {showNoteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#013220] border border-yellow-400 rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-yellow-400">Add Internal Note</h2>
                <button
                  onClick={() => {
                    setShowNoteModal(false);
                    setNoteData({ ticketId: '', newStatus: '', note: '' });
                  }}
                  className="text-gray-400 hover:text-yellow-400 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-yellow-400 text-sm font-medium mb-2">
                    Internal Note (Optional)
                  </label>
                  <textarea
                    value={noteData.note}
                    onChange={(e) => setNoteData({ ...noteData, note: e.target.value })}
                    placeholder="Add an internal note about this status change..."
                    className="w-full px-3 py-2 bg-[#1a4a2e] border border-yellow-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 resize-none"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowNoteModal(false);
                      setNoteData({ ticketId: '', newStatus: '', note: '' });
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleNoteSubmit}
                    className="px-4 py-2 bg-yellow-400 text-[#013220] rounded-lg hover:bg-yellow-300 transition-colors font-medium"
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Priority Change Modal */}
        {showPriorityModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#013220] border border-yellow-400 rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-yellow-400">Change Ticket Priority</h2>
                <button
                  onClick={() => {
                    setShowPriorityModal(false);
                    setPriorityData({ ticketId: '', currentPriority: '', newPriority: '', reason: '' });
                  }}
                  className="text-gray-400 hover:text-yellow-400 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-yellow-400 text-sm font-medium mb-2">
                    Current Priority: <span className="capitalize text-white">{priorityData.currentPriority}</span>
                  </label>
                </div>

                <div>
                  <label className="block text-yellow-400 text-sm font-medium mb-2">
                    New Priority
                  </label>
                  <select
                    value={priorityData.newPriority}
                    onChange={(e) => setPriorityData({ ...priorityData, newPriority: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1a4a2e] border border-yellow-400/30 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="">Select new priority</option>
                    {validPriorities.map(priority => (
                      <option key={priority} value={priority} className="capitalize">
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-yellow-400 text-sm font-medium mb-2">
                    Reason for Priority Change
                  </label>
                  <textarea
                    value={priorityData.reason}
                    onChange={(e) => setPriorityData({ ...priorityData, reason: e.target.value })}
                    placeholder="Explain why the priority needs to be changed..."
                    className="w-full px-3 py-2 bg-[#1a4a2e] border border-yellow-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 resize-none"
                    rows={3}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowPriorityModal(false);
                      setPriorityData({ ticketId: '', currentPriority: '', newPriority: '', reason: '' });
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePrioritySubmit}
                    disabled={!priorityData.newPriority || !priorityData.reason.trim()}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:bg-gray-500 disabled:cursor-not-allowed"
                  >
                    Change Priority
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CustomerSupport;