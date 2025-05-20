import express from 'express';
import { config } from 'dotenv'
import { GetUsersController } from './controllers/user/get-users/get-users';
import { PostgresGetUsersRepository } from './repositories/user/get-users/postgres-get-users';
import { PostgresClient } from './database/postgres';
import { CreateUserController } from './controllers/user/create-user/create-user';
import { PostgresCreateUserRepository } from './repositories/user/create-user/postgres-create-user';


const main = async () => {
    config();
    const app = express();
    app.use(express.json());

    await PostgresClient.connect();

    app.get('/users', async (req, res) => {
        const postgresGetUsersRepository = new PostgresGetUsersRepository();
        const getUsersController = new GetUsersController(postgresGetUsersRepository);

        const { body, statusCode } = await getUsersController.handler();

        res.send(body).status(statusCode);
    });

    app.post('/users', async (req, res) => {
        const postgresCreateUserRepository = new PostgresCreateUserRepository();
        const createUserController = new CreateUserController(postgresCreateUserRepository);

        const { body, statusCode } = await createUserController.handle({ body: req.body });

        res.status(statusCode).send(body);
    })

    const port = process.env.PORT || 8000;

    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
};

main();


