import { db } from "../../clients/clients"
import { REQUESTS_TABLE } from "../../utils/constants";

export const getEmployeeRequests = async (employeeId: string) => {
    const params = {
        TableName: REQUESTS_TABLE,
        FilterExpression: "employeeId = :employeeId",
        ExpressionAttributeValues: { ":employeeId": employeeId }
    };

    const result = await db.scan(params).promise();
    return result.Items || [];
};