import { db } from "../../clients/clients";
import { v4 as uuidv4 } from "uuid";
import { TASK_REQUESTS_TABLE, TASKS_STATUSES } from "../../utils/constants";
import { TaskRequest } from "../../models/taskRequest.interface";

export const createTaskRequest = async (taskRequest: TaskRequest) => {
    const taskRequestId = `req_${uuidv4()}`;
    taskRequest.taskRequestId = taskRequestId;
    taskRequest.status = TASKS_STATUSES.pending;
    taskRequest.escalationCount = 0;

    await db.put({ TableName: TASK_REQUESTS_TABLE, Item: taskRequest }).promise();
    return { message: "Task request sent successfully", taskRequestId };
};
