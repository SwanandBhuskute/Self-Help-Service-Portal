import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/homepage/HomePage";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { EmployeeDashboard } from "./components/employee/EmployeeDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;