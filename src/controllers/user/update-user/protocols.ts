import { User } from "../../../models/user/user";

export interface UpdateUserParams {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export interface IUpdateUserRepository {
    updateUser(id: number, params: UpdateUserParams): Promise<User>
}