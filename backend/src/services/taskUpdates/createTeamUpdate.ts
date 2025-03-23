/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../clients/clients";
import { v4 as uuidv4 } from "uuid";
import { TEAM_UPDATES_TABLE } from "../../utils/constants";

export const createTeamUpdate = async (update: any) => {
    const updateId = `update_${uuidv4()}`;
    update.updateId = updateId;
    update.timestamp = new Date().toISOString();

    await db.put({ TableName: TEAM_UPDATES_TABLE, Item: update }).promise();
    return { message: "Team update created successfully", updateId };
};
