import { User } from "../../../models/user/user";

export interface LoginParams {
    email: string;
    password: string;
}

export interface ILoginRepository {
    login(params: LoginParams): Promise<{ data: { user: User; token: string } }>

}