import { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { AuthType, AuthMode, User } from "../../utils/types";
import { API_ENDPOINTS } from "../../utils/constants";
import "./AuthForm.css";

interface AuthFormProps {
  type: AuthType;
  onSubmit: (user: User) => void;
}

export const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isAdmin = type === "admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let response;
      if (isAdmin && authMode === "signup") {
        // ✅ Call Admin Registration API
        response = await axios.post(API_ENDPOINTS.ADMIN_REGISTER, {
          username: email,
          email,
          password,
        });
      } else if (isAdmin && authMode === "login") {
        // ✅ Call Admin Login API
        response = await axios.post(API_ENDPOINTS.ADMIN_LOGIN, {
          username: email,
          password,
        });
      } else {
        // ✅ Call Employee Login API
        response = await axios.post(API_ENDPOINTS.EMPLOYEE_LOGIN, {
          username: email,
          password,
        });
      }

      console.log("API Response:", response.data);
      onSubmit({ name, email, password });
    } catch (err: any) {
      console.error("Auth Error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthModeChange = (_: React.MouseEvent<HTMLElement>, newMode: AuthMode) => {
    if (newMode !== null) setAuthMode(newMode);
  };

  return (
    <Box className="auth-form" component="form" onSubmit={handleSubmit}>
      {isAdmin && (
        <ToggleButtonGroup
          className="auth-toggle-button-group"
          value={authMode}
          exclusive
          onChange={handleAuthModeChange}
          fullWidth
        >
          <ToggleButton value="signup" className={authMode === "signup" ? "active" : ""}>
            Sign Up
          </ToggleButton>
          <ToggleButton value="login" className={authMode === "login" ? "active" : ""}>
            Log In
          </ToggleButton>
        </ToggleButtonGroup>
      )}

      {isAdmin && authMode === "signup" && (
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
      )}

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
      />

      {error && <p className="auth-error">{error}</p>}

      <Button type="submit" fullWidth variant="contained" className="auth-submit-button" disabled={loading}>
        {loading ? "Processing..." : isAdmin ? (authMode === "signup" ? "Sign Up" : "Log In") : "Log In"}
      </Button>
    </Box>
  );
};
