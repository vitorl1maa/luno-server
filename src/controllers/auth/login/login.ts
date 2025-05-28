import { User } from "../../../models/user/user";
import { badRequest, success } from "../../helpers/helpers";
import { HttpRequest, HttpResponse } from "../../protocols";
import { ILoginRepository, LoginParams } from "./protocols";

export class LoginController {
    constructor(private readonly loginRepository: ILoginRepository) { }

    async handle(httpRequest: HttpRequest<LoginParams>): Promise<HttpResponse<User | string>> {
        try {
            const { email, password } = httpRequest.body || {};

            if (!email || !password) {
                return badRequest("Email e senha são obrigatórios")
            }

            const user = await this.loginRepository.login({ email, password });

            return success(user);

        } catch (error) {
            return badRequest("Erro ao fazer login, tente novamente em alguns instantes");
        }
    }

}