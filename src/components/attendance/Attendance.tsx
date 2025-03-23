import React from "react";
import AttendanceTracking from "./MarkAttendance";
import EmployeeAttendance from "./EmployeeAttendance";

interface MainAttendanceProps {
  role: "admin" | "employee";
  employeeId: string;
}

const Attendance: React.FC<MainAttendanceProps> = ({ role }) => {
  return (
    <div className="main-attendance">
      {role === "admin" ? (
        <AttendanceTracking role="admin" />
      ) : (
        <EmployeeAttendance role="employee" />
      )}
    </div>
  );
};

export default Attendance;