import { ZodError } from "zod";
import { User } from "../../../models/user/user";
import { userValidation } from "../../../validations/user-validations";
import { badRequest, success } from "../../helpers/helpers";
import { HttpRequest, HttpResponse } from "../../protocols";
import { ILoginRepository, LoginParams } from "./protocols";

export class LoginController {
    constructor(private readonly loginRepository: ILoginRepository) { }

    async handle(httpRequest: HttpRequest<LoginParams>): Promise<HttpResponse<User | string | { field: string | number; message: string }[]>> {
        try {
            const { email, password } = userValidation.parse(httpRequest.body) || {};

            if (!email || !password) {
                return badRequest("Email e senha são obrigatórios")
            }

            const user = await this.loginRepository.login({ email, password });

            return success(user);

        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors = error.errors.map(err => ({
                    field: err.path[0],
                    message: err.message
                }))

                return badRequest(formattedErrors)
            }
            return badRequest("Erro ao fazer login, tente novamente em alguns instantes");
        }
    }

}