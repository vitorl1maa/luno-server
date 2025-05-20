import { User } from "../../models/user/user"
import { HttpResponse } from "../protocols"

export interface IGetUsersController {
    handler(): Promise<HttpResponse<User[]>>;

}

export interface IGetUsersRepository {
    getUsers(): Promise<User[]>
}