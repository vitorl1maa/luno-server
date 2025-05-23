import { User } from "../../../models/user/user";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface IDeleteUserController {
    handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>
}

export interface IDeleteUserRepository {
    deleteUser(id: number): Promise<User>;
}