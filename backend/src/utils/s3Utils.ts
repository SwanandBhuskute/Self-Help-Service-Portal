import { BUCKET_NAME } from "./constants";
import { s3 } from "../clients/clients";

async function getFilesFromS3(indexFileName: string) {
    try {
        const data = await s3.getObject({
            Bucket: BUCKET_NAME,
            Key: indexFileName,
        }).promise();
        const jsonString = data.Body?.toString("utf-8");
        return JSON.parse(jsonString as string);
    } catch (error: any) {
        if (error.code === "NoSuchKey") {
            return null;
        }
        console.error("Error getting files from S3:", error);
        throw error;
    }
}

async function putFileToS3(params: AWS.S3.PutObjectRequest) {
    try {
        await s3.putObject( params ).promise();
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw error;
    }
}

export { getFilesFromS3, putFileToS3 };