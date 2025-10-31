import { User } from "../../../models/user/user";
import { badRequest, conflict, created, ErrorResponse, serverError } from "../../helpers/helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import validator from 'validator';

export class CreateUserController implements IController {
    constructor(private readonly createUserRepository: ICreateUserRepository) { }
    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User | ErrorResponse>> {
        try {
            const requiredFields: (keyof CreateUserParams)[] = ["firstName", "lastName", "email", "gender", "phone", "password"];

            for (const field of requiredFields) {
                const value = httpRequest?.body?.[field];
                if (!value || (typeof value === 'string' && !value.trim())) {
                    return badRequest(`Field '${field}' is required`);
                }
            }

            const emailIsValid = validator.isEmail(httpRequest.body!.email);
            if (!emailIsValid) {
                return badRequest('Invalid email');
            }

            const validGenders = ['MALE', 'FEMALE', 'OTHER'];
            if (!validGenders.includes(httpRequest.body!.gender)) {
                return badRequest('Invalid gender value. Use: MALE, FEMALE or OTHER');
            }

            const user = await this.createUserRepository.createUser(httpRequest.body!);
            return created<User>(user);

        } catch (error: any) {
            console.error('Error creating user:', error);

            if (error.code === 'P2002') {
                const field = error.meta?.target?.[0] || 'field';
                return conflict(`${field === 'email' ? 'Email' : field === 'phone' ? 'Phone' : 'This field'} is already in use`);
            }

            if (error.message?.includes('Email or password incorrect')) {
                return conflict(error.message);
            }

            return serverError('Error creating user');
        }
    }
}
