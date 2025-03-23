/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../clients/clients";
import { TASKS_TABLE } from "../../utils/constants";

export const updateTask = async (taskId: string, updateFields: any) => {
    if (!Object.keys(updateFields).length) {
        return { message: "No fields to update" };
    }

    let updateExpression = "SET ";
    const expressionAttributeValues: { [key: string]: any } = {};
    const expressionAttributeNames: { [key: string]: any } = {};

    Object.entries(updateFields).forEach(([key, value], index) => {
        const attributeKey = `#${key}`;
        const attributeValue = `:${key}`;

        updateExpression += `${index > 0 ? ", " : ""}${attributeKey} = ${attributeValue}`;
        expressionAttributeValues[attributeValue] = value;
        expressionAttributeNames[attributeKey] = key;
    });

    const updateParams = {
        TableName: TASKS_TABLE,
        Key: { taskId },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ExpressionAttributeNames: expressionAttributeNames,
        ReturnValues: "UPDATED_NEW",
    };

    await db.update(updateParams).promise();
    return { message: "Task updated successfully", taskId };
};
