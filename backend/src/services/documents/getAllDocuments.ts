import { db } from "../../clients/clients";
import { DOCUMENTS_TABLE } from "../../utils/constants";

export const getAllDocuments = async () => {
    const params = {
        TableName: DOCUMENTS_TABLE,
    };

    const result = await db.scan(params).promise();
    return { message: "Documents retrieved successfully", documents: result.Items };
};
