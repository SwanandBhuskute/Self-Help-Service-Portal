/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../clients/clients";
import { TEAM_UPDATES_TABLE } from "../../utils/constants";

export const updateTeamUpdate = async (updateId: string, updateFields: any) => {
    const updateExpression = Object.keys(updateFields)
        .map((key, index) => `#field${index} = :value${index}`)
        .join(", ");

    const expressionAttributeNames = Object.keys(updateFields).reduce((acc, key, index) => {
        acc[`#field${index}`] = key;
        return acc;
    }, {} as Record<string, string>);

    const expressionAttributeValues = Object.keys(updateFields).reduce((acc, key, index) => {
        acc[`:value${index}`] = updateFields[key];
        return acc;
    }, {} as Record<string, any>);

    const params = {
        TableName: TEAM_UPDATES_TABLE,
        Key: { updateId },
        UpdateExpression: `SET ${updateExpression}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW",
    };

    const response = await db.update(params).promise();
    return { message: "Team update modified successfully", updatedFields: response.Attributes };
};
