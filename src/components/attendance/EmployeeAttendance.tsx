import React, { useState, useEffect } from "react";
import "./EmployeeAttendance.css";

interface AttendanceData {
  presentDates: string[];
  absentDates: string[];
  onLeaveDates: string[];
}

const EmployeeAttendance: React.FC<{ role: string , employeeId: string }> = ({ role, employeeId }) => {
  const [attendance, setAttendance] = useState<AttendanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch attendance data for the employee
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(
          `https://zofmtrp15g.execute-api.ap-south-1.amazonaws.com/swanandp/attendance/${employeeId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }
        const data: AttendanceData = await response.json();
        setAttendance(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [employeeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="employee-attendance">
      <h1>My Attendance</h1>
      <div className="attendance-summary">
        <div className="summary-item">
          <span>Present:</span>
          <span>{attendance?.presentDates.length || 0}</span>
        </div>
        <div className="summary-item">
          <span>Absent:</span>
          <span>{attendance?.absentDates.length || 0}</span>
        </div>
        <div className="summary-item">
          <span>On Leave:</span>
          <span>{attendance?.onLeaveDates.length || 0}</span>
        </div>
      </div>
      <div className="attendance-details">
        <h2>Present Dates</h2>
        <ul>
          {attendance?.presentDates.map((date, index) => (
            <li key={index}>{date}</li>
          ))}
        </ul>
        <h2>Absent Dates</h2>
        <ul>
          {attendance?.absentDates.map((date, index) => (
            <li key={index}>{date}</li>
          ))}
        </ul>
        <h2>On Leave Dates</h2>
        <ul>
          {attendance?.onLeaveDates.map((date, index) => (
            <li key={index}>{date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeAttendance;