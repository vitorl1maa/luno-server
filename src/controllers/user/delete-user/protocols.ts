import { User } from "../../../models/user/user";

export interface IDeleteUserRepository {
    deleteUser(id: number): Promise<User>;
}