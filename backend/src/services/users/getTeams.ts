import { db } from "../../clients/clients";
import { TEAMS_TABLE } from "../../utils/constants";

export const getAllTeams = async () => {
    console.log("inside getAllTeams");
    const params = {
        TableName: TEAMS_TABLE,
    };

    const result = await db.scan(params).promise();

    console.log("result: ", result);
    return result.Items || [];
};
