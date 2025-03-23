import { db } from "../../clients/clients";
import { TEAMS_TABLE } from "../../utils/constants";

export const deleteTeam = async (teamId: string) => {
    const params = {
        TableName: TEAMS_TABLE,
        Key: { teamId },
    };

    await db.delete(params).promise();
    return { message: "Team deleted successfully" };
};
