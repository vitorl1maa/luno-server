import { ZodError } from "zod";
import { User } from "../../../models/user/user";
import { userValidation } from "../../../validations/user-validations";
import { badRequest, ErrorResponse, serverError, success, unprocessableEntity } from "../../helpers/helpers";
import { HttpRequest, HttpResponse } from "../../protocols";
import { ILoginRepository, LoginParams } from "./protocols";

export class LoginController {
    constructor(private readonly loginRepository: ILoginRepository) { }

    async handle(httpRequest: HttpRequest<LoginParams>): Promise<HttpResponse<any | ErrorResponse>> {
        try {
            const { email, password } = userValidation.parse(httpRequest.body) || {};

            if (!email || !password) {
                return badRequest("Email and password are required")
            }

            const user = await this.loginRepository.login({ email, password });

            return success(user);

        } catch (error: any) {
            console.error('Login error:', error);


            if (error instanceof ZodError) {
                const formattedErrors = error.errors.map(err => ({
                    field: err.path[0],
                    message: err.message
                }))

                return unprocessableEntity('Invalid data', formattedErrors)
            }

            if (error.message?.includes('not found') || error.message?.includes('incorrect')) {
                return badRequest('Invalid email or password');
            }

            return serverError('Login error. Please try again later');
        }
    }

}