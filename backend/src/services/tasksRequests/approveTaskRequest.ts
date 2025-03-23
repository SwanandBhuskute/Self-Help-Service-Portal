import { db } from "../../clients/clients";
import { TASK_REQUESTS_TABLE, TASKS_STATUSES } from "../../utils/constants";

export const approveTaskRequest = async (taskRequestId: string) => {
    const params = {
        TableName: TASK_REQUESTS_TABLE,
        Key: { taskRequestId },
        UpdateExpression: "SET taskStatus = :taskStatus",
        ExpressionAttributeValues: { ":taskStatus": TASKS_STATUSES.approved },
        ReturnValues: "UPDATED_NEW",
    };

    await db.update(params).promise();
    return { message: "Task request approved successfully", taskRequestId };
};
