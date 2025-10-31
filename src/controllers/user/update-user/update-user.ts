import { User } from "../../../models/user/user";
import { badRequest, conflict, ErrorResponse, notFound, serverError, success } from "../../helpers/helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";
import validator from 'validator';

export class UpdateUserController implements IController {
    constructor(private readonly updateUserRepository: IUpdateUserRepository) { }
    async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User | ErrorResponse>> {
        try {
            const id = httpRequest?.params?.id;
            const body = httpRequest?.body;

            if (!body || Object.keys(body).length === 0) {
                return badRequest("No fields provided for update");
            }

            if (!id) {
                return badRequest("User ID is required");
            }

            const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
                "firstName",
                "lastName",
                "email",
                "phone",
                "gender",
                "password"
            ];

            const receivedFields = Object.keys(body);
            const invalidFields = receivedFields.filter(
                key => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
            );

            if (invalidFields.length > 0) {
                return badRequest(`Fields not allowed: ${invalidFields.join(', ')}`);
            }

            if (body.email && !validator.isEmail(body.email)) {
                return badRequest('Invalid email');
            }

            if (body.gender) {
                const validGenders = ['MALE', 'FEMALE', 'OTHER'];
                if (!validGenders.includes(body.gender)) {
                    return badRequest('Invalid gender value. Use: MALE, FEMALE or OTHER');
                }
            }

            const user = await this.updateUserRepository.updateUser(Number(id), body);

            return success<User>(user);

        } catch (error: any) {
            console.error('Error updating user:', error);

            if (error.message?.includes('not found')) {
                return notFound('User not found');
            }

            if (error.code === 'P2002') {
                const field = error.meta?.target?.[0] || 'field';
                return conflict(`${field === 'email' ? 'Email' : field === 'phone' ? 'Phone' : 'This field'} is already in use`);
            }

            return serverError('Error updating user');
        }
    }
}