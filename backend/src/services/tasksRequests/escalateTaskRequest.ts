import { db } from "../../clients/clients";
import { TASK_REQUESTS_TABLE } from "../../utils/constants";

export const escalateTaskRequest = async (taskRequestId: string) => {
    const params = {
        TableName: TASK_REQUESTS_TABLE,
        Key: { taskRequestId },
        UpdateExpression: "SET escalationCount = escalationCount + :increment",
        ExpressionAttributeValues: { ":increment": 1 },
        ReturnValues: "UPDATED_NEW",
    };

    await db.update(params).promise();
    return { message: "Task request escalated", taskRequestId };
};
