import { db } from "../../clients/clients"
import { v4 as uuidv4 } from "uuid";
import { SALARY_TABLE } from "../../utils/constants";


export const getEmployeeFinance = async (employeeId: string) => {
    const params = {
        TableName: SALARY_TABLE,
        FilterExpression: "employeeId = :employeeId",
        ExpressionAttributeValues: { ":employeeId": employeeId }
    };

    const result = await db.scan(params).promise();
    return result.Items || [];
};
