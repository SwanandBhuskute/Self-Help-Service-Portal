import { ParsedQs } from "qs";
import { db } from "../../clients/clients";
import { TASK_REQUESTS_TABLE } from "../../utils/constants";

export const getInboxRequests = async ( toTeamId: string | ParsedQs | (string | ParsedQs)[] | undefined ) => {
    const params = {
        TableName: TASK_REQUESTS_TABLE,
        IndexName: "toTeamId-index",
        KeyConditionExpression: "toTeamId = :toTeamId",
        ExpressionAttributeValues: { ":toTeamId": toTeamId },
    };

    const response = await db.query(params).promise();
    return { message: "Inbox requests fetched successfully", requests: response.Items };
};

export const getSentRequests = async ( fromTeamId: string | ParsedQs | (string | ParsedQs)[] | undefined ) => {
    const params = {
        TableName: TASK_REQUESTS_TABLE,
        IndexName: "fromTeamId-index",
        KeyConditionExpression: "fromTeamId = :fromTeamId",
        ExpressionAttributeValues: { ":fromTeamId": fromTeamId },
    };

    const response = await db.query(params).promise();
    return { message: "Sent requests fetched successfully", requests: response.Items };
};
