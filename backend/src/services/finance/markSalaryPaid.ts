import { db } from "../../clients/clients"
import { v4 as uuidv4 } from "uuid";
import { SALARY_TABLE } from "../../utils/constants";


export const markSalaryPaid = async (employeeId: string, team: string, month: string, amount: number) => {
    const salaryId = `sal_${uuidv4()}`;

    const newRecord = {
        salaryId,
        employeeId,
        team,
        month,
        status: "Paid",
        amount,
    };

    await db.put({ TableName: SALARY_TABLE, Item: newRecord }).promise();
    return { message: `Salary marked as PAID for ${month}` };
};