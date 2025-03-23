import { db } from "../../clients/clients";
import { EMPLOYEE_TABLE } from "../../utils/constants";

export const getEmployeeById = async (userId: string) => {
    const params = {
        TableName: EMPLOYEE_TABLE,
        Key: { id : userId }
    };

    const result = await db.get(params).promise();
    return result.Item || { message: "User not found" };
}
