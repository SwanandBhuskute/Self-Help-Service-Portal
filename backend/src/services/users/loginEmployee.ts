import { cognito } from "../../clients/clients";
import { CLIENT_ID } from "../../utils/constants";

export const loginEmployee = async (username: string, password: string) => {
    const params = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: CLIENT_ID,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
        },
    };

    const response = await cognito.initiateAuth(params).promise();
    return response;
};
