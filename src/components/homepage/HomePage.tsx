import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
import { SwitchButton } from "../authForm/SwitchButton";
import { AuthForm } from "../authForm/AuthForm";
import { AuthType } from "../../utils/types";
import "./HomePage.css";

export const HomePage = () => {
  const [authType, setAuthType] = useState<AuthType>("admin");
  const navigate = useNavigate();

  const handleAuthSubmit = (user: { name?: string; email: string; password: string }) => {
    console.log(`${authType} submitted:`, user);
    // Add authentication logic here

    // Redirect based on user type
    if (authType === "admin") {
      navigate("/admin");
    } else {
      navigate("/employee");
    }
  };

  return (
    <Container className="home-container">
      <Box className="header">
        <Typography variant="h4">Welcome to the Home Page</Typography>
      </Box>
      <SwitchButton onChange={setAuthType} />
      <AuthForm type={authType} onSubmit={handleAuthSubmit} />
    </Container>
  );
};