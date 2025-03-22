import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export class SelfHelpServicePortalStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, "UserPool", {
      userPoolName: "SelfHelpServicePortalUserPool",
      signInAliases: { email: true },
      selfSignUpEnabled: false,
      autoVerify: { email: true },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
    });

    const userPoolClient = new cognito.UserPoolClient(this, "UserPoolClient", {
      userPool,
      authFlows: {
        userPassword: true,
        adminUserPassword: true,
      },
    });

    new cdk.CfnOutput(this, "UserPoolId", { value: userPool.userPoolId });
    new cdk.CfnOutput(this, "UserPoolClientId", { value: userPoolClient.userPoolClientId });

    // ✅ Create DynamoDB Table for Employee Data
    // const employeeTable = new dynamodb.Table(this, "EmployeeTable", {
    //   tableName: "Employees",
    //   partitionKey: { name: "username", type: dynamodb.AttributeType.STRING },
    //   billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    // });

    // ✅ Output DynamoDB Table Name
    // new cdk.CfnOutput(this, "EmployeeTableName", { value: employeeTable.tableName });
  }
}
