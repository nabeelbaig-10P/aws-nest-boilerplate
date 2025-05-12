export interface AuthenticatedRequest extends Request {
    user: {
        cognitoId: string;
        userId: number;
        role: string;
    };
}
