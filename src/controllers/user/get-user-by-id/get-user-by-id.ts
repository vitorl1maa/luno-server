import { User } from "../../../models/user/user";
import { badRequest, notFound, serverError, success } from "../../helpers/helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IGetUserByIdRepository } from "./protocols";

export class GetUserByIdController implements IController {
    constructor(private readonly getUserByIdRepository: IGetUserByIdRepository) { }

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User | string>> {
        try {
            const id = Number(httpRequest?.params?.id);

            if (isNaN(id) || id <= 0) {
                return badRequest("User ID is required and must be a valid number");
            }

            const user = await this.getUserByIdRepository.getUserById(id);

            if (!user) {
                return notFound("User not found");
            }

            return success<User>(user);

        } catch (error) {
            return serverError()
        }
    }
}