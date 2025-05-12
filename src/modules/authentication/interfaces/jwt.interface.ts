export interface JwtPayload {
    sub: string; // Cognito ID
    email: string;
    role: string;
}
