/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { TEAM_API } from "../../utils/apiConstants";
import "./teams.css";

export interface Team {
  teamId: string;
  teamName: string;
  headId: string;
  employees: string[];
}

const TeamsPage = ({ role }: { role: any }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamName, setTeamName] = useState<string>("");
  const [teamHead, setTeamHead] = useState<string>("");
  const [teamEmployees, setTeamEmployees] = useState<string[]>([]);
  const [newEmployee, setNewEmployee] = useState<string>("");

  console.log("teamEmployees start", teamEmployees)

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const response = await axios.get(TEAM_API.GET_ALL_TEAMS);
      console.log("response", response);
      setTeams(response.data);
    } catch (err) {
      setError("Failed to fetch teams");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async () => {
    if (!teamName || !teamHead) {
      alert("Team Name and Team Head are required");
      return;
    }

    try {
      await axios.post(TEAM_API.CREATE_TEAM, {
        teamName: teamName,
        headId: teamHead,
      });

      alert("Team created successfully!");
      setIsCreateModalOpen(false);
      setTeamName("");
      setTeamHead("");
      fetchTeams();
    } catch (err) {
      alert("Failed to create team");
    }
  };

  const handleUpdateTeam = async () => {
    if (!selectedTeam || !teamName || !teamHead) {
      alert("Team Name and Team Head are required");
      return;
    }

    try {
      await axios.put(TEAM_API.UPDATE_TEAM(selectedTeam.teamId), {
        teamName: teamName,
        headId: teamHead,
        employees: teamEmployees,
      });

      alert("Team updated successfully!");
      setIsUpdateModalOpen(false);
      fetchTeams();
    } catch (err) {
      alert("Failed to update team");
    }
  };

  const handleAddEmployee = () => {
    console.log("teamEmployees1", teamEmployees);
    if (newEmployee.trim() === "") return;
    teamEmployees.push(newEmployee);;
    setTeamEmployees(teamEmployees)
    // setTeamEmployees([...teamEmployees, newEmployee.trim()]);
    setNewEmployee("");
    console.log("teamEmployees2", teamEmployees);
  };

  const handleRemoveEmployee = (index: number) => {
    setTeamEmployees(teamEmployees?.filter((_, i) => i !== index));
  };

  if (role !== "admin") {
    return <h2 className="access-restricted">Access Restricted</h2>;
  }

  return (
    <div className="teams-container">
      <h1>Teams Management</h1>
      <button className="create-team-button" onClick={() => setIsCreateModalOpen(true)}>Create Team</button>

      {loading ? (
        <p>Loading teams...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : teams.length === 0 ? (
        <p>No teams created</p>
      ) : (
        <table className="teams-table">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Team Head</th>
              <th>Team Size</th>
              <th>Employees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.teamId}>
                <td>{team.teamName}</td>
                <td>{team.headId}</td>
                <td>{team.employees ? team.employees.length : 0}</td>
                <td>{team.employees?.join(", ") || "None"}</td>
                <td>
                  <button 
                    className="update-button" 
                    onClick={() => {
                      setSelectedTeam(team);
                      setTeamName(team.teamName);
                      setTeamHead(team.headId);
                      setTeamEmployees(team.employees || []);
                      setIsUpdateModalOpen(true);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Create Team Modal */}
      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Team</h2>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter Team Name"
            />
            <input
              type="text"
              value={teamHead}
              onChange={(e) => setTeamHead(e.target.value)}
              placeholder="Enter Team Head"
            />
            <div className="modal-buttons">
              <button className="create-button" onClick={handleCreateTeam}>Create</button>
              <button className="cancel-button" onClick={() => setIsCreateModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Update Team Modal */}
      {isUpdateModalOpen && selectedTeam && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Update Team</h2>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <input
              type="text"
              value={teamHead}
              onChange={(e) => setTeamHead(e.target.value)}
            />

            {/* Add New Employee */}
            <input
              type="text"
              value={newEmployee}
              onChange={(e) => setNewEmployee(e.target.value)}
              placeholder="Enter Employee Name"
            />
            <button className="add-employee-button" onClick={handleAddEmployee}>Add Employee</button>

            {/* List of Employees */}
            <div className="employee-list">
              {teamEmployees?.map((emp, index) => (
                <div key={index} className="employee-item">
                  <span>{emp}</span>
                  <button className="remove-employee-button" onClick={() => handleRemoveEmployee(index)}>✖</button>
                </div>
              ))}
            </div>

            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setIsUpdateModalOpen(false)}>Cancel</button>
              <button className="update-button" onClick={handleUpdateTeam}>Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
