import { db } from "../../clients/clients";
import { DOCUMENTS_TABLE } from "../../utils/constants";

export const getDocumentsByEmployee = async (employeeId: string) => {
    const params = {
        TableName: DOCUMENTS_TABLE,
        FilterExpression: "employeeId = :employeeId",
        ExpressionAttributeValues: { ":employeeId": employeeId },
    };

    const result = await db.scan(params).promise();
    return { message: "Employee documents retrieved successfully", documents: result.Items };
};
