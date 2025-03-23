import { db } from "../../clients/clients"
import { v4 as uuidv4 } from "uuid";
import { SALARY_TABLE } from "../../utils/constants";

export const getTeamFinance = async (teamName: string) => {
    const params = {
        TableName: SALARY_TABLE,
        FilterExpression: "team = :team",
        ExpressionAttributeValues: { ":team": teamName }
    };

    const result = await db.scan(params).promise();

    const totalEmployees = new Set(result.Items?.map(emp => emp.employeeId)).size;
    const totalPaidAmount = result.Items?.reduce((sum, emp) => sum + (emp.amount || 0), 0) || 0;

    return { team: teamName, totalEmployees, totalPaidAmount };
};