import { useState } from "react";
import { AuthType } from "../../utils/types";
import "./SwitchButton.css";

interface SwitchButtonProps {
  onChange: (type: AuthType) => void;
}

export const SwitchButton = ({ onChange }: SwitchButtonProps) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSwitch = (type: AuthType) => {
    setIsAdmin(type === "admin");
    onChange(type);
  };

  return (
    <div className="toggle-switch">
      <button
        className={!isAdmin ? "active" : ""}
        onClick={() => handleSwitch("employee")}
      >
        Employee
      </button>
      <button
        className={isAdmin ? "active" : ""}
        onClick={() => handleSwitch("admin")}
      >
        Admin
      </button>
    </div>
  );
};