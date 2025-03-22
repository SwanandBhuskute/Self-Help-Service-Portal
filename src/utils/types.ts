export interface User {
    name?: string;
    email: string;
    password: string;
}

export type AuthType = "admin" | "employee";
export type AuthMode = "signup" | "login";