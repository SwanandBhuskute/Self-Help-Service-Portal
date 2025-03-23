import { db } from "../../clients/clients"
import { REQUESTS_TABLE } from "../../utils/constants";

export const getAllRequests = async () => {
    const params = { TableName: REQUESTS_TABLE };
    const result = await db.scan(params).promise();
    return result.Items || [];
};