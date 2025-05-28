import { HttpResponse, HttpStatusCode } from "../protocols";
import { Response } from 'express';

export const created = <T>(body: any): HttpResponse<T> => ({
    statusCode: HttpStatusCode.CREATED,
    body
});


export const success = <T>(body: any): HttpResponse<T> => ({
    statusCode: HttpStatusCode.SUCESS,
    body
});

export const badRequest = (message: string): HttpResponse<string> => {
    return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        body: message

    };
};

export const notFound = (message: string): HttpResponse<string> => {
    return {
        statusCode: HttpStatusCode.NOT_FOUND,
        body: message

    };
};

export const unauthorized = (res: Response): void => {
    res.status(401).send({ message: "Acesso não autorizado." });
};

export const serverError = (): HttpResponse<string> => {
    return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: "Something went wrong.",
    };
};