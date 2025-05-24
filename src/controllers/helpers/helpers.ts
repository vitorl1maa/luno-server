import { HttpResponse, HttpStatusCode } from "../protocols";

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

export const serverError = (): HttpResponse<string> => {
    return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: "Something went wrong.",
    };
};