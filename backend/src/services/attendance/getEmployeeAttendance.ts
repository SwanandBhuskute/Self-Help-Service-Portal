import { db } from "../../clients/clients"
import { ATTENDANCE_TABLE } from "../../utils/constants";

export const getEmployeeAttendance = async (employeeId: string) => {
    console.log("employeeId: ", employeeId);
    const params = {
        TableName: ATTENDANCE_TABLE,
        Key: { employeeId }
    };
    const result = await db.get(params).promise();
    return result?.Item;
};
