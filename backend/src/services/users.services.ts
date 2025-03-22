import AWS from "aws-sdk";
import { CLIENT_ID, EMPLOYEE_TABLE, USER_POOL_ID } from "../utils/constants";

const cognito = new AWS.CognitoIdentityServiceProvider();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const registerAdmin = async (username: string, email: string, password: string) => {
    const params = {
        UserPoolId: USER_POOL_ID,
        Username: username,
        TemporaryPassword: password,
        UserAttributes: [
            { Name: "email", Value: email },
            { Name: "email_verified", Value: "false" },
            // { Name: "custom:role", Value: "Admin" },
        ],
    };
    return cognito.adminCreateUser(params).promise();
};

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

export const createEmployee = async (username: string, password: string, employeeData: any) => {
    const params = {
        UserPoolId: USER_POOL_ID,
        Username: username,
        TemporaryPassword: password,
        UserAttributes: [
            { Name: "email", Value: employeeData.email },
            // { Name: "custom:role", Value: "Employee" },
        ],
    };
    await cognito.adminCreateUser(params).promise();

    const employeeParams = {
        TableName: EMPLOYEE_TABLE,
        Item: {
            id: employeeData.id,
            username: username,
            email: employeeData.email,
            name: employeeData.name,
            bankDetails: employeeData.bankDetails,
            address: employeeData.address,
            dateOfJoining: employeeData.dateOfJoining,
            team: employeeData.team,
            dob: employeeData.dob,
            role: "Employee"
        },
    };
    await dynamoDB.put(employeeParams).promise();

    return { message: "Employee created successfully!" };
};

export const loginEmployee = async (username: string, password: string) => {
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
