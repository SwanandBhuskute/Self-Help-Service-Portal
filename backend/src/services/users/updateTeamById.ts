/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../clients/clients";
import { TEAMS_TABLE } from "../../utils/constants";

export const updateTeam = async (teamId: string, updateFields: any) => {
    const updateExpressions : any = [];
    const expressionAttributeValues: { [key: string]: any } = {};

    Object.entries(updateFields).forEach(([key, value], index) => {
        const attributeKey = `:value${index}`;
        updateExpressions.push(`${key} = ${attributeKey}`);
        expressionAttributeValues[attributeKey] = value;
    });

    const params = {
        TableName: TEAMS_TABLE,
        Key: { teamId },
        UpdateExpression: `SET ${updateExpressions.join(", ")}, updatedAt = :updatedAt`,
        ExpressionAttributeValues: { ...expressionAttributeValues, ":updatedAt": new Date().toISOString() },
        ReturnValues: "UPDATED_NEW",
    };

    const result = await db.update(params).promise();
    return { message: "Team updated successfully", updatedFields: result.Attributes };
};
