import { cognito, db } from "../../clients/clients";
import { EmployeeData } from "../../models/employeeData.interface";
import { EMPLOYEE_TABLE, USER_POOL_ID } from "../../utils/constants";

export const createEmployee = async (username: string, password: string, employeeData: EmployeeData) => {
    try {
        const params = {
            UserPoolId: USER_POOL_ID,
            Username: username,
            TemporaryPassword: password,
            UserAttributes: [
                { Name: "email", Value: employeeData.email },
                { Name: "custom:role", Value: "Employee" },
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
                admin: employeeData.adminId,
                dob: employeeData.dob,
                role: "Employee"
            },
        };

        await db.put(employeeParams).promise();

        return { message: "Employee created successfully!" };
    } catch (error) {
        console.error("Error creating employee:", error);
        throw new Error("Failed to create employee");
    }
};

