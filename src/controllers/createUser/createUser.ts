import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserController, ICreateUserRepository } from "./protocols";

export class CreateUserController implements ICreateUserController {
    constructor(private readonly createUserRepository: ICreateUserRepository) { }
    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try {
            //verificar campos obrigatórios
            const requiredFields = ["firstName", "lastName", "email", "password"];

            for (const field of requiredFields) {
                if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
                    return {
                        statusCode: 400,
                        body: `Field ${field} is required`,
                    };
                }
            }
            const user = await this.createUserRepository.createUser(httpRequest.body!);
            return {
                statusCode: 201,
                body: user
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: "Someting went wrong"
            }

        }
    }
}
