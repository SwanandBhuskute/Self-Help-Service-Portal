import { db } from "../../clients/clients";
import { TASKS_TABLE, TASKS_STATUSES } from "../../utils/constants";

export const updateTaskStatus = async (taskId: string, taskStatus: string) => {
    if (!Object.values(TASKS_STATUSES).includes(taskStatus)) {
        return { message: "Invalid task status", taskStatus };
    }

    const params = {
        TableName: TASKS_TABLE,
        Key: { taskId },
        UpdateExpression: "SET taskStatus = :status",
        ExpressionAttributeValues: { ":taskStatus": taskStatus },
        ReturnValues: "UPDATED_NEW",
    };

    await db.update(params).promise();
    return { message: "Task status updated successfully", taskId, taskStatus };
};
