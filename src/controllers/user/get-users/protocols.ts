import { User } from "../../../models/user/user";
export interface IGetUsersRepository {
    getUsers(): Promise<User[]>
}