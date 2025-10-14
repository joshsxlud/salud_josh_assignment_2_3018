import { HTTP_STATUS } from "../../constants/httpConstants";

export interface ApiResponse<T> {
    status: string;
    data?: T;
    message?: string;
    error?: string;
    code?: string;
}

export const successResponse = <T>(data?: T, message?: string): ApiResponse<T> => ({
    status: "success",
    data,
    message,
});

export const errorResponse = <T>(message?: string, code: string): ApiResponse<T> => ({
    status: "error",
    error: message,
    code
});