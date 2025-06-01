import { Router } from "express";
import { PostgresLoginRepository } from "../../repositories/auth/login/postgres-login";
import { LoginController } from "../../controllers/auth/login/login";

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

export default router;
