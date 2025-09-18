import React, { useState, useEffect } from 'react';
import { MdAdd, MdEdit, MdDelete, MdImage, MdRefresh } from 'react-icons/md';
import { FaEye, FaHeart, FaComment, FaUser } from 'react-icons/fa';
import Sidebar from '../Home/Sidebar';
import axios from 'axios';
import toast from 'react-hot-toast';
import ConfirmationModal from '../Common/ConfirmationModal';

const OfficialsAndFeed = () => {
  const [activeTab, setActiveTab] = useState('officials');
  const [officials, setOfficials] = useState([]);
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOfficial, setSelectedOfficial] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    picture: null
  });
  const [feedPagination, setFeedPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [showDeleteOfficialModal, setShowDeleteOfficialModal] = useState(false);
  const [officialToDelete, setOfficialToDelete] = useState(null);

  const baseUrl = 'http://localhost:3001/api';
  const IMAGE_BASE_URL = 'http://localhost:3001';

  // Fetch all officials
  const fetchOfficials = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/offers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        setOfficials(response.data.offers);
      }
    } catch (error) {
      console.error('Error fetching officials:', error);
      toast.error('Failed to fetch officials');
    } finally {
      setLoading(false);
    }
  };

  // Fetch feeds
  const fetchFeeds = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/posts/feed?page=${page}&limit=10`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        setFeeds(response.data.posts);
        setFeedPagination({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalPosts: response.data.totalPosts
        });
      }
    } catch (error) {
      console.error('Error fetching feeds:', error);
      toast.error('Failed to fetch feeds');
    } finally {
      setLoading(false);
    }
  };

  // Create new official
  const createOfficial = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast.error('Title and description are required');
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      if (formData.picture) {
        formDataToSend.append('picture', formData.picture);
      }

      const response = await axios.post(`${baseUrl}/offers`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        toast.success('Official created successfully');
        setShowCreateModal(false);
        setFormData({ title: '', description: '', picture: null });
        fetchOfficials();
      }
    } catch (error) {
      console.error('Error creating official:', error);
      toast.error('Failed to create official');
    } finally {
      setLoading(false);
    }
  };

  // Update official
  const updateOfficial = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast.error('Title and description are required');
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      if (formData.picture) {
        formDataToSend.append('picture', formData.picture);
      }

      const response = await axios.put(`${baseUrl}/offers/${selectedOfficial._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        toast.success('Official updated successfully');
        setShowEditModal(false);
        setSelectedOfficial(null);
        setFormData({ title: '', description: '', picture: null });
        fetchOfficials();
      }
    } catch (error) {
      console.error('Error updating official:', error);
      toast.error('Failed to update official');
    } finally {
      setLoading(false);
    }
  };

  // Delete official
  const deleteOfficial = (officialId) => {
    setOfficialToDelete(officialId);
    setShowDeleteOfficialModal(true);
  };

  // Confirm delete official
  const confirmDeleteOfficial = async () => {
    if (!officialToDelete) return;

    try {
      setLoading(true);
      const response = await axios.delete(`${baseUrl}/offers/${officialToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        toast.success('Official deleted successfully');
        fetchOfficials();
      }
    } catch (error) {
      console.error('Error deleting official:', error);
      toast.error('Failed to delete official');
    } finally {
      setLoading(false);
      setShowDeleteOfficialModal(false);
      setOfficialToDelete(null);
    }
  };

  // Delete feed post
  const deleteFeed = async (postId) => {
    setPostToDelete(postId);
    setShowDeleteModal(true);
  };

  // Confirm delete feed post
  const confirmDeleteFeed = async () => {
    if (!postToDelete) return;

    try {
      setLoading(true);
      const response = await axios.delete(`${baseUrl}/posts/${postToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        toast.success('Post deleted successfully');
        // Refresh the current page of feeds
        fetchFeeds(feedPagination.currentPage);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'picture') {
      setFormData(prev => ({ ...prev, picture: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Open edit modal
  const openEditModal = (official) => {
    setSelectedOfficial(official);
    setFormData({
      title: official.title,
      description: official.description,
      picture: null
    });
    setShowEditModal(true);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    if (activeTab === 'officials') {
      fetchOfficials();
    } else if (activeTab === 'feed') {
      fetchFeeds();
    }
  }, [activeTab]);

  return (
    <div className="flex bg-[#013220] text-yellow-400 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-3 md:p-6 min-w-0">
        
        {/* Header */}
        <div className="mb-6 bg-gradient-to-r from-[#1a4a2e] to-[#2d5a3d] p-6 rounded-xl border border-yellow-400/20 shadow-lg">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">Officials and Feed</h1>
          <p className="text-gray-400">Manage officials and view community feeds</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="bg-[#1a4a2e] p-2 rounded-xl border border-yellow-400/20">
            <nav className="flex space-x-3">
              <button
                onClick={() => setActiveTab('officials')}
                className={`py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                  activeTab === 'officials'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#013220] shadow-lg'
                    : 'text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300'
                }`}
              >
                Officials
              </button>
              <button
                onClick={() => setActiveTab('feed')}
                className={`py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                  activeTab === 'feed'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#013220] shadow-lg'
                    : 'text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300'
                }`}
              >
                Feed
              </button>
            </nav>
          </div>
        </div>

        {/* Officials Tab Content */}
        {activeTab === 'officials' && (
          <>
            {/* Action Bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-[#013220] px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 font-medium shadow-lg"
                >
                  <MdAdd size={20} />
                  <span>Add Official</span>
                </button>
                <button
                  onClick={fetchOfficials}
                  className="bg-[#1a4a2e] hover:bg-[#2d5a3d] text-yellow-400 border border-yellow-400/30 px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 transform hover:scale-105"
                >
                  <MdRefresh size={20} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Officials Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {officials.map((official) => (
                  <div key={official._id} className="bg-[#1a4a2e] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-yellow-400/20">
                    <div className="h-48 bg-[#013220] flex items-center justify-center border-b border-yellow-400/20">
                      {official.picture ? (
                        <img
                          src={`${IMAGE_BASE_URL}/${official.picture.replace(/^\/?/, '')}`}
                          alt={official.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : (
                        <MdImage size={48} className="text-yellow-400/50" />
                      )}
                      <div className="w-full h-full flex items-center justify-center" style={{display: 'none'}}>
                        <MdImage size={48} className="text-yellow-400/50" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">{official.title}</h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-3">{official.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                        <span>Created: {formatDate(official.createdAt)}</span>
                        <span className="text-yellow-400">❤️ {official.likes?.length || 0}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(official)}
                          className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-[#013220] px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-1 transition-all duration-200 font-medium"
                        >
                          <MdEdit size={16} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => deleteOfficial(official._id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-1 transition-all duration-200"
                        >
                          <MdDelete size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {officials.length === 0 && !loading && (
              <div className="text-center py-12 bg-[#1a4a2e] rounded-xl border border-yellow-400/20">
                <MdImage size={64} className="mx-auto text-yellow-400/50 mb-4" />
                <h3 className="text-lg font-medium text-yellow-400 mb-2">No officials found</h3>
                <p className="text-gray-400">Get started by creating your first official.</p>
              </div>
            )}
          </>
        )}

        {/* Feed Tab Content */}
        {activeTab === 'feed' && (
          <>
            {/* Feed Header */}
            <div className="flex justify-between items-center mb-6 bg-[#1a4a2e] p-4 rounded-xl border border-yellow-400/20">
              <div>
                <h2 className="text-xl font-semibold text-yellow-400">Community Feed</h2>
                <p className="text-gray-400 text-sm">Total posts: {feedPagination.totalPosts}</p>
              </div>
              <button
                onClick={() => fetchFeeds(feedPagination.currentPage)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-[#013220] px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 font-medium shadow-lg"
              >
                <MdRefresh size={20} />
                <span>Refresh</span>
              </button>
            </div>

            {/* Feed Posts */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {feeds.map((post) => (
                  <div key={post._id} className="bg-[#1a4a2e] rounded-xl shadow-lg p-6 border border-yellow-400/20 hover:shadow-2xl transition-all duration-300">
                    {/* Post Header */}
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full flex items-center justify-center mr-3">
                        <FaUser className="text-[#013220]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-400">{post.author.name}</h4>
                        <p className="text-sm text-gray-400">@{post.author.username}</p>
                      </div>
                      <div className="ml-auto text-sm text-gray-400">
                        {formatDate(post.createdAt)}
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <p className="text-gray-300 leading-relaxed">{post.content}</p>
                    </div>

                    {/* Post Media */}
                    {post.media && post.media.length > 0 && (
                      <div className="mb-4 grid grid-cols-2 gap-2">
                        {post.media.map((media, index) => (
                          <img
                            key={index}
                            src={`${IMAGE_BASE_URL}/${media.replace(/^\/?/, '')}`}
                            alt={`Post media ${index + 1}`}
                            className="rounded-lg object-cover h-48 w-full"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-yellow-400/20">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <FaHeart className="text-red-400" />
                          <span className="text-sm">{post.likes?.length || 0} likes</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <FaComment className="text-yellow-400" />
                          <span className="text-sm">{post.comments?.length || 0} comments</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => deleteFeed(post._id)}
                          className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-all duration-200 transform hover:scale-105 font-medium shadow-lg text-sm"
                          disabled={loading}
                        >
                          <MdDelete size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Comments Preview */}
                    {post.comments && post.comments.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-yellow-400/20">
                        <h5 className="font-medium text-yellow-400 mb-2">Comments:</h5>
                        {post.comments.slice(0, 2).map((comment) => (
                          <div key={comment._id} className="mb-2 p-3 bg-[#013220] rounded-lg border border-yellow-400/10">
                            <div className="flex items-center mb-1">
                              <span className="font-medium text-sm text-yellow-400">{comment.author.name}</span>
                              <span className="text-xs text-gray-500 ml-2">{formatDate(comment.createdAt)}</span>
                            </div>
                            <p className="text-sm text-gray-300">{comment.content}</p>
                          </div>
                        ))}
                        {post.comments.length > 2 && (
                          <p className="text-sm text-gray-400">... and {post.comments.length - 2} more comments</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {feedPagination.totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  {Array.from({ length: feedPagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => fetchFeeds(page)}
                      className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                        page === feedPagination.currentPage
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#013220] font-medium'
                          : 'bg-[#1a4a2e] text-yellow-400 hover:bg-[#2d5a3d] border border-yellow-400/30'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {feeds.length === 0 && !loading && (
              <div className="text-center py-12 bg-[#1a4a2e] rounded-xl border border-yellow-400/20">
                <FaComment size={64} className="mx-auto text-yellow-400/50 mb-4" />
                <h3 className="text-lg font-medium text-yellow-400 mb-2">No posts found</h3>
                <p className="text-gray-400">The community feed is empty.</p>
              </div>
            )}
          </>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1a4a2e] rounded-xl p-6 w-full max-w-md border border-yellow-400/30 shadow-2xl">
              <h2 className="text-xl font-bold mb-4 text-yellow-400">Create New Official</h2>
              <form onSubmit={createOfficial}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-yellow-400 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-[#013220] border border-yellow-400/30 rounded-lg text-yellow-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-yellow-400 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 bg-[#013220] border border-yellow-400/30 rounded-lg text-yellow-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-yellow-400 mb-2">Picture</label>
                  <input
                    type="file"
                    name="picture"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full px-3 py-2 bg-[#013220] border border-yellow-400/30 rounded-lg text-yellow-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:text-[#013220] file:font-medium hover:file:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-[#013220] py-2 px-4 rounded-lg font-medium disabled:opacity-50 transition-all duration-200"
                  >
                    {loading ? 'Creating...' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-[#013220] hover:bg-[#024a2a] text-yellow-400 border border-yellow-400/30 py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1a4a2e] rounded-xl p-6 w-full max-w-md border border-yellow-400/30 shadow-2xl">
              <h2 className="text-xl font-bold mb-4 text-yellow-400">Edit Official</h2>
              <form onSubmit={updateOfficial}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Picture</label>
                  <input
                    type="file"
                    name="picture"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setPostToDelete(null);
          }}
          onConfirm={confirmDeleteFeed}
          title="Delete Post"
          message="Are you sure you want to delete this post? This action cannot be undone."
        />

        {/* Delete Official Confirmation Modal */}
        <ConfirmationModal
          isOpen={showDeleteOfficialModal}
          onClose={() => {
            setShowDeleteOfficialModal(false);
            setOfficialToDelete(null);
          }}
          onConfirm={confirmDeleteOfficial}
          title="Delete Official"
          message="Are you sure you want to delete this official? This action cannot be undone."
        />
      </div>
    </div>
  );
};

export default OfficialsAndFeed;