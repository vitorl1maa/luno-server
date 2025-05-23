import { User } from "../../../models/user/user";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IController {
    constructor(private readonly deleteUserRepository: IDeleteUserRepository) { }

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
        try {
            const id = Number(httpRequest?.params?.id);

            if (!id) {
                return {
                    statusCode: 400,
                    body: 'Missing user id'
                }
            }
            const user = await this.deleteUserRepository.deleteUser(id)

            return {
                statusCode: 200,
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