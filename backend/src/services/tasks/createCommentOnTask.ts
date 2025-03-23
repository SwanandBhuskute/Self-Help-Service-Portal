import { db } from "../../clients/clients";
import { v4 as uuidv4 } from "uuid";
import { TASK_COMMENTS_TABLE } from "../../utils/constants";

export const createCommentOnTask = async (taskId: string, employeeId: string, content: string) => {
    if (!content) {
        return { message: "Comment cannot be empty" };
    }

    const commentId = `comment_${uuidv4()}`;

    const comment = {
        commentId,
        taskId,
        employeeId,
        content,
        timestamp: new Date().toISOString(),
    };

    await db.put({
        TableName: TASK_COMMENTS_TABLE,
        Item: comment,
    }).promise();

    return { message: "Comment added successfully", commentId };
};
