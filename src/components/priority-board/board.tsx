import React, { useState, useEffect } from "react";
import axios from "axios";
import "./board.css";
import { TASK_API, TASK_REQUEST_API } from "../../utils/apiConstants";


const KanbanBoard: React.FC<{ teamId: string }> = ({ teamId }) => {
  const [tasks, setTasks] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [inboxRequests, setInboxRequests] = useState([]);
  const [modalType, setModalType] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
    fetchTaskRequests();
  }, [teamId]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${TASK_API.GET_ALL_TASKS}?teamId=${teamId}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const fetchTaskRequests = async () => {
    try {
      const sentRes = await axios.get(TASK_REQUEST_API.GET_SENT_REQUESTS);
      setSentRequests(sentRes.data);
      const inboxRes = await axios.get(TASK_REQUEST_API.GET_INBOX_REQUESTS);
      setInboxRequests(inboxRes.data);
    } catch (error) {
      console.error("Error fetching task requests", error);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      await axios.put(TASK_API.UPDATE_TASK_STATUS(taskId), { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status", error);
    }
  };

  const renderTasks = (status: string) => {
    return tasks
      .filter((task) => task.taskStatus === status)
      .map((task) => (
        <div key={task.taskId} className="task-card">
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <select
            value={task.taskStatus}
            onChange={(e) => updateTaskStatus(task.taskId, e.target.value)}
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Done">Done</option>
          </select>
        </div>
      ));
  };

  return (
    <div className="kanban-container">
      <div className="top-bar">
        <button onClick={() => setModalType("sentRequests")}>Sent Requests</button>
        <button onClick={() => setModalType("inbox")}>Inbox</button>
        <button onClick={() => setModalType("createRequest")}>Create New Request</button>
      </div>

      <div className="kanban-board">
        {["Todo", "In Progress", "In Review", "Done"].map((status) => (
          <div key={status} className="kanban-column">
            <h3>{status}</h3>
            {renderTasks(status)}
          </div>
        ))}
      </div>

      {modalType && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setModalType(null)}>Close</button>
            {modalType === "sentRequests" && <pre>{JSON.stringify(sentRequests, null, 2)}</pre>}
            {modalType === "inbox" && <pre>{JSON.stringify(inboxRequests, null, 2)}</pre>}
            {modalType === "createRequest" && <p>Form for creating a new request...</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
