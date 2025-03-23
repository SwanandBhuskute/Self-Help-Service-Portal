/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./authPage.css";
import { USER_API } from "../../utils/apiConstants";

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState<"employee" | "admin" | null>(null);
  const [adminAction, setAdminAction] = useState<"login" | "register" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const endpoint = accountType === "admin" ? USER_API.ADMIN_LOGIN : USER_API.EMPLOYEE_LOGIN;
      const response = await axios.post(endpoint, { username, password });

      console.log("Login Response:", response.data);

      if (response.data.data?.AuthenticationResult) {
        const { AccessToken, RefreshToken, IdToken } = response.data.data.AuthenticationResult;

        localStorage.setItem("accessToken", AccessToken);
        localStorage.setItem("refreshToken", RefreshToken);
        localStorage.setItem("idToken", IdToken);
        localStorage.setItem("role", accountType!);

        console.log(`${accountType} logged in successfully`);
        navigate("/dashboard");
      } else {
        setError("Unexpected response format from server.");
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(USER_API.ADMIN_REGISTER, {
        username,
        email,
        password,
      });

      console.log("Register Response:", response.data);
      alert("Admin registered successfully!");
      setAdminAction("login");
    } catch (err: any) {
      console.error("Register Error:", err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    if (accountType === "employee") {
      return (
        <div className="form-container">
          <h2>Employee Login</h2>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="error-text">{error}</p>}
          <button className="primary-button" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      );
    } else if (accountType === "admin") {
      if (adminAction === "register") {
        return (
          <div className="form-container">
            <h2>Admin Registration</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="error-text">{error}</p>}
            <button className="primary-button" onClick={handleRegister} disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
            <button className="secondary-button" onClick={() => setAdminAction(null)}>Back</button>
          </div>
        );
      } else if (adminAction === "login") {
        return (
          <div className="form-container">
            <h2>Admin Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="error-text">{error}</p>}
            <button className="primary-button" onClick={handleLogin} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <button className="secondary-button" onClick={() => setAdminAction(null)}>Back</button>
          </div>
        );
      } else {
        return (
          <div className="admin-actions">
            <button className="primary-button" onClick={() => setAdminAction("login")}>Login</button>
            <button className="primary-button" onClick={() => setAdminAction("register")}>Register</button>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Self-Help Service Portal</h1>
        <p>Select your role:</p>
        <div className="account-type">
          <button className={accountType === "employee" ? "active" : ""} onClick={() => setAccountType("employee")}>
            Employee
          </button>
          <button className={accountType === "admin" ? "active" : ""} onClick={() => setAccountType("admin")}>
            Admin
          </button>
        </div>
        {renderForm()}
      </div>
    </div>
  );
};

export default AuthPage;
