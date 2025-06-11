import { Router } from "express";
import { PostgresLoginRepository } from "../../repositories/auth/login/postgres-login";
import { LoginController } from "../../controllers/auth/login/login";
import { PostgresCreateUserRepository } from "../../repositories/user/create-user/postgres-create-user";
import { CreateUserController } from "../../controllers/user/create-user/create-user";

const router = Router();

router.post('/login', async (req, res) => {
    const postgresLoginRepository = new PostgresLoginRepository();
    const loginController = new LoginController(postgresLoginRepository);

    const { body, statusCode } = await loginController.handle({
        body: req.body,
        params: req.params
    });

    res.status(statusCode).send(body);
});

router.post('/create-user', async (req, res) => {
    const postgresCreateUserRepository = new PostgresCreateUserRepository();
    const createUserController = new CreateUserController(postgresCreateUserRepository);

    const { body, statusCode } = await createUserController.handle({ body: req.body });

    res.status(statusCode).send(body);
});

export default router;
