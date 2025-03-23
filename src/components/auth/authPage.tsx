import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./authPage.module.css";

const AuthPage = () => {
  const [role, setRole] = useState<"admin" | "employee" | null>(null);
  const [formType, setFormType] = useState<"register" | "login" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    if (formType === "register") {
      alert(`Admin Registered: ${email}`);
      navigate("/"); // Stay on the same page after registration
    } else {
      alert(`Logged in as ${role}: ${email}`);
      navigate("/dashboard"); // Redirect to dashboard after login
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Self-Help Service Portal</h1>

      {/* Role Selection */}
      <div className={styles.roleButtons}>
      <button 
  className={`${styles.button} ${role === "admin" ? styles.active : ""}`} 
  onClick={() => setRole("admin")}
>
  Admin
</button>

<button 
  className={`${styles.button} ${role === "employee" ? styles.active : ""}`} 
  onClick={() => setRole("employee")}
>
  Employee
</button>

      </div>

      {/* Show Register/Login buttons for Admin */}
      {role === "admin" && !formType && (
        <div className={styles.actionButtons}>
          <button className={styles.button} onClick={() => setFormType("register")}>Register</button>
          <button className={styles.button} onClick={() => setFormType("login")}>Login</button>
        </div>
      )}

      {/* Show Login button for Employee */}
      {role === "employee" && !formType && (
        <div className={styles.actionButtons}>
          <button className={styles.button} onClick={() => setFormType("login")}>Login</button>
        </div>
      )}

      {/* Form for Register or Login */}
      {formType && (
        <div className={styles.formContainer}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button className={styles.button} onClick={handleSubmit}>
            {formType === "register" ? "Register" : "Login"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
