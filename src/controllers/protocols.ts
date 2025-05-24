export interface HttpResponse<T> {
    statusCode: HttpStatusCode;
    body: T;
}

export enum HttpStatusCode {
    SUCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    SERVER_ERROR = 500,
}

export interface HttpRequest<B> {
    params?: any,
    headers?: any,
    body?: B
}

export interface IController {
    handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}