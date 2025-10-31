import { User } from "../../../models/user/user";
import { ErrorResponse, serverError, success } from "../../helpers/helpers";
import { HttpResponse, IController } from "../../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUsersController implements IController {
    constructor(private readonly getUsersRepository: IGetUsersRepository) {

    }

    async handle(): Promise<HttpResponse<User[] | ErrorResponse>> {
        try {
            //validar req
            // direciona chamada para repository
            const users = await this.getUsersRepository.getUsers()

            return success<User[]>(users);

        } catch (error) {
            return serverError()
        }
    }

}