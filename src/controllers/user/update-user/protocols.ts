import { User } from "../../../models/user/user";

export interface UpdateUserParams {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
    password?: string;
}

export interface IUpdateUserRepository {
    updateUser(id: number, params: UpdateUserParams): Promise<User>
}