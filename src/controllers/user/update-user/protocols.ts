import { User } from "../../../models/user/user";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface UpdateUserParams {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export interface IUpdateUserController {
    handler(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>
}
export interface IUpdateUserRepository {
    updateUser(id: number, params: UpdateUserParams): Promise<User>
}