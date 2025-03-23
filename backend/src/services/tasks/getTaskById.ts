import { db } from "../../clients/clients";
import { TASKS_TABLE } from "../../utils/constants";

export const getTaskById = async (taskId: string) => {
    const params = {
        TableName: TASKS_TABLE,
        Key: { taskId },
    };

    const response = await db.get(params).promise();

    if (!response.Item) {
        return { message: "Task not found", taskId };
    }

    return { message: "Task retrieved successfully", task: response.Item };
};
