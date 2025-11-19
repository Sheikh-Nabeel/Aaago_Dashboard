import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosConfig";
import toast from "react-hot-toast";
import ConfirmationModal from '../Common/ConfirmationModal';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    firstName: "",
    email: "",
    phoneNumber: "",
    password: "",
    permissions: [],
  });
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [errors, setErrors] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const availablePermissions = [
    "home",
    "mlm",
    "dispatch",
    "drivermanagement",
    "customermanagement",
    "proposalmanagement",
    "overview",
    "paymentoverview",
    "chatdetail",
    "kycverification",
    "reportanalytics",
    "reviewandrating",
    "adminmanagement",
  ];

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axiosInstance.get(
        "/user/admins"
      );
      setAdmins(response.data.admins || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch admins");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingAdmin) {
      setEditingAdmin({ ...editingAdmin, [name]: value });
    } else {
      setNewAdmin({ ...newAdmin, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const handlePermissionToggle = (permission) => {
    if (editingAdmin) {
      setEditingAdmin({
        ...editingAdmin,
        permissions: editingAdmin.permissions.includes(permission)
          ? editingAdmin.permissions.filter((p) => p !== permission)
          : [...editingAdmin.permissions, permission],
      });
    } else {
      setNewAdmin({
        ...newAdmin,
        permissions: newAdmin.permissions.includes(permission)
          ? newAdmin.permissions.filter((p) => p !== permission)
          : [...newAdmin.permissions, permission],
      });
    }
  };

  const validateForm = (data) => {
    const formErrors = {};
    if (!data.username) formErrors.username = "Username is required";
    if (!data.firstName) formErrors.firstName = "First name is required";
    if (!data.email) formErrors.email = "Email is required";
    if (!data.phoneNumber) formErrors.phoneNumber = "Phone number is required";
    if (!editingAdmin && !data.password)
      formErrors.password = "Password is required";
    if (data.permissions.length === 0)
      formErrors.permissions = "At least one permission is required";
    return formErrors;
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(newAdmin);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      Object.values(formErrors).forEach((err) => toast.error(err));
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/user/admin/add-admin",
        newAdmin
      );
      toast.success(response.data.message || "Admin added successfully");
      setNewAdmin({
        username: "",
        firstName: "",
        email: "",
        phoneNumber: "",
        password: "",
        permissions: [],
      });
      setErrors({});
      fetchAdmins();
    } catch (error) {
      const serverErrors = error.response?.data?.errors || {};
      setErrors(serverErrors);
      toast.error(error.response?.data?.message || "Failed to add admin");
    }
  };

  const handleEditAdmin = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(editingAdmin);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      Object.values(formErrors).forEach((err) => toast.error(err));
      return;
    }

    try {
      await axiosInstance.put(
        `/user/admin/edit-admin/${editingAdmin._id}`,
        editingAdmin
      );
      toast.success("Admin updated successfully");
      setEditingAdmin(null);
      setErrors({});
      fetchAdmins();
    } catch (error) {
      const serverErrors = error.response?.data?.errors || {};
      setErrors(serverErrors);
      toast.error(error.response?.data?.message || "Failed to update admin");
    }
  };

  const handleDeleteAdmin = (adminId) => {
    setAdminToDelete(adminId);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteAdmin = async () => {
    if (adminToDelete) {
      try {
        await axiosInstance.delete(
          `/user/admin/delete-admin/${adminToDelete}`
        );
        toast.success("Admin deleted successfully");
        fetchAdmins();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete admin");
      }
    }
    setShowDeleteConfirmation(false);
    setAdminToDelete(null);
  };

  const cancelDeleteAdmin = () => {
    setShowDeleteConfirmation(false);
    setAdminToDelete(null);
  };

  return (
    <div className="p-6 bg-[#013220] min-h-screen text-[#DDC104]">
      <h1 className="text-2xl font-bold mb-6">Admin Management</h1>

      <div className="mb-8 p-6 bg-[#013220] border border-[#3A5719] rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {editingAdmin ? "Edit Admin" : "Add New Admin"}
        </h2>
        <form onSubmit={editingAdmin ? handleEditAdmin : handleAddAdmin}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <input
                type="text"
                name="username"
                value={editingAdmin ? editingAdmin.username : newAdmin.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="p-2 border border-[#DDC104] rounded w-full bg-[#013220] text-[#DDC104] placeholder-[#DDC104] focus:outline-none focus:border-yellow-400"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="firstName"
                value={
                  editingAdmin ? editingAdmin.firstName : newAdmin.firstName
                }
                onChange={handleInputChange}
                placeholder="First Name"
                className="p-2 border border-[#DDC104] rounded w-full bg-[#013220] text-[#DDC104] placeholder-[#DDC104] focus:outline-none focus:border-yellow-400"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={editingAdmin ? editingAdmin.email : newAdmin.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="p-2 border border-[#DDC104] rounded w-full bg-[#013220] text-[#DDC104] placeholder-[#DDC104] focus:outline-none focus:border-yellow-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="tel"
                name="phoneNumber"
                value={
                  editingAdmin ? editingAdmin.phoneNumber : newAdmin.phoneNumber
                }
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="p-2 border border-[#DDC104] rounded w-full bg-[#013220] text-[#DDC104] placeholder-[#DDC104] focus:outline-none focus:border-yellow-400"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
              )}
            </div>
            {!editingAdmin && (
              <div>
                <input
                  type="password"
                  name="password"
                  value={newAdmin.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="p-2 border border-[#DDC104] rounded w-full bg-[#013220] text-[#DDC104] placeholder-[#DDC104] focus:outline-none focus:border-yellow-400"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
            )}
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Permissions</h3>
            <div className="grid grid-cols-3 gap-2">
              {availablePermissions.map((permission) => (
                <label
                  key={permission}
                  className="flex items-center text-[#DDC104]"
                >
                  <input
                    type="checkbox"
                    checked={
                      editingAdmin
                        ? editingAdmin.permissions.includes(permission)
                        : newAdmin.permissions.includes(permission)
                    }
                    onChange={() => handlePermissionToggle(permission)}
                    className="mr-2 accent-[#DDC104]"
                  />
                  {permission.charAt(0).toUpperCase() + permission.slice(1)}
                </label>
              ))}
            </div>
            {errors.permissions && (
              <p className="text-red-500 text-sm">{errors.permissions}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#DDC104] text-[#013220] px-4 py-2 rounded hover:bg-yellow-400 hover:text-black transition"
          >
            {editingAdmin ? "Update Admin" : "Add Admin"}
          </button>
          {editingAdmin && (
            <button
              type="button"
              onClick={() => {
                setEditingAdmin(null);
                setErrors({});
              }}
              className="ml-2 bg-gray-300 text-[#013220] px-4 py-2 rounded hover:bg-gray-400 hover:text-black transition"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="p-6 bg-[#013220] border border-[#3A5719] rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Current Admins</h2>
        {admins.length === 0 ? (
          <p>No admins found.</p>
        ) : (
          <div className="grid gap-4">
            {admins.map((admin) => (
              <div
                key={admin._id}
                className="p-4 border border-[#DDC104] rounded-lg flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Username:</strong> {admin.username}
                  </p>
                  <p>
                    <strong>Name:</strong> {admin.firstName}{" "}
                    {admin.lastName || ""}
                  </p>
                  <p>
                    <strong>Email:</strong> {admin.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {admin.phoneNumber}
                  </p>
                  <p>
                    <strong>Permissions:</strong>{" "}
                    {admin.adminPermissions.join(", ")}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() =>
                      setEditingAdmin({
                        ...admin,
                        permissions: admin.adminPermissions,
                      })
                    }
                    className="bg-[#DDC104] text-[#013220] px-3 py-1 rounded mr-2 hover:bg-yellow-400 hover:text-black transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAdmin(admin._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        title="Delete Admin"
        message="Are you sure you want to delete this admin? This action cannot be undone."
        onConfirm={confirmDeleteAdmin}
        onClose={cancelDeleteAdmin}
      />
    </div>
  );
};

export default AdminManagement;
