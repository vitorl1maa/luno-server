import { HttpResponse, HttpStatusCode } from "../protocols";
import { Response } from 'express';

export interface ErrorResponse {
    error: string;
    message: string;
    details?: any;
}

export const created = <T>(body: any): HttpResponse<T> => ({
    statusCode: HttpStatusCode.CREATED,
    body
});

export const success = <T>(body: any): HttpResponse<T> => ({
    statusCode: HttpStatusCode.SUCCESS,
    body
});

export const badRequest = (message: string | any): HttpResponse<ErrorResponse> => {
    if (typeof message === 'string') {
        return {
            statusCode: HttpStatusCode.BAD_REQUEST,
            body: {
                error: 'Bad Request',
                message
            }
        };
    }

    return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        body: {
            error: 'Bad Request',
            message: 'Invalid data',
            details: message
        }
    };
};

export const notFound = (message: string): HttpResponse<ErrorResponse> => {
    return {
        statusCode: HttpStatusCode.NOT_FOUND,
        body: {
            error: 'Not Found',
            message
        }
    };
};

export const conflict = (message: string, details?: any): HttpResponse<ErrorResponse> => {
    return {
        statusCode: HttpStatusCode.CONFLICT,
        body: {
            error: 'Conflict',
            message,
            details
        }
    };
};

export const unauthorized = (res: Response, message?: string): void => {
    res.status(401).send({
        error: 'Unauthorized',
        message: message || "Unauthorized access"
    });
};

export const unprocessableEntity = (message: string, details?: any): HttpResponse<ErrorResponse> => {
    return {
        statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
        body: {
            error: 'Unprocessable Entity',
            message,
            details
        }
    };
};

export const serverError = (message?: string): HttpResponse<ErrorResponse> => {
    return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: {
            error: 'Internal Server Error',
            message: message || 'Something went wrong. Please try again later'
        }
    };
};