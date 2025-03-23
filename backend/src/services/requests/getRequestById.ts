import { db } from "../../clients/clients"
import { REQUESTS_TABLE } from "../../utils/constants";


export const getRequestById = async (requestId: string) => {
    const params = {
        TableName: REQUESTS_TABLE,
        Key: { requestId }
    };

    const result = await db.get(params).promise();
    return result.Item || null;
};