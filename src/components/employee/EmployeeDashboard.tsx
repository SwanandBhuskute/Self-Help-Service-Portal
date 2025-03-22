import { Typography, Box } from "@mui/material";
import "./EmployeeDashboard.css";

export const EmployeeDashboard = () => {
  return (
    <Box className="employee-dashboard">
      <Typography variant="h4" className="employee-title">
        Employee Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to the Employee Dashboard. Access your tasks and updates here.
      </Typography>
    </Box>
  );
};