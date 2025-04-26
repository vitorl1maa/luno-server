import express from 'express';
import { config } from 'dotenv'
import { GetUsersController } from './controllers/getUsers/getUsers';
import { PostgresGetUsersRepository } from './repositories/getUsers/postgres-get-users';

config();
const app = express();

const port = process.env.PORT || 8000;

app.get('/users', async (req, res) => {
    const postgresGetUsersRepository = new PostgresGetUsersRepository();
    const getUsersController = new GetUsersController(postgresGetUsersRepository);

    const { body, statusCode } = await getUsersController.handler();

    res.send(body).status(statusCode);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
