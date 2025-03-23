import { db } from "../../clients/clients"
import { v4 as uuidv4 } from "uuid";
import { REQUESTS_TABLE } from "../../utils/constants";

// ✅ Create a New Request
export const createRequest = async (requestData: any) => {
    const requestId = `req_${uuidv4()}`;

    const newRequest : any = {
        requestId,
        employeeId: requestData.employeeId,
        type: requestData.type,
        reqStatus: "pending",
    };

    if (requestData.type === "leave") {
        newRequest["reason"] = requestData.reason;
        newRequest["fromDate"] = requestData.fromDate;
        newRequest["toDate"] = requestData.toDate;
    } else if (requestData.type === "document") {
        newRequest["description"] = requestData.description;
    }

    await db.put({ TableName: REQUESTS_TABLE, Item: newRequest }).promise();
    return { message: "Request created successfully", requestId };
};