import { IGetUsersRepository } from "../../controllers/getUsers/protocols";
import { User } from "../../models/user";

export class PostgresGetUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        return [{
            firstName: "Jonh",
            lastName: "Due",
            email: "jonh@teste",
            password: "123"
        }]
    }

}