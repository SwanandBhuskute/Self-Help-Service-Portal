import { db } from "../../clients/clients";
import { TEAM_UPDATES_TABLE } from "../../utils/constants";

export const deleteTeamUpdate = async (updateId: string) => {
    const params = {
        TableName: TEAM_UPDATES_TABLE,
        Key: { updateId },
    };

    await db.delete(params).promise();
    return { message: "Team update deleted successfully" };
};
