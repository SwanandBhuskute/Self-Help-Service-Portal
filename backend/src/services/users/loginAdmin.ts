import {cognito} from "../../clients/clients";
import { CLIENT_ID } from "../../utils/constants";


export const loginAdmin = async (username: string, password: string) => {
    const params = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: CLIENT_ID,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
        },
    };
    return cognito.initiateAuth(params).promise();
};