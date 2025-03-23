import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthPage from "./components/auth/authPage";
import Dashboard from "./components/dashboard/dashboard";
import Navbar from "./components/navbar/navbar";
import TeamsPage from "./components/teams/teams";
import KanbanBoard from "./components/priority-board/board";
import AttendanceTracking from "./components/attendance/MarkAttendance";

const App = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={< AttendanceTracking role={role}/>} />
        <Route path="/teams" element={<TeamsPage role={role}/>} />
        <Route path="/tasks" element={<KanbanBoard role={role}/>} />
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
};

export default App;
