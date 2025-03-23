import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="navbarLogo" onClick={() => navigate("/dashboard")}>Self-Help Portal</h1>
      </div>
      <div className="nav-right">
        <button className="nav-button" onClick={() => navigate("/profile")}>Profile</button>
        <button className="nav-button logout" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
