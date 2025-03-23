import { Typography, Box } from "@mui/material";
import "./dashboard.css";

export const Dashboard = () => {
  return (
    <Box className="admin-dashboard">
      <Typography variant="h4" className="admin-title">
        Admin Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to the Admin Dashboard. Manage your system here.
      </Typography>
    </Box>
  );
};