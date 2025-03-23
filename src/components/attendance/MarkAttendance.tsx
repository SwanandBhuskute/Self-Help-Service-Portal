import React, { useState } from "react";
import "./MarkAttendance.css";

interface Employee {
  id: number;
  name: string;
  team: string;
}

const AttendanceTracking: React.FC<{ role: "admin" }> = () => {
  const [employees] = useState<Employee[]>([
    { id: 1, name: "John Doe", team: "Engineering" },
    { id: 2, name: "Jane Smith", team: "Design" },
    { id: 3, name: "Alice Johnson", team: "Management" },
    { id: 4, name: "Bob Brown", team: "Engineering" },
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  // Handle marking attendance (mock function)
  const handleMarkAttendance = (employeeId: number, status: "Present" | "Absent" | "On Leave") => {
    const confirm = window.confirm(
      `Are you sure you want to mark attendance as ${status} for ${selectedDate}?`
    );
    if (confirm) {
      alert(`Attendance marked as ${status} for employee ${employeeId} on ${selectedDate}`);
      // Here you can add logic to update the state or call an API
    }
  };

  return (
    <div className="attendance-tracking">
      <h1>Attendance Tracking</h1>
      <div className="date-picker">
        <label htmlFor="date">Select Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <div className="attendance-table">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{selectedDate}</td>
                <td>
                  <button
                    className="status-button present"
                    onClick={() => handleMarkAttendance(employee.id, "Present")}
                  >
                    Present
                  </button>
                  <button
                    className="status-button absent"
                    onClick={() => handleMarkAttendance(employee.id, "Absent")}
                  >
                    Absent
                  </button>
                  <button
                    className="status-button on-leave"
                    onClick={() => handleMarkAttendance(employee.id, "On Leave")}
                  >
                    On Leave
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTracking;