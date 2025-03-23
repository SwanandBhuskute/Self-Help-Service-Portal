import { cognito } from "../../clients/clients";
import { USER_POOL_ID } from "../../utils/constants";

export const registerAdmin = async (username: string, email: string, password: string) => {
    const params = {
        UserPoolId: USER_POOL_ID,
        Username: username,
        TemporaryPassword: password,
        UserAttributes: [
            { Name: "email", Value: email },
            { Name: "email_verified", Value: "true" },
        ],
        MessageAction: "SUPPRESS",
    };

    await cognito.adminCreateUser(params).promise();

    await cognito.adminSetUserPassword({
        UserPoolId: USER_POOL_ID,
        Username: username,
        Password: password,
        Permanent: true,
    }).promise();

    return { message: "Admin registered successfully!" };
};
