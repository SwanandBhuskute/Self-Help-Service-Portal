import { db } from "../../clients/clients";
import { TASK_REQUESTS_TABLE } from "../../utils/constants";

export const negotiateDeadline = async (taskRequestId: string, newDeadline: string) => {
    const params = {
        TableName: TASK_REQUESTS_TABLE,
        Key: { taskRequestId },
        UpdateExpression: "SET deadlines = list_append(if_not_exists(deadlines, :emptyList), :newDeadline)",
        ExpressionAttributeValues: {
            ":newDeadline": [newDeadline],
            ":emptyList": []
        },
        ReturnValues: "UPDATED_NEW",
    };

    await db.update(params).promise();
    return { 
        message: "Deadline negotiated successfully", 
        taskRequestId, 
        newDeadline
    };
};
