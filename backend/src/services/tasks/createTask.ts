import { db } from "../../clients/clients"
import { v4 as uuidv4 } from "uuid";
import { TASKS_TABLE, TASKS_STATUSES, TASK_PRIORITIES } from "../../utils/constants";
import  {Task} from "../../models/task.interface"

export const createTask = async ( task: Task ) => {
    const taskId = `task_${uuidv4()}`;

    task.taskId = taskId;

    task.taskStatus = task.taskStatus || TASKS_STATUSES.todo;
    task.deadline = task.deadline || null;
    task.priority = task.priority || TASK_PRIORITIES.medium;

    await db.put({ TableName : TASKS_TABLE, Item: task}).promise();
    return { message: "Task created successfully", taskId };
}