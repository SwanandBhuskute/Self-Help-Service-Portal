export const USER_POOL_ID = process.env.USER_POOL_ID!;
export const CLIENT_ID = process.env.CLIENT_ID!;
export const BUCKET_NAME = process.env.BUCKET_NAME!;
export const EMPLOYEE_TABLE = "EmployeeTable";
export const ATTENDANCE_TABLE = "AttendanceTable";
export const REQUESTS_TABLE = "RequestsTable";
export const SALARY_TABLE = "SalaryTable";
export const TASKS_TABLE = "Tasks";
export const TASK_REQUESTS_TABLE = "TaskRequests";
export const TASK_COMMENTS_TABLE = "TaskCommentsTable";
export const DOCUMENTS_TABLE = "DocumentsTable"
export const TEAMS_TABLE = "TeamsTable";
export const TEAM_UPDATES_TABLE = "TeamUpdatesTable";

export const TASKS_STATUSES = {
    "todo" : "TODO",
    "inprogress" : "INPROGRESS",
    "inreview" : "INREVIEW",
    "done" : "DONE",
    "pending" : "PENDING",
    "approved" : "APPROVED",
    "rejected" : "REJECTED"
}

export const TASK_PRIORITIES = {
    "low": "LOW",
    "medium" : "MEDIUM",
    "high" : "HIGH"
}
