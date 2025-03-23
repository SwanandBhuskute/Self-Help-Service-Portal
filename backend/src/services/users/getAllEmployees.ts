import { db } from "../../clients/clients";
import { EMPLOYEE_TABLE } from "../../utils/constants";

export const getAllEmployees = async () => {
    const params = {
        TableName: EMPLOYEE_TABLE,
    };

    const result = await db.scan(params).promise();
    return result.Items || [];
};
