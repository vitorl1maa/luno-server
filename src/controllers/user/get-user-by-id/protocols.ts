import { User } from "../../../models/user/user";

export interface IGetUserByIdRepository {
    getUserById(id: number): Promise<User | null>;
}