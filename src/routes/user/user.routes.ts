import { Router } from "express";
import { PostgresGetUsersRepository } from "../../repositories/user/get-users/postgres-get-users";
import { GetUsersController } from "../../controllers/user/get-users/get-users";
import { PostgresCreateUserRepository } from "../../repositories/user/create-user/postgres-create-user";
import { CreateUserController } from "../../controllers/user/create-user/create-user";
import { PostgresUpdateUserRepository } from "../../repositories/user/update-user/postgres-update-user";
import { UpdateUserController } from "../../controllers/user/update-user/update-user";
import { PostgresDeleteUserRepository } from "../../repositories/user/delete-user/postgres-delete-user";
import { DeleteUserController } from "../../controllers/user/delete-user/delete-user";
import { PostgresGetUserByIdRepository } from "../../repositories/user/get-user-by-id/postgres-get-user-by-id";
import { GetUserByIdController } from "../../controllers/user/get-user-by-id/get-user-by-id";


const router = Router();

router.get('/users', async (req, res) => {
    const postgresGetUsersRepository = new PostgresGetUsersRepository();
    const getUsersController = new GetUsersController(postgresGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
});

router.get('/users/:id', async (req, res) => {
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();
    const getUserByIdController = new GetUserByIdController(postgresGetUserByIdRepository);

    const { body, statusCode } = await getUserByIdController.handle({
        params: req.params
    });

    res.status(statusCode).send(body)
})

router.patch('/users/:id', async (req, res) => {
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
    const updateUserController = new UpdateUserController(postgresUpdateUserRepository);

    const { body, statusCode } = await updateUserController.handle({
        body: req.body,
        params: req.params
    })

    res.status(statusCode).send(body);
});

router.delete('/users/:id', async (req, res) => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository();
    const deleteUserController = new DeleteUserController(postgresDeleteUserRepository);

    const { body, statusCode } = await deleteUserController.handle({
        params: req.params
    })

    res.status(statusCode).send(body);
});

export default router;
