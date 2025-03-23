import { ParsedQs } from "qs";
import { db } from "../../clients/clients"
import { TASKS_TABLE } from "../../utils/constants";

export const getTasksPerTeam = async (teamId: string | ParsedQs | (string | ParsedQs)[] | undefined) => {
    const params = {
        TableName: TASKS_TABLE,
        IndexName: "teamId-taskId-index", // Ensure DynamoDB has a GSI on teamId
        KeyConditionExpression: "teamId = :teamId",
        ExpressionAttributeValues: { ":teamId": teamId },
    };

    const response = await db.query(params).promise();

    return { message: "Request created successfully", response };

}