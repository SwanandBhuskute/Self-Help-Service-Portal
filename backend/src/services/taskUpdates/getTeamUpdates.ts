import { db } from "../../clients/clients";
import { TEAM_UPDATES_TABLE } from "../../utils/constants";

export const getUpdatesByTeamId = async (teamId: string) => {
    const params = {
        TableName: TEAM_UPDATES_TABLE,
        IndexName: "teamId-index",
        KeyConditionExpression: "teamId = :teamId",
        ExpressionAttributeValues: { ":teamId": teamId },
    };

    const response = await db.query(params).promise();
    return { message: "Team updates fetched successfully", updates: response.Items };
};

// ✅ Get a specific update by ID
export const getUpdateById = async (updateId: string) => {
    const params = {
        TableName: TEAM_UPDATES_TABLE,
        Key: { updateId },
    };

    const response = await db.get(params).promise();
    return response.Item || { message: "Update not found" };
};
