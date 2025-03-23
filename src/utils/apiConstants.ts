export const BASE_URL = "https://wfvl2b1tvg.execute-api.ap-south-1.amazonaws.com/swanandp";

// Users (Admin & Employee)
export const USER_API = {
  ADMIN_REGISTER: `${BASE_URL}/users/admin/register`,
  ADMIN_LOGIN: `${BASE_URL}/users/admin/login`,
  EMPLOYEE_CREATE: `${BASE_URL}/users/admin/employees`,
  EMPLOYEE_LOGIN: `${BASE_URL}/users/employee/login`,
  GET_EMPLOYEED_BY_ID: (userId: string) => `${BASE_URL}/users/${userId}`,
  GET_ALL_EMPLOYEES: `${BASE_URL}/users/employees`,
};

// Teams Management
export const TEAM_API = {
  CREATE_TEAM: `${BASE_URL}/users/teams`,
  GET_ALL_TEAMS: `${BASE_URL}/users/teams`,
  GET_TEAM_BY_ID: (teamId: string) => `${BASE_URL}/users/teams/${teamId}`,
  UPDATE_TEAM: (teamId: string) => `${BASE_URL}/users/teams/${teamId}`,
  DELETE_TEAM: (teamId: string) => `${BASE_URL}/users/teams/${teamId}`,
};

// Team Updates
export const TEAM_UPDATE_API = {
  CREATE_UPDATE: `${BASE_URL}/updates`,
  GET_UPDATES_BY_TEAM: (teamId: string) => `${BASE_URL}/updates/team/${teamId}`,
  GET_UPDATE_BY_ID: (updateId: string) => `${BASE_URL}/updates/update/${updateId}`,
  UPDATE_TEAM_UPDATE: (updateId: string) => `${BASE_URL}/updates/update/${updateId}`,
  DELETE_TEAM_UPDATE: (updateId: string) => `${BASE_URL}/updates/update/${updateId}`,
};

// Attendance Tracking
export const ATTENDANCE_API = {
  MARK_ATTENDANCE: `${BASE_URL}/attendance`,
  GET_EMPLOYEE_ATTENDANCE: (employeeId: string) => `${BASE_URL}/attendance/${employeeId}`,
};

// Requests (Leave & Document)
export const REQUEST_API = {
  CREATE_REQUEST: `${BASE_URL}/requests`,
  GET_ALL_REQUESTS: `${BASE_URL}/requests`,
  GET_REQUEST_BY_ID: (requestId: string) => `${BASE_URL}/requests/${requestId}`,
  UPDATE_REQUEST_STATUS: (requestId: string) => `${BASE_URL}/requests/${requestId}`,
  GET_REQUESTS_BY_EMPLOYEE: (employeeId: string) => `${BASE_URL}/requests/employee/${employeeId}`,
};

// Finance Management
export const FINANCE_API = {
  PROCESS_PAYMENT: `${BASE_URL}/finance/pay`,
  GET_EMPLOYEE_FINANCE: (employeeId: string) => `${BASE_URL}/finance/${employeeId}`,
  GET_TEAM_FINANCES: (teamName: string) => `${BASE_URL}/finance/team/${teamName}`,
};

// Task Management
export const TASK_API = {
  CREATE_TASK: `${BASE_URL}/tasks`,
  GET_ALL_TASKS: `${BASE_URL}/tasks`,
  GET_TASK_BY_ID: (taskId: string) => `${BASE_URL}/tasks/${taskId}`,
  UPDATE_TASK: (taskId: string) => `${BASE_URL}/tasks/${taskId}`,
  DELETE_TASK: (taskId: string) => `${BASE_URL}/tasks/${taskId}`,
  UPDATE_TASK_STATUS: (taskId: string) => `${BASE_URL}/tasks/${taskId}/status`,
  ADD_TASK_COMMENT: (taskId: string) => `${BASE_URL}/tasks/${taskId}/comments`,
};

// Task Requests (Cross-Team Collaboration)
export const TASK_REQUEST_API = {
  CREATE_TASK_REQUEST: `${BASE_URL}/task-requests`,
  GET_INBOX_REQUESTS: `${BASE_URL}/task-requests/inbox`,
  GET_SENT_REQUESTS: `${BASE_URL}/task-requests/sent`,
  NEGOTIATE_DEADLINE: (taskRequestId: string) => `${BASE_URL}/task-requests/${taskRequestId}/negotiate`,
  APPROVE_TASK_REQUEST: (taskRequestId: string) => `${BASE_URL}/task-requests/${taskRequestId}/approve`,
  REJECT_TASK_REQUEST: (taskRequestId: string) => `${BASE_URL}/task-requests/${taskRequestId}/reject`,
  ESCALATE_TASK_REQUEST: (taskRequestId: string) => `${BASE_URL}/task-requests/${taskRequestId}/escalate`,
};
