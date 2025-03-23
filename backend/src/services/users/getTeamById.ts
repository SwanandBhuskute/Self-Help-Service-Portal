import { db } from "../../clients/clients";
import { TEAMS_TABLE } from "../../utils/constants";

export const getTeamById = async (teamId: string) => {
    const params = {
        TableName: TEAMS_TABLE,
        Key: { teamId },
    };

    const result = await db.get(params).promise();
    return result.Item || { message: "Team not found" };
};
