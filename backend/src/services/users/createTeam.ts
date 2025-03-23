import { db } from "../../clients/clients";
import { v4 as uuidv4 } from "uuid";
import { TEAMS_TABLE } from "../../utils/constants";

export const createTeam = async (teamName: string, headId: string) => {
    const teamId = `team_${uuidv4()}`;

    const newTeam = {
        teamId,
        teamName,
        headId
    };

    await db.put({ TableName: TEAMS_TABLE, Item: newTeam }).promise();
    return { message: "Team created successfully", teamId };
};
