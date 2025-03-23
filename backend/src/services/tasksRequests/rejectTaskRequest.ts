import { db } from "../../clients/clients";
import { TASK_REQUESTS_TABLE } from "../../utils/constants";

export const rejectTaskRequest = async (taskRequestId: string, reason: string) => {
    const params = {
        TableName: TASK_REQUESTS_TABLE,
        Key: { taskRequestId },
        UpdateExpression: "SET taskStatus = :taskStatus, rejectionReason = :reason",
        ExpressionAttributeValues: { ":taskStatus": "REJECTED", ":reason": reason },
        ReturnValues: "UPDATED_NEW",
    };

    await db.update(params).promise();
    return { message: "Task request rejected", taskRequestId, reason };
};
