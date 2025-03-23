
import { db } from "../../clients/clients"
import { ATTENDANCE_TABLE } from "../../utils/constants";
import { getEmployeeAttendance } from "./getEmployeeAttendance";


export const markEmployeeAttendance = async (employeeId: string, date: string, status: string) => {
    const existingRecord = await getEmployeeAttendance(employeeId);
    console.log("existingRecord markEmployeeAttendance: ", existingRecord);

    if (!existingRecord || !existingRecord.employeeId) {
        // New employee → Insert a new record in DynamoDB
        const newRecord = {
            employeeId,
            presentDates: status === "Present" ? [date] : [],
            absentDates: status === "Absent" ? [date] : [],
            leaveDates: status === "Leave" ? [date] : []
        };

        await db.put({ TableName: ATTENDANCE_TABLE, Item: newRecord }).promise();
        return { message: "New employee created and attendance marked successfully" };
    }

    // Determine which field to update
    const field = status === "Present" ? "presentDates"
                 : status === "Absent" ? "absentDates"
                 : "leaveDates";

    // Prevent duplicate entries
    if (existingRecord[field]?.includes(date)) {
        return { message: "Attendance already marked for this date" };
    }

    // Update existing record
    const updateParams = {
        TableName: ATTENDANCE_TABLE,
        Key: { employeeId },
        UpdateExpression: `SET ${field} = list_append(${field}, :date)`,
        ExpressionAttributeValues: {
            ":date": [date]
        },
        ReturnValues: "UPDATED_NEW"
    };

    await db.update(updateParams).promise();
    return { message: "Attendance updated successfully" };
};
