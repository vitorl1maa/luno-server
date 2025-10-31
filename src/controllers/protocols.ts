export interface HttpResponse<T = any> {
    statusCode: HttpStatusCode;
    body: T;
}

export enum HttpStatusCode {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
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