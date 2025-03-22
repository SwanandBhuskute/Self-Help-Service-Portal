import { Typography, Box } from "@mui/material";
import "./AdminDashboard.css";

export const AdminDashboard = () => {
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