import { db } from "../../clients/clients"
import { REQUESTS_TABLE } from "../../utils/constants";

export const updateRequestStatus = async (requestId: string, reqStatus: string) => {
    const params = {
        TableName: REQUESTS_TABLE,
        Key: { requestId },
        UpdateExpression: "SET reqStatus = :reqStatus",
        ExpressionAttributeValues: { ":reqStatus": reqStatus },
        ReturnValues: "UPDATED_NEW"
    };

    await db.update(params).promise();
    return { message: "Request updated successfully" };
};