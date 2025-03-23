import { v4 as uuidv4 } from "uuid";
import { BUCKET_NAME, DOCUMENTS_TABLE } from "../../utils/constants"
import { db } from "../../clients/clients";
import { putFileToS3 } from "../../utils/s3Utils";


export const uploadDocument = async (file: Express.Multer.File, adminId: string, employeeId: string, type: string) => {
    const documentId = `doc_${uuidv4()}`;
    const key = `employees/${employeeId}/${documentId}_${file.originalname}`;
    
    // Upload to S3
    const params = {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: "private",
    };
    await putFileToS3(params);

    const s3Link = `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;

    // Save metadata in DynamoDB
    const newDocument = {
        documentId,
        adminId,
        employeeId,
        type,
        s3Link,
    };

    await db.put({ TableName: DOCUMENTS_TABLE, Item: newDocument }).promise();
    return { message: "Document uploaded successfully", documentId, s3Link };
};
