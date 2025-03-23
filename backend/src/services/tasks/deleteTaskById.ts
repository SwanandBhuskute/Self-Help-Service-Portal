import { db } from "../../clients/clients";
import { TASKS_TABLE } from "../../utils/constants";

export const deleteTaskById = async (taskId: string) => {
    const params = {
        TableName: TASKS_TABLE,
        Key: { taskId },
    };

    await db.delete(params).promise();
    return { message: "Task deleted successfully", taskId };
};
