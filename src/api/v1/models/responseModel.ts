export interface ApiResponse<T> {
    status: string;
    data?: T;
    message?: string;
    error?: string;
    code?: string;
}

export const successResponse = <T>(data?: T, message?: string): ApiResponse<T> => ({
    status: "success",
    message,
    data
});

export const errorResponse = <T>(message?: string, code?: string): ApiResponse<T> => ({
    status: "error",
    error: message,
    code
});