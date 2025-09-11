// Component/login/Login.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setCredentials,
  setError,
  setLoading,
} from "../../features/slice/authSlice";
import { useLoginUserMutation } from "../../features/service/apiSlice";

const Login = ({ theme = "light" }) => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const [loginUser, { isLoading }] = useLoginUserMutation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", form: "" }));
    dispatch(setError(null));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.identifier.trim()) {
      newErrors.identifier = "Email or phone number is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(setLoading(true));
    try {
      // Determine if identifier is email or phone
      const isEmail = formData.identifier.includes("@");
      const payload = {
        [isEmail ? "email" : "phone"]: formData.identifier,
        password: formData.password,
      };

      const response = await loginUser(payload).unwrap();

      // Dispatch user credentials to auth slice
      dispatch(
        setCredentials({
          user: response.user,
          token: response.token,
        })
      );

      // Redirect to home page on successful login
      navigate("/home");
    } catch (err) {
      dispatch(
        setError(err?.data?.message || "Login failed. Please try again.")
      );
      setErrors((prev) => ({
        ...prev,
        form: err?.data?.message || "Login failed",
      }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-800 to-gray-900"
          : "bg-gray-100"
      }`}
    >
      <div
        className={`shadow-lg rounded-2xl w-full max-w-md my-8 sm:my-12 overflow-hidden transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* LOGIN FORM */}
        <div className="w-full flex flex-col justify-center items-center p-6 sm:p-10">
          <h2
            className={`text-2xl sm:text-3xl font-semibold mb-4 text-center ${
              theme === "dark" ? "text-yellow-400" : "text-[#013220]"
            }`}
          >
            Log in to Your Account
          </h2>

          {(errors.form || error) && (
            <p
              className={`text-sm mb-4 text-center ${
                theme === "dark" ? "text-red-400" : "text-red-600"
              }`}
            >
              {errors.form || error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            {/* Identifier */}
            <div>
              {errors.identifier && (
                <p
                  className={`text-sm mb-1 ${
                    theme === "dark" ? "text-red-400" : "text-red-600"
                  }`}
                >
                  {errors.identifier}
                </p>
              )}
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleInputChange}
                placeholder="Email or Phone Number"
                className={`w-full rounded-lg px-4 py-2 border focus:ring-2 focus:ring-yellow-500 outline-none transition-colors duration-300 ${
                  theme === "dark"
                    ? `bg-gray-600 border-gray-500 text-white placeholder-gray-300 ${
                        errors.identifier ? "!border-red-500" : ""
                      }`
                    : `bg-white border-gray-300 text-gray-900 placeholder-gray-500 ${
                        errors.identifier ? "!border-red-600" : ""
                      }`
                }`}
                disabled={isLoading || loading}
              />
            </div>

            {/* Password */}
            <div>
              {errors.password && (
                <p
                  className={`text-sm mb-1 ${
                    theme === "dark" ? "text-red-400" : "text-red-600"
                  }`}
                >
                  {errors.password}
                </p>
              )}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className={`w-full rounded-lg px-4 py-2 border focus:ring-2 focus:ring-yellow-500 outline-none pr-10 transition-colors duration-300 ${
                    theme === "dark"
                      ? `bg-gray-600 border-gray-500 text-white placeholder-gray-300 ${
                          errors.password ? "!border-red-500" : ""
                        }`
                      : `bg-white border-gray-300 text-gray-900 placeholder-gray-500 ${
                          errors.password ? "!border-red-600" : ""
                        }`
                  }`}
                  disabled={isLoading || loading}
                />
                <div
                  className={`absolute right-3 top-3 cursor-pointer ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div
              className={`flex justify-between items-center text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className={`w-4 h-4 ${
                    theme === "dark" ? "text-yellow-400" : "text-[#013220]"
                  }`}
                  disabled={isLoading || loading}
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className={`hover:underline ${
                  theme === "dark" ? "text-teal-400" : "text-teal-600"
                }`}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`w-full p-3 font-semibold rounded-full transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
                  : "bg-yellow-500 text-[#013220] hover:bg-yellow-400"
              } ${isLoading || loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isLoading || loading}
            >
              {isLoading || loading ? "Logging In..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
